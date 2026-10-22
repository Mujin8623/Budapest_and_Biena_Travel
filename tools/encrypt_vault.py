#!/usr/bin/env python3
"""Encrypt a PDF into data/vault.js.

The password is read from the TRAVEL_DOCS_PASSWORD environment variable.
It is never printed, logged, or accepted as a command-line argument.
Existing vaults keep their salt, so a key remembered in the browser still works.
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import secrets
import sys
from hashlib import pbkdf2_hmac
from pathlib import Path

from cryptography.hazmat.primitives.ciphers.aead import AESGCM

ITERATIONS = 600000
CHECK = b"trip-vault-ok"
HEADER = (
    "/* Encrypted travel documents. Ciphertext only: AES-GCM-256, "
    "key from PBKDF2-SHA256 (600k). */\n"
)
ID_RE = re.compile(r"^[a-z0-9-]{1,64}$")


def fail(message: str) -> None:
    print(message, file=sys.stderr)
    raise SystemExit(1)


def password_bytes() -> bytes:
    value = os.environ.get("TRAVEL_DOCS_PASSWORD")
    if not value:
        fail("Set TRAVEL_DOCS_PASSWORD in the environment. Do not pass the password as an argument.")
    return value.encode("utf-8")


def b64(data: bytes) -> str:
    return base64.b64encode(data).decode("ascii")


def b64d(value: str) -> bytes:
    try:
        return base64.b64decode(value, validate=True)
    except Exception:
        fail("Vault contains data that is not valid base64.")


def derive(password: bytes, salt: bytes) -> bytes:
    return pbkdf2_hmac("sha256", password, salt, ITERATIONS, dklen=32)


def seal(key: bytes, plaintext: bytes) -> tuple[str, str]:
    iv = secrets.token_bytes(12)
    ct = AESGCM(key).encrypt(iv, plaintext, None)
    return b64(iv), b64(ct)


def open_vault(text: str) -> dict:
    start = text.find("{")
    end = text.rfind("}")
    if start < 0 or end < start:
        fail("Vault file has no JSON object.")
    try:
        vault = json.loads(text[start:end + 1])
    except json.JSONDecodeError:
        fail("Vault JSON could not be read.")
    kdf = vault.get("kdf") or {}
    if vault.get("v") != 1 or vault.get("alg") != "AES-GCM-256":
        fail("Unsupported vault format.")
    if kdf.get("name") != "PBKDF2" or kdf.get("hash") != "SHA-256" or kdf.get("iterations") != ITERATIONS:
        fail("Vault KDF does not match PBKDF2-SHA256 with 600000 iterations.")
    if not isinstance(vault.get("items"), list):
        fail("Vault items are missing.")
    return vault


def write_vault(path: Path, vault: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(vault, ensure_ascii=False, separators=(", ", ": "))
    path.write_text(HEADER + "window.TRIP_VAULT = " + body + ";\n", encoding="utf-8")


def key_for(vault: dict, password: bytes) -> bytes:
    return derive(password, b64d(vault["kdf"]["salt"]))


def assert_password(vault: dict, key: bytes) -> None:
    check = vault.get("check") or {}
    try:
        plain = AESGCM(key).decrypt(b64d(check["iv"]), b64d(check["ct"]), None)
    except Exception:
        fail("Password does not match this vault.")
    if plain != CHECK:
        fail("Password does not match this vault.")


def cmd_init(args: argparse.Namespace) -> None:
    path = Path(args.out)
    if path.exists() and not args.force:
        fail("Output already exists. Refusing to replace it without --force.")
    password = password_bytes()
    salt = secrets.token_bytes(16)
    key = derive(password, salt)
    iv, ct = seal(key, CHECK)
    vault = {
        "v": 1,
        "alg": "AES-GCM-256",
        "kdf": {
            "name": "PBKDF2",
            "hash": "SHA-256",
            "iterations": ITERATIONS,
            "salt": b64(salt),
        },
        "check": {"iv": iv, "ct": ct},
        "items": [],
    }
    write_vault(path, vault)
    print(f"initialized {path}")


def cmd_add(args: argparse.Namespace) -> None:
    if not ID_RE.match(args.id):
        fail("Id must be 1-64 characters of a-z, 0-9, or hyphen.")
    path = Path(args.vault)
    if not path.is_file():
        fail("Vault file not found. Run init first.")
    pdf_path = Path(args.file)
    pdf = pdf_path.read_bytes()
    if not pdf.startswith(b"%PDF"):
        fail("File does not look like a PDF.")
    vault = open_vault(path.read_text(encoding="utf-8"))
    key = key_for(vault, password_bytes())
    assert_password(vault, key)
    iv, ct = seal(key, pdf)
    item = {
        "id": args.id,
        "title": args.title,
        "subtitle": args.subtitle,
        "type": "application/pdf",
        "iv": iv,
        "ct": ct,
    }
    vault["items"] = [entry for entry in vault["items"] if entry.get("id") != args.id]
    vault["items"].append(item)
    write_vault(path, vault)
    print(f"added {args.id}; {len(vault['items'])} items; salt unchanged")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Encrypt PDFs into a trip vault. Password comes only from TRAVEL_DOCS_PASSWORD.")
    sub = parser.add_subparsers(dest="command", required=True)

    init = sub.add_parser("init", help="Create an empty vault with a new salt.")
    init.add_argument("--out", required=True, help="Output JavaScript path.")
    init.add_argument("--force", action="store_true", help="Replace an existing output file.")
    init.set_defaults(func=cmd_init)

    add = sub.add_parser("add", help="Add or replace one PDF, keeping the existing salt.")
    add.add_argument("--vault", required=True, help="Existing vault JavaScript path.")
    add.add_argument("--id", required=True, help="Stable id, such as flight-eticket.")
    add.add_argument("--title", required=True)
    add.add_argument("--subtitle", default="")
    add.add_argument("--file", required=True, help="PDF to encrypt.")
    add.set_defaults(func=cmd_add)
    return parser


def main() -> None:
    args = build_parser().parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
