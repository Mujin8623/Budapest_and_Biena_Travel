# 문서함

문서함의 PDF는 비밀번호로 암호화된 암호문만 저장소에 있습니다. 비밀번호, 예약번호, 승객 이름, 원본 PDF는 커밋하지 않습니다.

## 형식

`data/vault.js`는 클래식 스크립트입니다.

```javascript
window.TRIP_VAULT = {
  v: 1,
  alg: "AES-GCM-256",
  kdf: { name: "PBKDF2", hash: "SHA-256", iterations: 600000, salt: "<base64>" },
  check: { iv: "<base64 12 bytes>", ct: "<base64>" },
  items: [
    { id, title, subtitle, type: "application/pdf", iv: "<base64 12 bytes>", ct: "<base64>" }
  ]
};
```

- 비밀번호 UTF-8을 salt로 PBKDF2-HMAC-SHA256, 600000번 돌려 AES-256 키를 만듭니다.
- 모든 항목이 같은 키를 씁니다. `check.ct`를 풀면 UTF-8 `trip-vault-ok`가 나옵니다.
- `iv`는 항목마다 12바이트입니다. `ct`는 AES-GCM 암호문 뒤에 16바이트 태그가 붙은 값입니다.
- 제목과 부제는 목록에 보이도록 평문입니다. PDF 내용은 `ct` 안에만 있습니다.

브라우저가 ‘이 기기에서 기억’을 하면 추출할 수 없는 `CryptoKey`만 IndexedDB에 넣습니다. salt가 바뀌면 그 키는 맞지 않습니다. 문서를 추가할 때는 기존 salt를 유지합니다.

## 문서 추가

`cryptography`가 필요합니다. `pip install cryptography`

비밀번호는 환경 변수로만 넘깁니다. 인자로 넣지 마세요. 스크립트는 비밀번호를 출력하지 않습니다.

```bash
export TRAVEL_DOCS_PASSWORD='...'

# 새 보관함. 이미 있는 data/vault.js에는 init을 쓰지 않습니다.
python3 tools/encrypt_vault.py init --out /tmp/vault.js

# 기존 salt를 유지한 채 항목 추가 또는 같은 id 교체
python3 tools/encrypt_vault.py add \
  --vault data/vault.js \
  --id flight-eticket \
  --title "항공권" \
  --subtitle "가는 편 · 오는 편" \
  --file /path/to/ticket.pdf
```

항공권 id는 `flight-eticket`입니다. 이 id가 보관함에 없으면 11월 27일과 12월 5일에 ‘항공권은 아직 추가되지 않았어요’가 표시됩니다. 날짜와 id의 대응은 `data/trip.js`의 `docs`에 id만 적습니다.
