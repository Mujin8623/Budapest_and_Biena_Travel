/* Times below are local time at that place, not one shared timezone.
   Before the trip, D-day uses Asia/Seoul. From 2026-11-27 through 2026-12-06, "today" uses Europe/Vienna.
   leg:true means "do not build directions from this stop to the next one" (flight hops, and the Wien Hbf train departure).
   A hop is also omitted when the straight line is over 30 km.
   No booking references, passenger names, or ticket numbers.
   docs maps a calendar date to document ids only. */
window.TRIP = {
  docs: {
    "2026-11-27": ["flight-eticket"],
    "2026-11-28": ["vienna-hotel"],
    "2026-11-29": ["belvedere-1129", "golden-hall-1129"],
    "2026-11-30": ["train-vie-sbg", "salzburg-card-1130", "stiegl-1130"],
    "2026-12-01": ["train-vie-bud", "budapest-hotel"],
    "2026-12-02": ["restaurant-stand25"],
    "2026-12-05": ["flight-eticket", "budapest-hotel"]
  },
  flights: {
    party: "2명",
    outbound: [
      "11/27 19:55 인천(ICN) T1 → 22:30 시안(XIY) T5 (MU854)",
      "11/28 01:55 시안(XIY) → 06:00 비엔나(VIE) T3 (MU5063)"
    ],
    inbound: [
      "12/5 11:30 부다페스트(BUD) T2B → 12/6 05:25 상하이 푸동(PVG) (MU8640 / FM870 공동운항)",
      "12/6 08:40 푸동(PVG) → 11:55 인천(ICN) (MU5041)"
    ],
    baggage: "위탁 수하물 1인 2개, 각 세 변의 합 158cm 이내",
    note: "예약 확인서는 개인 보관"
  },
  places: {
    icn: {
      name: "인천공항(ICN) T1",
      city: "인천",
      lat: 37.4496,
      lng: 126.4521,
      station: "인천공항1터미널",
      lines: "공항철도",
      photo: "assets/img/icn.webp",
      credit: {
        author: "Arne Müseler",
        license: "CC BY-SA 3.0 de",
        url: "https://commons.wikimedia.org/wiki/File:Incheon_International_Airport_Terminal_1_Departure.jpg",
        title: "Incheon International Airport Terminal 1 Departure"
      }
    },
    xiy: {
      name: "시안(XIY) T5",
      city: "시안",
      lat: 34.4497,
      lng: 108.774,
      station: "T5",
      lines: "",
      photo: "assets/img/xiy.webp",
      credit: {
        author: "Windmemories",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:20250911_Xi%27an_Xianyang_International_Airport_-_Interior_of_Terminal_5_01.jpg",
        title: "Xi'an Xianyang International Airport, Terminal 5 interior"
      }
    },
    vie: {
      name: "비엔나(VIE) T3",
      city: "비엔나",
      lat: 48.1206,
      lng: 16.5633,
      station: "Flughafen Wien",
      lines: "Railjet · REX7 → Wien Hbf",
      photo: "assets/img/vie.webp",
      credit: {
        author: "Milan Suvajac",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Austria_Vienna_Airport_2011-09-15_(3).jpg",
        title: "Vienna Airport"
      }
    },
    "adina-vie": {
      name: "Adina Serviced Apartments Vienna",
      city: "비엔나",
      lodging: true,
      address: "Karl-Popper-Straße 6",
      lat: 48.18612,
      lng: 16.37999,
      station: "Wien Hauptbahnhof",
      lines: "U1 · S1 · S2 · S3 · S60 · 트램 D · O · 18"
    },
    "wien-hbf": {
      name: "Wien Hbf",
      city: "비엔나",
      lat: 48.185,
      lng: 16.378,
      station: "Wien Hauptbahnhof",
      lines: "U1 · S1 · S2 · S3 · S60 · 트램 D · O · 18",
      photo: "assets/img/wien-hbf.webp",
      credit: {
        author: "Trajcinema",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Wien_Hauptbahnhof_with_%C3%96BB_train.jpg",
        title: "Wien Hauptbahnhof with ÖBB train"
      }
    },
    "interspar-wien-hbf": {
      name: "INTERSPAR Wien Hauptbahnhof",
      city: "비엔나",
      address: "Am Hauptbahnhof 1, UG1, 1100 Wien",
      lat: 48.18512,
      lng: 16.37755,
      station: "Wien Hauptbahnhof · UG1",
      lines: "역 안"
    },
    belvedere: {
      name: "Belvedere Palace",
      city: "비엔나",
      lat: 48.1914,
      lng: 16.3808,
      station: "Schloss Belvedere",
      lines: "트램 D · S-Bahn Quartier Belvedere",
      photo: "assets/img/belvedere.webp",
      credit: {
        author: "Martin Falbisoner",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Belvedere,_Vienna_September_2016.jpg",
        title: "Belvedere, Vienna"
      }
    },
    "cafe-sacher": {
      name: "Café Sacher Wien",
      city: "비엔나",
      address: "Philharmoniker Str. 4",
      lat: 48.20389,
      lng: 16.36944,
      station: "Karlsplatz / Oper",
      lines: "U1 · U2 · U4 · 트램 D · 1 · 2",
      photo: "assets/img/cafe-sacher.webp",
      credit: {
        author: "Thomas Ledl",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Cafe_Sacher_Wien.jpg",
        title: "Cafe Sacher Wien"
      }
    },
    opernpassage: {
      name: "Karlsplatz · Opernpassage",
      city: "비엔나",
      lat: 48.20236,
      lng: 16.36959,
      station: "Karlsplatz",
      lines: "U1 · U2 · U4"
    },
    staatsoper: {
      name: "Wiener Staatsoper",
      city: "비엔나",
      address: "Opernring 2",
      lat: 48.2029,
      lng: 16.36905,
      station: "Karlsplatz / Oper",
      lines: "U1 · U2 · U4 · 트램 D · 1 · 2",
      photo: "assets/img/staatsoper.webp",
      credit: {
        author: "Leonhard Lenz",
        license: "CC0",
        url: "https://commons.wikimedia.org/wiki/File:Wiener_Staatsoper_2022-08-08_01.jpg",
        title: "Wiener Staatsoper 2022-08-08 01"
      }
    },
    hofreitschule: {
      name: "Spanische Hofreitschule",
      city: "비엔나",
      address: "Michaelerplatz 1 (미하엘러 문 돔 아래)",
      lat: 48.20768,
      lng: 16.3662,
      station: "Herrengasse",
      lines: "U3",
      photo: "assets/img/hofreitschule.webp",
      credit: {
        author: "Jebulon",
        license: "CC0",
        url: "https://commons.wikimedia.org/wiki/File:Spanische_Hofreitschule_Vienna_entrance_Hofburg.jpg",
        title: "Spanische Hofreitschule Vienna entrance Hofburg"
      }
    },
    michaelerplatz: {
      name: "Michaelerplatz",
      city: "비엔나",
      lat: 48.20799,
      lng: 16.36666,
      station: "Herrengasse",
      lines: "U3",
      photo: "assets/img/michaelerplatz.webp",
      credit: {
        author: "Leonhard Lenz",
        license: "CC0",
        url: "https://commons.wikimedia.org/wiki/File:Michaelerplatz_with_Michaelertrakt_Wien_2022-08-08_01.jpg",
        title: "Michaelerplatz with Michaelertrakt Wien 2022-08-08 01"
      }
    },
    bitzinger: {
      name: "Bitzinger Würstelstand Albertina",
      city: "비엔나",
      address: "Albertinaplatz 1",
      lat: 48.20403,
      lng: 16.36893,
      station: "Karlsplatz / Oper",
      lines: "U1 · U2 · U4 · 트램 D · 1 · 2"
    },
    "tram-oper": {
      name: "트램 정류장 Oper, Karlsplatz",
      city: "비엔나",
      address: "Kärntner Ring (D · Absberggasse 방면)",
      lat: 48.20213,
      lng: 16.36988,
      station: "Oper, Karlsplatz",
      lines: "트램 D · 1 · 2 · 71"
    },
    wuerstelstand: {
      name: "Würstelstand am Südtiroler Platz",
      city: "비엔나",
      address: "Wiedner Gürtel 3 (Hbf 앞)",
      lat: 48.18564,
      lng: 16.37309,
      station: "Hauptbahnhof / Südtiroler Platz",
      lines: "U1 · S-Bahn · 트램 D · O · 18",
      photo: "assets/img/wuerstelstand.webp",
      credit: {
        author: "Andrew Nash",
        license: "CC BY-SA 2.0",
        url: "https://commons.wikimedia.org/wiki/File:Wurstelstand_Sudtirolerplatz_Vienna_Austria_(8329474159).jpg",
        title: "Wurstelstand Sudtirolerplatz, Vienna (2008)"
      }
    },
    demel: {
      name: "Demel (K.u.K. Hofzuckerbäcker)",
      city: "비엔나",
      address: "Kohlmarkt 14",
      lat: 48.20861,
      lng: 16.36721,
      station: "Herrengasse / Stephansplatz",
      lines: "U3 · U1",
      photo: "assets/img/demel.webp",
      credit: {
        author: "Gerd Eichmann",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Wien-Kohlmarkt-30-Nr_14-Cafe_Demel-2008-gje.jpg",
        title: "Wien, Kohlmarkt 14 – Café Demel"
      }
    },
    plachutta: {
      name: "Plachutta Wollzeile",
      city: "비엔나",
      address: "Wollzeile 38",
      lat: 48.20755,
      lng: 16.37876,
      station: "Stubentor",
      lines: "U3 · 트램 2",
      photo: "assets/img/plachutta.webp",
      credit: {
        author: "P e z i",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Plachutta_Wien_Wollzeile-DSC1272w.jpg",
        title: "Plachutta Wien Wollzeile"
      }
    },
    "gasthaus-reinthaler": {
      name: "Gasthaus Reinthaler",
      city: "비엔나",
      address: "Gluckgasse 5, 1010 Wien",
      lat: 48.2055,
      lng: 16.3712,
      station: "Stephansplatz",
      lines: "U1 · U3"
    },
    "figlmueller-wollzeile": {
      name: "Figlmüller Wollzeile",
      city: "비엔나",
      address: "Wollzeile 5",
      lat: 48.20808,
      lng: 16.37642,
      station: "Stubentor",
      lines: "U3"
    },
    "cafe-frauenhuber": {
      name: "Café Frauenhuber",
      city: "비엔나",
      address: "Himmelpfortgasse 6",
      lat: 48.20642,
      lng: 16.37278,
      station: "Stephansplatz",
      lines: "U1 · U3"
    },
    figlmueller: {
      name: "Figlmüller Bäckerstraße",
      city: "비엔나",
      address: "Bäckerstraße 6",
      lat: 48.20929,
      lng: 16.37553,
      station: "Stephansplatz",
      lines: "U1 · U3",
      photo: "assets/img/figlmueller.webp",
      credit: {
        author: "Thomas Dahlstrøm Nielsen",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Figlm%C3%BCller_B%C3%A4ckerstra%C3%9Fe.jpg",
        title: "Figlmüller Bäckerstraße"
      }
    },
    albertina: {
      name: "Albertina",
      city: "비엔나",
      lat: 48.20472,
      lng: 16.36833,
      station: "Karlsplatz / Oper",
      lines: "U1 · U2 · U4",
      photo: "assets/img/albertina.webp",
      credit: {
        author: "C.Stadler/Bwag",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Wien_-_Albertina.JPG",
        title: "Wien - Albertina"
      }
    },
    peterskirche: {
      name: "Peterskirche",
      city: "비엔나",
      lat: 48.2093,
      lng: 16.3695,
      station: "Stephansplatz",
      lines: "U1 · U3",
      photo: "assets/img/peterskirche.webp",
      credit: {
        author: "C.Stadler/Bwag",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Wien_-_Peterskirche_(1).JPG",
        title: "Wien - Peterskirche"
      }
    },
    graben: {
      name: "Graben",
      city: "비엔나",
      lat: 48.20861,
      lng: 16.36917,
      station: "Stephansplatz",
      lines: "U1 · U3",
      photo: "assets/img/graben.webp",
      credit: {
        author: "C.Stadler/Bwag",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Wien_-_Graben_(2).JPG",
        title: "Wien - Graben"
      }
    },
    stephansdom: {
      name: "Stephansdom",
      city: "비엔나",
      lat: 48.2085,
      lng: 16.3731,
      station: "Stephansplatz",
      lines: "U1 · U3",
      photo: "assets/img/stephansdom.webp",
      credit: {
        author: "Dietmar Rabich",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Wien,_Stephansdom_--_2018_--_3301.jpg",
        title: "Stephansdom, Wien"
      }
    },
    "manner-stephansplatz": {
      name: "Manner Stephansplatz",
      city: "비엔나",
      address: "Stephansplatz 7, 1010 Wien",
      lat: 48.20872,
      lng: 16.37255,
      station: "Stephansplatz",
      lines: "U1 · U3"
    },
    "laederach-graben": {
      name: "Läderach Graben",
      city: "비엔나",
      address: "Graben 7, 1010 Wien",
      lat: 48.20862,
      lng: 16.36955,
      station: "Stephansplatz",
      lines: "도보 · 그라벤"
    },
    hofburg: {
      name: "Hofburg Palace",
      city: "비엔나",
      lat: 48.2066,
      lng: 16.3655,
      station: "Herrengasse",
      lines: "U3 · 트램 D · 1 · 2",
      photo: "assets/img/hofburg.webp",
      credit: {
        author: "Sandor Somkuti",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Hofburg_Palace,_Vienna.jpg",
        title: "Hofburg Palace, Vienna"
      }
    },
    rathaus: {
      name: "Rathausplatz 크리스마스 마켓",
      city: "비엔나",
      lat: 48.21,
      lng: 16.3575,
      station: "Rathaus",
      lines: "U2 · 트램 1 · D",
      photo: "assets/img/rathaus.webp",
      credit: {
        author: "Bybbisch94",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:20231222.Christkindlmarkt_in_Wien,_Rathausplatz.-015.jpg",
        title: "Christkindlmarkt, Rathausplatz Wien"
      }
    },
    "krah-krah": {
      name: "Krah Krah (비어바이즐)",
      city: "비엔나",
      address: "Rabensteig 8",
      lat: 48.21175,
      lng: 16.37542,
      station: "Schwedenplatz",
      lines: "U1 · U4 · 트램 1 · 2"
    },
    casablanca: {
      name: "Casablanca (라이브 바)",
      city: "비엔나",
      address: "Rabensteig 8",
      lat: 48.21191,
      lng: 16.37539,
      station: "Schwedenplatz",
      lines: "U1 · U4 · 트램 1 · 2"
    },
    "kaerntner-strasse": {
      name: "케른트너 거리 · STEFFL 백화점",
      city: "비엔나",
      address: "Kärntner Straße 19 (STEFFL)",
      lat: 48.20641,
      lng: 16.37212,
      station: "Stephansplatz",
      lines: "U1 · U3"
    },
    "ribs-of-vienna": {
      name: "Ribs of Vienna (등갈비)",
      city: "비엔나",
      address: "Weihburggasse 22",
      lat: 48.20576,
      lng: 16.375,
      station: "Stephansplatz",
      lines: "U1 · U3"
    },
    philosoph: {
      name: "Philosoph (비어 바 · 록 바)",
      city: "비엔나",
      address: "Judengasse 11",
      lat: 48.21184,
      lng: 16.37392,
      station: "Schwedenplatz",
      lines: "U1 · U4 · 트램 1 · 2"
    },
    naschmarkt: {
      name: "Naschmarkt",
      city: "비엔나",
      lat: 48.1987,
      lng: 16.3636,
      station: "Kettenbrückengasse",
      lines: "U4",
      photo: "assets/img/naschmarkt.webp",
      credit: {
        author: "böhringer friedrich",
        license: "CC BY-SA 3.0 AT",
        url: "https://commons.wikimedia.org/wiki/File:2012_am_Wiener_Naschmarkt_6.JPG",
        title: "Naschmarkt, Wien"
      }
    },
    "schonbrunn-market": {
      name: "Schönbrunn Christmas Market",
      city: "비엔나",
      lat: 48.18583,
      lng: 16.31276,
      station: "U4 Schönbrunn",
      lines: "U4"
    },
    "stephansplatz-market": {
      name: "Stephansplatz Christmas Market",
      city: "비엔나",
      lat: 48.20835,
      lng: 16.37315,
      station: "Stephansplatz",
      lines: "U1 · U3"
    },
    "prater-riesenrad": {
      name: "Wiener Riesenrad · Prater Wintermarkt",
      city: "비엔나",
      lat: 48.21665,
      lng: 16.3959,
      station: "Praterstern",
      lines: "U1 · U2"
    },
    "cafe-schwarzenberg": {
      name: "Café Schwarzenberg",
      city: "비엔나",
      address: "Kärntner Ring 17",
      lat: 48.20181,
      lng: 16.37361,
      station: "Karlsplatz",
      lines: "트램 D · 1 · 2 · 71"
    },
    musikverein: {
      name: "Musikverein 골든홀 (Großer Saal)",
      city: "비엔나",
      address: "Musikvereinsplatz 1",
      lat: 48.20033,
      lng: 16.37272,
      station: "Karlsplatz",
      lines: "U1 · U2 · U4 · 트램 D · 1 · 2 · 71"
    },
    "salzburg-hbf": {
      name: "Salzburg Hbf",
      city: "잘츠부르크",
      lat: 47.81314,
      lng: 13.04577,
      station: "Salzburg Hauptbahnhof",
      lines: "ÖBB Railjet · Westbahn",
      photo: "assets/img/salzburg-hbf.webp",
      credit: {
        author: "Simon Legner (User:simon04)",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Salzburg_Hauptbahnhof_(20190623_170409).jpg",
        title: "Salzburg Hauptbahnhof"
      }
    },
    mirabell: {
      name: "Mirabell Gardens (미라벨 정원)",
      city: "잘츠부르크",
      lat: 47.8041,
      lng: 13.0426,
      station: "도보 · Hbf에서 약 15분",
      lines: "",
      photo: "assets/img/mirabell.webp",
      credit: {
        author: "Michael Burgholzer",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Mirabellgarten_mit_Blick_auf_die_Andr%C3%A4kirche.jpg",
        title: "Mirabellgarten mit Blick auf die Andräkirche"
      }
    },
    "feingold-steg": {
      name: "Marko-Feingold-Steg (옛 Makartsteg)",
      city: "잘츠부르크",
      lat: 47.802,
      lng: 13.0424,
      station: "도보",
      lines: "",
      photo: "assets/img/feingold-steg.webp",
      credit: {
        author: "Flocci Nivis",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:20230610_Marko-Feingold-Steg.jpg",
        title: "Marko-Feingold-Steg, Salzburg"
      }
    },
    getreidegasse: {
      name: "Getreidegasse",
      city: "잘츠부르크",
      lat: 47.8,
      lng: 13.04278,
      station: "도보",
      lines: "",
      photo: "assets/img/getreidegasse.webp",
      credit: {
        author: "Snotty",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Getreidegasse_am_Nachmittag,_Salzburg.jpg",
        title: "Getreidegasse am Nachmittag, Salzburg"
      }
    },
    "balkan-grill": {
      name: "Balkan Grill",
      city: "잘츠부르크",
      address: "Getreidegasse 33a",
      lat: 47.80008,
      lng: 13.0417,
      station: "도보 · 게트라이데 거리",
      lines: ""
    },
    "salzburg-salz": {
      name: "Salzburg Salz",
      city: "잘츠부르크",
      address: "Wiener-Philharmoniker-Gasse 3, 5020 Salzburg",
      lat: 47.79972,
      lng: 13.04362,
      station: "도보 · 모차르트 생가 뒤",
      lines: ""
    },
    "laderach-salzburg": {
      name: "Läderach",
      city: "잘츠부르크",
      address: "Getreidegasse 5",
      lat: 47.7999,
      lng: 13.04395,
      station: "도보 · 모차르트 생가 옆",
      lines: ""
    },
    "fuerst-salzburg": {
      name: "Café Konditorei Fürst",
      city: "잘츠부르크",
      address: "Brodgasse 13, 5020 Salzburg",
      lat: 47.79922,
      lng: 13.04472,
      station: "도보 · Alter Markt",
      lines: ""
    },
    "mozart-geburtshaus": {
      name: "Mozart's Birthplace (모차르트 생가)",
      city: "잘츠부르크",
      address: "Getreidegasse 9",
      lat: 47.79994,
      lng: 13.04355,
      station: "도보",
      lines: "",
      photo: "assets/img/mozart-geburtshaus.webp",
      credit: {
        author: "Andreas Stiasny",
        license: "CC BY-SA 3.0 AT",
        url: "https://commons.wikimedia.org/wiki/File:Salzburg,_Getreidegasse_9,_Mozarts_Geburtshaus.jpg",
        title: "Salzburg, Getreidegasse 9, Mozarts Geburtshaus"
      }
    },
    "mozart-wohnhaus": {
      name: "Mozart's Residence (모차르트 주거지)",
      city: "잘츠부르크",
      address: "Makartplatz 8",
      lat: 47.8032,
      lng: 13.0441,
      station: "도보 · 미라벨에서 약 5분",
      lines: ""
    },
    "salzburg-dom": {
      name: "Salzburg Cathedral (잘츠부르크 대성당)",
      city: "잘츠부르크",
      lat: 47.79787,
      lng: 13.04664,
      station: "도보",
      lines: "",
      photo: "assets/img/salzburg-dom.webp",
      credit: {
        author: "Uoaei1",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Salzburg_Dom_Fassade_02.jpg",
        title: "Salzburg Dom Fassade"
      }
    },
    hohensalzburg: {
      name: "Hohensalzburg Fortress (호엔잘츠부르크 성)",
      city: "잘츠부르크",
      lat: 47.79497,
      lng: 13.04726,
      station: "FestungsBahn 산악열차 (Festungsgasse 4)",
      lines: "FestungsBahn",
      photo: "assets/img/hohensalzburg.webp",
      credit: {
        author: "C.Stadler/Bwag",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Salzburg_-_Festung_Hohensalzburg.JPG",
        title: "Salzburg - Festung Hohensalzburg"
      }
    },
    "stiegl-brauwelt": {
      name: "Stiegl-Brauwelt (슈티글 양조장)",
      city: "잘츠부르크",
      address: "Bräuhausstraße 9",
      lat: 47.79387,
      lng: 13.02083,
      station: "Bräuhausstraße (버스 1 · 10번)에서 걸어서 약 5–10분",
      lines: "버스 1 · 10"
    },
    "augustiner-muelln": {
      name: "Augustiner Bräustübl Mülln",
      city: "잘츠부르크",
      address: "Augustinergasse 4 (차 · 주차장 입구는 Lindhofstraße)",
      lat: 47.80541,
      lng: 13.03384,
      station: "Landeskrankenhaus (버스) · S-Bahn Mülln-Altstadt",
      lines: "버스 4 · 7 · 9 · 20 · 21 · 24 · 27 · 28"
    },
    "moenchsberg-aufzug": {
      name: "MönchsbergAufzug (묀히스베르크 엘리베이터)",
      city: "잘츠부르크",
      address: "Anton-Neumayr-Platz (구시가지 Gstättengasse 쪽)",
      lat: 47.80089,
      lng: 13.03946,
      station: "도보 · 크리스마스 마켓에서 약 10분",
      lines: ""
    },
    salzburg: {
      name: "Salzburg 구시가지 · 크리스마스 마켓 (Dom·Residenzplatz)",
      city: "잘츠부르크",
      lat: 47.79843,
      lng: 13.04637,
      station: "도보 · Hbf까지 약 25분",
      lines: "",
      photo: "assets/img/salzburg.webp",
      credit: {
        author: "Jorge Franganillo",
        license: "CC BY 2.0",
        url: "https://commons.wikimedia.org/wiki/File:Salzburg_(48489551981).jpg",
        title: "Salzburg"
      }
    },
    keleti: {
      name: "Budapest Keleti",
      city: "부다페스트",
      lat: 47.5001,
      lng: 19.0839,
      station: "Keleti pályaudvar",
      lines: "M2 · M4",
      photo: "assets/img/keleti.webp",
      credit: {
        author: "Random photos 1989",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Budapest,_Keleti_p%C3%A1lyaudvar,_13.jpg",
        title: "Keleti pályaudvar"
      }
    },
    basilica: {
      name: "St. Stephen's Basilica",
      city: "부다페스트",
      lat: 47.5009,
      lng: 19.0539,
      station: "Bajcsy-Zsilinszky út",
      lines: "M1",
      photo: "assets/img/basilica.webp",
      credit: {
        author: "József Rozsnyai",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:St._Stephen%27s_Basilica,_Budapest.jpg",
        title: "St. Stephen's Basilica, Budapest"
      }
    },
    "adina-bud": {
      name: "Adina Apartment Hotel Budapest",
      city: "부다페스트",
      lodging: true,
      address: "Hegedűs Gyula utca 52/b–54",
      lat: 47.51936,
      lng: 19.05662,
      station: "Lehel tér",
      lines: "M3"
    },
    castle: {
      name: "Buda Castle",
      city: "부다페스트",
      lat: 47.4961,
      lng: 19.0396,
      station: "Dísz tér",
      lines: "버스 16 · 트램 19 Clark Ádám tér",
      photo: "assets/img/castle.webp",
      credit: {
        author: "Paul Colin Hennig",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Buda_Castle_behind_the_Elisabeth_Bridge_(2025).jpg",
        title: "Buda Castle behind the Elisabeth Bridge"
      }
    },
    bastion: {
      name: "Fisherman’s Bastion",
      city: "부다페스트",
      lat: 47.5022,
      lng: 19.0348,
      station: "Szentháromság tér",
      lines: "버스 16",
      photo: "assets/img/bastion.webp",
      credit: {
        author: "Ermell",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Budapest_Fisherman%27s_Bastion-20080321-RM-100000.jpg",
        title: "Fisherman's Bastion, Budapest"
      }
    },
    danube: {
      name: "다뉴브 야경 포인트",
      city: "부다페스트",
      lat: 47.4957,
      lng: 19.0489,
      station: "Vigadó tér",
      lines: "트램 2",
      photo: "assets/img/danube.webp",
      credit: {
        author: "Bahnfrend",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Buda_Castle,_Chain_Bridge_at_night,_2006_(01).jpg",
        title: "Buda Castle, Chain Bridge at night"
      }
    },
    szechenyi: {
      name: "Széchenyi Thermal Bath",
      city: "부다페스트",
      lat: 47.5186,
      lng: 19.0819,
      station: "Széchenyi fürdő",
      lines: "M1",
      photo: "assets/img/szechenyi.webp",
      credit: {
        author: "Andorka",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Sz%C3%A9chenyi_Bath_in_Budapest.jpg",
        title: "Széchenyi Bath in Budapest"
      }
    },
    vajdahunyad: {
      name: "Vajdahunyad Castle · 시립공원(Városliget)",
      city: "부다페스트",
      lat: 47.5153,
      lng: 19.0838,
      station: "Széchenyi fürdő",
      lines: "M1"
    },
    "hosok-tere": {
      name: "Heroes' Square (영웅 광장)",
      city: "부다페스트",
      lat: 47.5149,
      lng: 19.0779,
      station: "Hősök tere",
      lines: "M1"
    },
    opera: {
      name: "Andrássy út · Hungarian State Opera",
      city: "부다페스트",
      address: "Andrássy út 22",
      lat: 47.50258,
      lng: 19.05833,
      station: "Opera",
      lines: "M1"
    },
    jewish: {
      name: "유대인 지구",
      city: "부다페스트",
      lat: 47.4975,
      lng: 19.0615,
      station: "Astoria",
      lines: "M2 · 트램 4 · 6",
      photo: "assets/img/jewish.webp",
      credit: {
        author: "Epistola8",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Doh%C3%A1ny_Street_Synagogue,_Budapest.jpg",
        title: "Dohány Street Synagogue, Budapest"
      }
    },
    lanchid: {
      name: "체인 브리지 (Széchenyi Lánchíd)",
      city: "부다페스트",
      lat: 47.49905,
      lng: 19.04383,
      station: "Széchenyi István tér",
      lines: "트램 2 · 버스 16"
    },
    parliament: {
      name: "Hungarian Parliament Building",
      city: "부다페스트",
      lat: 47.5071,
      lng: 19.0456,
      station: "Kossuth Lajos tér",
      lines: "M2 · 트램 2",
      photo: "assets/img/parliament.webp",
      credit: {
        author: "Elekes Andor",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Hungarian_Parliament_Building_from_across_the_Danube.jpg",
        title: "Hungarian Parliament Building"
      }
    },
    shoes: {
      name: "Shoes on the Danube Bank (다뉴브 강변의 신발)",
      city: "부다페스트",
      lat: 47.5045,
      lng: 19.0450,
      station: "Kossuth Lajos tér",
      lines: "M2 · 트램 2"
    },
    stand25: {
      name: "Stand25 Bisztró",
      city: "부다페스트",
      address: "Attila út 10",
      lat: 47.49777,
      lng: 19.0328,
      station: "Clark Ádám tér",
      lines: "버스 16 · 105 · 트램 19 · 41"
    },
    vorosmarty: {
      name: "Vörösmarty tér 크리스마스 마켓",
      city: "부다페스트",
      address: "Vörösmarty tér",
      lat: 47.49637,
      lng: 19.0504,
      station: "Vörösmarty tér",
      lines: "M1",
      photo: "assets/img/vorosmarty.webp",
      credit: {
        author: "ucsendre",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Budapest,_V%C3%B6r%C3%B6smarty_t%C3%A9r_(2009_kar%C3%A1csonyi_v%C3%A1s%C3%A1r)_-_panoramio.jpg",
        title: "Budapest, Vörösmarty tér (2009 karácsonyi vásár)"
      }
    },
    "lehel-market": {
      name: "Lehel Csarnok (레헬 시장)",
      city: "부다페스트",
      address: "Váci út 9–15",
      lat: 47.51847,
      lng: 19.06144,
      station: "Lehel tér",
      lines: "M3",
      photo: "assets/img/lehel-market.webp",
      credit: {
        author: "OsvátA",
        license: "Public domain",
        url: "https://commons.wikimedia.org/wiki/File:Lehel_Csarnok,_Budapest.jpg",
        title: "Lehel Csarnok, Budapest"
      }
    },
    "comme-chez-soi": {
      name: "Comme Chez Soi",
      city: "부다페스트",
      address: "Aranykéz u. 2",
      lat: 47.49449,
      lng: 19.05134,
      station: "Vörösmarty tér",
      lines: "M1",
      photo: "assets/img/comme-chez-soi.webp",
      credit: {
        author: "Yair-haklai",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Aranyk%C3%A9z_utca_2_(Budapest).jpg",
        title: "Aranykéz utca 2 (Budapest)"
      }
    },
    negromangalica: {
      name: "Negro Mangalica Bistro & Bar",
      city: "부다페스트",
      address: "Dohány u. 36",
      lat: 47.49641,
      lng: 19.06565,
      station: "Astoria / Blaha Lujza tér",
      lines: "M2"
    },
    parasztkonyha: {
      name: "Parasztkonyha (Október 6. utca)",
      city: "부다페스트",
      address: "Október 6. u. 3",
      lat: 47.49952,
      lng: 19.05138,
      station: "Arany János utca",
      lines: "M3"
    },
    eleszto: {
      name: "Élesztő (Élesztőház)",
      city: "부다페스트",
      address: "Tűzoltó u. 22",
      lat: 47.48356,
      lng: 19.07272,
      station: "Corvin-negyed",
      lines: "M3"
    },
    "if-jazz": {
      name: "iF Jazz Café",
      city: "부다페스트",
      address: "Ráday u. 19",
      lat: 47.48652,
      lng: 19.06363,
      station: "Kálvin tér",
      lines: "M3 · M4"
    },
    judapest: {
      name: "Judapest (유대인 지구 디자인 가게)",
      city: "부다페스트",
      address: "Kazinczy u. 52 (Király utca 쪽 끝)",
      lat: 47.49951,
      lng: 19.06047,
      station: "Opera / Deák Ferenc tér",
      lines: "M1 · M2 · M3"
    },
    "vaci-utca": {
      name: "바치 거리 (Váci utca)",
      city: "부다페스트",
      address: "Váci utca (Vörösmarty tér → 남쪽)",
      lat: 47.49546,
      lng: 19.05169,
      station: "Vörösmarty tér",
      lines: "M1"
    },
    "divino-bazilika": {
      name: "DiVino Bazilika (와인 바)",
      city: "부다페스트",
      address: "Szent István tér 3",
      lat: 47.50015,
      lng: 19.05304,
      station: "Arany János utca",
      lines: "M3"
    },
    szimpla: {
      name: "Szimpla Kert",
      city: "부다페스트",
      address: "Kazinczy u. 14",
      lat: 47.49693,
      lng: 19.06331,
      station: "Astoria",
      lines: "M2 · 트램 47 · 49",
      photo: "assets/img/szimpla.webp",
      credit: {
        author: "Yelkrokoyade",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Szimpla_Kert_Budapest_1.jpg",
        title: "Szimpla Kert Budapest"
      }
    },
    "great-market": {
      name: "Great Market Hall (중앙시장)",
      city: "부다페스트",
      address: "Vámház krt. 1–3",
      lat: 47.48658,
      lng: 19.05899,
      station: "Fővám tér",
      lines: "M4 · 트램 2 · 47 · 49",
      photo: "assets/img/great-market.webp",
      credit: {
        author: "Xosema",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Budapest_-_Mercado_Central_-_Grand_Market_Hall_-_Nagycsarnok_-_02.jpg",
        title: "Grand Market Hall – Nagycsarnok"
      }
    },
    sternbrau: {
      name: "Sternbräu",
      city: "잘츠부르크",
      address: "Griesgasse 23",
      lat: 47.7999,
      lng: 13.0436,
      station: "Altstadt",
      lines: "도보"
    },
    "margit-pest": {
      name: "머르기트 다리 · 페스트 강변",
      city: "부다페스트",
      lat: 47.5142,
      lng: 19.0472,
      station: "Jászai Mari tér",
      lines: "트램 4 · 6"
    },
    ujlipotvaros: {
      name: "우일리포토바로시 카페",
      city: "부다페스트",
      address: "Pozsonyi út",
      lat: 47.5151,
      lng: 19.0516,
      station: "Jászai Mari tér",
      lines: "트램 4 · 6"
    },
    "varkert-bazar": {
      name: "Várkert Bazár",
      city: "부다페스트",
      address: "Ybl Miklós tér 2–6",
      lat: 47.4962,
      lng: 19.0423,
      station: "Clark Ádám tér",
      lines: "버스 16 · 105"
    },
    matthias: {
      name: "Mátyás-templom",
      city: "부다페스트",
      address: "Szentháromság tér 2",
      lat: 47.50195,
      lng: 19.03415,
      station: "Szentháromság tér",
      lines: "버스 16"
    },
    frohlich: {
      name: "Fröhlich Cukrászda",
      city: "부다페스트",
      address: "Dob utca 22",
      lat: 47.4976,
      lng: 19.0617,
      station: "Astoria",
      lines: "M2"
    },
    massolit: {
      name: "Massolit Books & Café",
      city: "부다페스트",
      address: "Nagy Diófa utca 30",
      lat: 47.4986,
      lng: 19.0632,
      station: "Astoria",
      lines: "M2"
    },
    printa: {
      name: "Printa",
      city: "부다페스트",
      address: "Rumbach Sebestyén utca 10",
      lat: 47.4979,
      lng: 19.0604,
      station: "Astoria",
      lines: "M2"
    },
    "espresso-embassy": {
      name: "Espresso Embassy",
      city: "부다페스트",
      address: "Arany János utca 15",
      lat: 47.5024,
      lng: 19.0522,
      station: "Arany János utca",
      lines: "M3"
    },
    "cave-church": {
      name: "동굴교회 (Sziklatemplom)",
      city: "부다페스트",
      address: "Gellért-hegy",
      lat: 47.4851,
      lng: 19.0519,
      station: "Szent Gellért tér",
      lines: "트램 19 · 41 · 47 · 49"
    },
    kelet: {
      name: "Kelet Kávézó",
      city: "부다페스트",
      address: "Bartók Béla út 29",
      lat: 47.4796,
      lng: 19.0557,
      station: "Móricz Zsigmond körtér",
      lines: "트램 19 · 47 · 49"
    },
    bortarsasag: {
      name: "Bortársaság Kossuth tér",
      city: "부다페스트",
      address: "Vécsey utca 5",
      lat: 47.5076,
      lng: 19.0475,
      station: "Kossuth Lajos tér",
      lines: "M2 · 트램 2"
    },
    "gelarto-rosa": {
      name: "Gelarto Rosa",
      city: "부다페스트",
      address: "Hercegprímás utca 3",
      lat: 47.5006,
      lng: 19.0537,
      station: "Bajcsy-Zsilinszky út",
      lines: "M1"
    },
    rozsavolgyi: {
      name: "Rózsavölgyi Zeneműbolt",
      city: "부다페스트",
      address: "Szervita tér 5",
      lat: 47.4956,
      lng: 19.0542,
      station: "Deák Ferenc tér",
      lines: "M1 · M2 · M3"
    },
    gerbeaud: {
      name: "Café Gerbeaud",
      city: "부다페스트",
      address: "Vörösmarty tér 7–8",
      lat: 47.4968,
      lng: 19.0503,
      station: "Vörösmarty tér",
      lines: "M1"
    },
    bud: {
      name: "부다페스트(BUD) T2B",
      city: "부다페스트",
      lat: 47.4337,
      lng: 19.2622,
      station: "공항버스",
      lines: "100E · 200E",
      photo: "assets/img/bud.webp",
      credit: {
        author: "Cccc3333",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:FerihegyOut.jpg",
        title: "Budapest Ferihegy Airport"
      }
    },
    pvg: {
      name: "상하이 푸동(PVG)",
      city: "상하이",
      lat: 31.1513,
      lng: 121.7977,
      station: "T1",
      lines: "",
      photo: "assets/img/pvg.webp",
      credit: {
        author: "Si Chun LAM",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Shanghai_Pudong_International_Airport_1.jpg",
        title: "Shanghai Pudong International Airport"
      }
    }
  },
  days: [
    {
      date: "2026-11-27",
      title: "출국",
      city: "인천 → 비엔나",
      items: [
        { time: "19:55", placeId: "icn", leg: true, text: "11/27 19:55 인천공항(ICN) T1 출발 · MU854" },
        { time: "22:30", placeId: "xiy", leg: true, text: "22:30 시안(XIY) T5 도착 → 11/28 01:55 출발 · MU5063" },
        { time: "11/28", placeId: "vie", leg: true, text: "11/28 06:00 비엔나(VIE) T3 도착" }
      ],
      notes: [
        {
          title: "항공 일정",
          rows: [
            ["인원", "2명"],
            ["가는 편", "11/27 19:55 인천(ICN) T1 → 22:30 시안(XIY) T5 (MU854)\n11/28 01:55 시안(XIY) → 06:00 비엔나(VIE) T3 (MU5063)"],
            ["오는 편", "12/5 11:30 부다페스트(BUD) T2B → 12/6 05:25 상하이 푸동(PVG) (MU8640 / FM870 공동운항)\n12/6 08:40 푸동(PVG) → 11:55 인천(ICN) (MU5041)"],
            ["수하물", "위탁 수하물 1인 2개, 각 세 변의 합 158cm 이내"],
            ["항공 왕복", "2인 1,440,000원 · 실제. 가는 날과 오는 날에 나누지 않습니다."]
          ],
          foot: "예약 확인서는 개인 보관"
        },
        {
          title: "여행 경비 (2명 · 항공 · 숙소 제외)",
          rows: [
            ["상한", "1인 120만 원 × 2명 = 240만 원. 항공·숙소는 이 상한 밖입니다."],
            ["항공 왕복", "2인 1,440,000원 · 실제. 날짜에 나누지 않습니다. 숙소는 이 표 밖입니다."],
            ["여행자보험", "29,650원 · 추정 · 미가입. 합계에 넣지 않습니다."],
            ["11/28 비엔나", "공항 열차 2인 €11 · 약 16,200원 · 추정 · 미구매. 시내 11/28–29 24시간 디지털권 2인 €38.80 · 약 57,300원 · 추정. Bitzinger·나슈마르크트 점심·데멜·쇤브룬·시청사·Krah Krah·Casablanca는 가격미정. Figlmüller Wollzeile 슈니첼 약 100,000–150,000원 · 추정 · 예약 필요 · 미예약. 0원으로 두지 않습니다."],
            ["11/29 비엔나", "벨베데레 €46 · 실제 69,692원. 골든홀 입석 €12 · 약 17,700원 · 실제. Plachutta 메인 약 108,900원 · 추정, 와인 미정. Läderach 약 19,000–38,100원 · 추정. 대관람차 약 43,500원 · 추정 · 미구매. Café Schwarzenberg 약 120,200원 · 추정 · 미예약. 자허·그라벤 카페·Manner는 가격미정."],
            ["11/30 잘츠부르크", "카드+슈티글 €92 · 약 135,800원 · 실제. 기차 €95.60은 기존 예약. Sternbräu 노케를 약 36,900원 · 추정, 저녁 합계 미정. Fürst 약 13,600–35,700원 · 추정. Balkan Grill·소금·마켓은 가격미정."],
            ["12/1 이동일", "기차 약 52,800원 · 실제. Reinthaler 메인·디저트 약 72,600–99,200원 · 추정 · 이메일 예약 확정. 수프 추가 약 15,400원 · 추정, 음료 미정. Frauenhuber·디저트 카페는 가격미정. Zuckerl 약 3,400–14,800원 · 추정. 마켓·라이트쇼 약 12,000–16,000원 · 추정. (선택) DiVino 약 16,000–20,000원 · 추정."],
            ["12/2 부다페스트", "레헬 아침 약 10,000–14,000원 · 추정. 우일리포토바로시 카페 가격미정. Stand25 약 81,800원 · 추정 · 예약 완료. 어부의 요새 위층은 선택 약 13,400원 · 추정. 마차시 약 26,900원 · 추정. 마켓 저녁 약 39,500원 · 추정. Élesztő 약 12,000–16,000원 · 추정."],
            ["12/3 부다페스트", "아침 가격미정. 세체니 약 83,000원 · 추정 · 현장 구매. Espresso Embassy 가격미정. Comme Chez Soi 약 86,000원 · 추정 · 미예약. 도하니 약 114,600원 · 추정. Fröhlich·Massolit·Printa 가격미정. Negro 약 53,000원 · 추정 · 미예약. Szimpla 2잔 약 15,000원 · 추정."],
            ["12/4 부다페스트", "기본 랑고시 약 8,000–12,000원 · 추정. 시장 쇼핑 약 20,000–40,000원 · 추정, 과일·간식 미정. 동굴교회 약 11,100원 · 추정. Kelet 가격미정. 와인 2병 약 74,500원 · 추정. 마켓 점심 약 20,000–32,000원 · 추정. 돔 약 53,700원 · 추정. Gelarto Rosa·Gerbeaud·선택 굴뚝빵은 가격미정. Rózsavölgyi 약 30,100–45,100원 · 추정. Parasztkonyha 약 85,500원 · 추정 · 미예약, 팔링커 미정. DiVino 약 16,000–20,000원 · 추정."],
            ["12/5–12/6", "호텔 조식 가격미정. 100E 전용권 2인 약 19,800원 · 추정. 기내식은 항공 포함. 12/6 시각은 현지 시간입니다."],
            ["확정 합계", "적지 않습니다. 전체 합계는 미정입니다. 보험은 합계 밖입니다."]
          ],
          foot: "새로 적는 환산은 1 EUR = 1,476.13원, 1 HUF ≈ 3.95원, 1 USD ≈ 1,470원입니다. DCC는 거절하고 현지 통화로 냅니다. 벨베데레 69,692원은 실제 결제액이라 다시 곱하지 않습니다. 결제 완료 기차는 11/30 왕복 €95.60, 12/1 €35.80(약 52,800원 · 실제)입니다."
        }
      ]
    },
    {
      date: "2026-11-28",
      title: "도착 · 마켓 · 슈니첼",
      city: "비엔나",
      blurb: "토요일. 공항 도착 뒤 Albertina의 Bitzinger에서 아침, 나슈마르크트·오페라 외관·데멜·쇼핑, 나슈마르크트 시장 점심, 체크인, 쇤브룬 크리스마스 마켓, Figlmüller Wollzeile 슈니첼(예약 필요·미예약), 시청사 마켓, 베르무다 삼각지대 순입니다. Ribs of Vienna는 자리가 없을 때의 대안입니다. 벨베데레 정원은 오늘 걷지 않습니다. 궁전 입장은 내일 14:00입니다. 23:15 이후 귀가 시각은 고정하지 않습니다. 시각은 빈 현지 시각입니다.",
      items: [
        {
          time: "06:00–08:00",
          placeId: "vie",
          text: "도착 · 입국 → Railjet으로 Wien Hbf → 숙소 짐",
          note: "06:00 비엔나 공항. ÖBB Railjet으로 Wien Hbf까지 약 15분. CAT가 아닙니다. 2인 €11 · 약 16,200원 · 추정 · 미구매. 숙소 체크인은 15:00라 짐만 맡깁니다. 빈 시티카드는 사지 않습니다."
        },
        {
          time: "08:00–08:20",
          placeId: "albertina",
          text: "Albertina로 이동",
          note: "Wien Hbf에서 구시가지로 이동합니다. 아침은 역 안이 아닙니다."
        },
        {
          time: "08:20–09:15",
          placeId: "bitzinger",
          text: "아침 · Bitzinger Würstelstand",
          note: "Albertinaplatz 1. 매일 08:00–04:00. 케제크라이너·핫도그. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "09:15–12:00",
          placeId: "naschmarkt",
          text: "나슈마르크트 · 토요일 벼룩시장",
          note: "09:15–12:00 안에 시장, 오페라 외관, 데멜, 콜마르크트·그라벤·케른트너 쇼핑이 있습니다."
        },
        {
          time: "09:15–12:00",
          placeId: "staatsoper",
          text: "오페라 외관",
          note: "같은 09:15–12:00 창. 외관만 보고 들어가지 않습니다."
        },
        {
          time: "09:15–12:00",
          placeId: "demel",
          text: "데멜 · 카이저슈마렌 · 멜랑주",
          note: "Kohlmarkt 14. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "09:15–12:00",
          placeId: "kaerntner-strasse",
          text: "쇼핑 · 콜마르크트 · 그라벤 · 케른트너",
          note: "토요일 쇼핑입니다. 금액은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "13:00–13:30",
          placeId: "naschmarkt",
          text: "나슈마르크로 이동",
          note: "점심은 역 앞 소시지 가판이 아닙니다."
        },
        {
          time: "13:30–14:15",
          placeId: "naschmarkt",
          text: "점심 · 나슈마르크트 시장 음식",
          note: "시장 음식입니다. Hbf 소시지 가판 점심이 아닙니다. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "14:15–15:20",
          placeId: "adina-vie",
          text: "마트 · 체크인",
          note: "체크인 15:00. 마트 지출은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "16:00–17:15",
          placeId: "schonbrunn-market",
          text: "쇤브룬 크리스마스 마켓",
          note: "입장 무료. 궁전 내부는 보지 않습니다. 음식은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "18:15–19:30",
          placeId: "figlmueller-wollzeile",
          text: "저녁 · Figlmüller Wollzeile 슈니첼 · 예약 필요 · 미예약",
          note: "Wollzeile 5. 공식 슈니첼 €21.90. 예약이 필요하고 아직 예약하지 않았습니다. 약 100,000–150,000원 · 추정. 굴라시는 시키지 않습니다. 자리가 없으면 Ribs of Vienna(Weihburggasse 22)가 대안입니다. 0원으로 두지 않습니다."
        },
        {
          time: "20:00–21:00",
          placeId: "rathaus",
          text: "시청사 마켓 · 글뤼바인 또는 펀쉬",
          note: "입장 무료. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "21:30–22:15",
          placeId: "krah-krah",
          text: "Krah Krah 생맥주",
          note: "Rabensteig 8. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "22:15–23:15",
          placeId: "casablanca",
          text: "Casablanca",
          note: "같은 골목. 당일 라이브는 확인합니다. 가격미정. 0원으로 두지 않습니다. 23:15 이후 숙소 복귀 시각은 고정하지 않습니다."
        }
      ],
      notes: [
        {
          title: "비엔나 교통권",
          rows: [
            ["시내", "11/28–11/29 Wiener Linien 24시간 디지털권. 1인 €9.70 × 2일 × 2인 = €38.80 · 약 57,300원 · 추정."],
            ["사지 않음", "7일권으로 바꾸지 않습니다. 빈 시티카드는 사지 않습니다. CAT는 타지 않습니다."],
            ["공항", "Railjet 2인 €11 · 약 16,200원 · 추정 · 미구매."]
          ],
          foot: "새로 적는 환산은 1 EUR = 1,476.13원입니다."
        },
        {
          title: "비엔나 숙소",
          rows: [
            ["호텔", "Adina Serviced Apartments Vienna"],
            ["숙박", "11/28 ~ 12/01 (3박)"],
            ["체크인 / 아웃", "15:00 / 11:00 · 짐 보관 가능"]
          ],
          foot: "예약 확인서는 개인 보관"
        },
        {
          title: "식사 예약 상태",
          rows: [
            ["Bitzinger", "11/28 08:20–09:15 · 가판 · 가격미정"],
            ["Figlmüller Wollzeile", "11/28 18:15–19:30 · 예약 필요 · 미예약. 없으면 Ribs of Vienna가 대안"],
            ["Café Sacher", "11/29 08:00–09:20 · 예약 권장 · 미예약 · 가격미정"],
            ["Plachutta Wollzeile", "11/29 11:30–12:35 · 예약 필요 · 미예약"],
            ["Café Schwarzenberg", "11/29 17:50–18:45 · 미예약"],
            ["Gasthaus Reinthaler", "12/1 12:00–13:15 · 이메일 예약 확정"],
            ["대관람차", "11/29 16:15–17:20 · 미구매"]
          ],
          foot: "이 앱은 예약·결제·취소를 하지 않습니다. 예약 번호는 적지 않습니다."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["공항 열차", "€11 · 약 16,200원 · 추정 · 미구매"],
            ["24시간 디지털권", "11/28–29 · €38.80 · 약 57,300원 · 추정"],
            ["Bitzinger · 데멜 · 시장 점심 · 쇤브룬 · 시청사 · Krah Krah · Casablanca", "가격미정. 0원으로 두지 않음"],
            ["Figlmüller Wollzeile", "약 100,000–150,000원 · 추정 · 미예약"]
          ],
          foot: "1 EUR = 1,476.13원. 모르는 금액은 0원으로 두지 않습니다."
        }
      ]
    },
    {
      date: "2026-11-29",
      title: "자허 · 벨베데레 · 골든홀 입석",
      city: "비엔나",
      blurb: "일요일. 08:00 Café Sacher, 오페라 외관을 짧게 본 뒤 알베르티나 바스티온·호프부르크·미하엘러 광장, 10:30 그라벤 카페, 11:30 Plachutta 타펠슈피츠(예약 필요·미예약), 12:45 Läderach, 13:00 성당, 13:15 Manner, 14:00 벨베데레 입장(결제 완료), 16:15 프라터, 17:50 Café Schwarzenberg 파프리카훈(미예약), 19:30 골든홀 입석. 숙소에서 쉬는 시간은 없고, 베르무다 삼각지대도 오늘은 가지 않습니다. 일반 상점은 쉽고, Läderach 그라벤과 Manner 슈테판 광장 매장은 일요일에도 엽니다. 시각은 빈 현지 시각입니다.",
      guide: true,
      items: [
        {
          time: "08:00–09:20",
          placeId: "cafe-sacher",
          text: "아침 · Café Sacher · 자허토르테",
          note: "07:00 오픈. 예약 권장, 온라인 불가, 아직 예약하지 않았습니다. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "09:20–09:40",
          placeId: "opernpassage",
          text: "카를스플라츠에서 오페라 쪽으로",
          note: "오페라 외관을 짧게 보기 위한 이동입니다. 내부 투어는 없습니다."
        },
        {
          time: "09:20–09:40",
          placeId: "staatsoper",
          text: "국립 오페라 극장 외관 · 짧게",
          note: "정면만 보고 바로 알베르티나 쪽으로 갑니다."
        },
        {
          time: "09:40–10:30",
          placeId: "albertina",
          text: "알베르티나 바스티온",
          note: "09:40–10:30 안에 바스티온 리프트(박물관 표 없이), 호프부르크 외관, 미하엘러 광장입니다. 미술관 입장은 없습니다."
        },
        {
          time: "09:40–10:30",
          placeId: "hofburg",
          text: "호프부르크 외관",
          note: "같은 09:40–10:30 창. 바깥만 봅니다."
        },
        {
          time: "09:40–10:30",
          placeId: "hofreitschule",
          text: "스페인 승마학교 입구",
          note: "호프부르크에서 미하엘러 광장으로 지나가는 입구입니다. 공연은 보지 않습니다."
        },
        {
          time: "09:40–10:30",
          placeId: "michaelerplatz",
          text: "미하엘러 광장",
          note: "같은 09:40–10:30 창의 마지막입니다."
        },
        {
          time: "10:30–11:20",
          placeId: "graben",
          text: "그라벤 · 슈테판 광장 카페",
          note: "앉아서 쉽니다. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "11:30–12:35",
          placeId: "plachutta",
          text: "점심 · Plachutta Wollzeile 타펠슈피츠 · 예약 필요 · 미예약",
          note: "Wollzeile 38. 공식 타펠슈피츠 €36.90. 예약이 필요하고 아직 예약하지 않았습니다. 메인 2인 약 108,900원 · 추정. 와인·음료는 미정. 호이리게 대신 오스트리아 와인 잔술(그뤼너 펠틀리너·게미슈터 자츠)입니다. 굴라시는 시키지 않습니다. 0원으로 두지 않습니다."
        },
        {
          time: "12:45–13:00",
          placeId: "laederach-graben",
          text: "Läderach 그라벤 · Snacking Couverture",
          note: "Graben 7. Snacking Couverture Dark·Chocolate Snack Milk. 약 19,000–38,100원 · 추정. 매장 재고는 미확인. 0원으로 두지 않습니다."
        },
        {
          time: "13:00–13:15",
          placeId: "stephansdom",
          text: "슈테판 대성당 · 무료 구역",
          note: "줄이 길면 외관만 봅니다. 13:15에 나옵니다."
        },
        {
          time: "13:15–13:25",
          placeId: "manner-stephansplatz",
          text: "Manner 슈테판 광장 매장",
          note: "Stephansplatz 7. 일요일에도 엽니다. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "13:25–13:50",
          placeId: "tram-oper",
          text: "벨베데레로 이동 · 입장 준비",
          note: "트램 D로 14:00 입장에 맞춥니다."
        },
        {
          time: "14:00–15:30",
          placeId: "belvedere",
          text: "벨베데레 상궁 · 핵심 작품",
          docId: "belvedere-1129",
          booked: true,
          note: "✅ 입장 예약과 결제가 끝난 일정입니다. 11/29 14:00 입장, 2명, €46, 실제 결제 69,692원. 관람은 14:00–15:30이고 15:30에 나와 프라터로 갑니다. 티켓은 문서함에서 확인합니다. 매일 09:00–18:00. 시간 지정 티켓이 있으면 바로 입구로 갑니다. 현장 오디오 가이드 €5(약 7,400원)는 선택이고 오늘 합계에 넣지 않습니다."
        },
        {
          time: "15:30–16:15",
          placeId: "prater-riesenrad",
          text: "프라터로 이동",
          note: "숙소로 돌아가 쉬지 않습니다. 늦으면 프라터를 줄입니다."
        },
        {
          time: "16:15–17:20",
          placeId: "prater-riesenrad",
          text: "대관람차 · 프라터 겨울 마켓 · 미구매",
          note: "미예매. 탑승하면 성인 €14.50 × 2 = €29 · 약 43,500원 · 추정. 현장 가격과 대기 줄은 보장하지 않습니다. 17:20에 나옵니다. 늦으면 마켓만 보거나 관람차를 건너뜁니다."
        },
        {
          time: "17:20–17:50",
          placeId: "cafe-schwarzenberg",
          text: "Café Schwarzenberg로 이동",
          note: "프라터에서 17:20에 나와 17:50쯤 도착합니다."
        },
        {
          time: "17:50–18:45",
          placeId: "cafe-schwarzenberg",
          text: "저녁 · Café Schwarzenberg 파프리카훈 · 미예약",
          note: "미예약이고 테이블을 잡지 않았습니다. Kärntner Ring 17, 골든홀에서 걸어서 약 3–5분. 파프리카훈 €23.90, 멜랑주, 사과슈트루델. 슈니첼은 11/28에 먹습니다. 추천 구성 약 120,200원 · 추정. 와인을 더하면 미정. 굴라시는 시키지 않습니다. 플라후타 테이블을 잡아 둔 적이 없고, 취소할 예약도 없습니다. 0원으로 두지 않습니다."
        },
        {
          time: "18:45–19:00",
          placeId: "musikverein",
          text: "무직페라인까지 걷기",
          note: "Musikvereinsplatz 1. 카페에서 도보 약 3–5분입니다."
        },
        {
          time: "19:00–19:30",
          placeId: "musikverein",
          text: "골든홀 도착 · 입석 입장 준비",
          note: "좌석이 아닙니다. 입석 구역 안에서 자리는 자유입니다. 표는 발권되었습니다. 코트, 큰 가방, 우산은 보관소에 맡깁니다."
        },
        {
          time: "19:30–21:45",
          placeId: "musikverein",
          text: "골든홀 입석 2명 · 브루크너 오케스트라 린츠",
          docId: "golden-hall-1129",
          booked: true,
          note: "19:30 시작은 고정입니다. 오페라가 아니라 오케스트라 연주입니다. Großer Saal. Bruckner Orchester Linz. 성인 일반 입석 2매가 따로 발권되었고 예약은 확인되었습니다. 1매 €6, 액면 합계 €12 · 약 17,700원 · 실제. 입석 구역 안에서 자리는 자유입니다. 표에는 종료 시각이 없습니다. 공연장 월간 안내는 21:30 종료, 시 안내는 21:45 종료라 이 줄은 21:45까지입니다. 21:45는 확정된 종료가 아닙니다. 인쇄는 흰 종이 A4에 페이지 전체로 하고, 코드가 읽히게 보관합니다. 티켓은 문서함에서 확인합니다."
        },
        {
          time: "21:45–22:30",
          placeId: "adina-vie",
          text: "공연 뒤 복귀 여유",
          note: "숙소로 돌아갑니다. 시각을 더 고정하지 않습니다."
        }
      ],
      notes: [
        {
          title: "✅ 예약·결제 완료",
          docId: "belvedere-1129",
          rows: [
            ["벨베데레 상궁", "11/29 14:00 입장 · 2명 · €46 · 실제 결제 69,692원 · 티켓은 문서함"]
          ]
        },
        {
          title: "골든홀 발권 완료",
          docId: "golden-hall-1129",
          rows: [
            ["상태", "일반 입석 2매 발권 · 예약 확인 · 오페라가 아닌 오케스트라 연주 · 문서함"],
            ["금액", "1매 €6 · 액면 합계 €12 · 약 17,700원 · 실제"],
            ["자리", "좌석 없음 · 입석 구역 안에서 자유"],
            ["인쇄", "흰 종이 A4 전체 출력 · 코드가 읽혀야 함"]
          ]
        },
        {
          title: "아직 예약·구매하지 않은 것",
          rows: [
            ["Café Sacher", "08:00–09:20 · 예약 권장 · 미예약 · 가격미정"],
            ["Plachutta", "11:30–12:35 · 예약 필요 · 미예약 · 메인 약 108,900원 · 추정"],
            ["대관람차", "16:15–17:20 · €29 · 약 43,500원 · 추정 · 미예매"],
            ["Café Schwarzenberg", "17:50–18:45 · 미예약 · 약 120,200원 · 추정"]
          ],
          foot: "예매와 결제는 직접 하세요. 이 앱에는 예약 번호, 좌석, 카드 정보를 적지 않습니다."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["카페 자허", "가격미정. 0원으로 두지 않음"],
            ["그라벤 카페 · Manner", "가격미정. 0원으로 두지 않음"],
            ["Plachutta", "메인 약 108,900원 · 추정 · 와인 미정 · 미예약"],
            ["Läderach 그라벤", "약 19,000–38,100원 · 추정 · 재고 미확인"],
            ["벨베데레 상궁", "€46 · 실제 69,692원 · 결제 완료"],
            ["대관람차", "€29 · 약 43,500원 · 추정 · 미예매"],
            ["Café Schwarzenberg", "약 120,200원 · 추정 · 미예약 · 와인 추가 시 미정"],
            ["골든홀 입석", "€12 · 약 17,700원 · 실제 · 발권됨"]
          ],
          foot: "1 EUR = 1,476.13원. 벨베데레 69,692원은 다시 환산하지 않습니다. 이 날의 합계는 적지 않습니다."
        },
        {
          title: "추천 영화",
          rows: [
            ["보고 가면 좋은 영화", "아마데우스 · 불멸의 연인 · 비포 선라이즈"]
          ]
        }
      ]
    },
    {
      date: "2026-11-30",
      title: "잘츠부르크 · 모차르트 · 카드 · 마켓",
      city: "잘츠부르크",
      blurb: "월요일. 예매된 기차 08:28–10:53, 21:07–23:32는 그대로입니다. 도착하면 디지털 잘츠부르크 카드 24시간을 쓰고, 주거지는 핵심만 봅니다. 점심은 Balkan Grill, 12:50 접수, 13:00 슈티글은 결제 완료, 요새는 15:25–16:35 일몰 16:18입니다. 카드가 요새 Basic만 포함할 수 있으니 마술극장은 창구에서 확인합니다. 생가, Salzburg Salz, Fürst, 크람푸스, 저녁은 Sternbräu 노케를(미예약)입니다. 초콜릿 딥은 11/29 빈 그라벤에서 삽니다. 시각은 현지 시각입니다.",
      items: [
        {
          time: "07:40–08:15",
          placeId: "adina-vie",
          text: "숙소 → Wien Hbf · 아침·간식·승강장",
          note: "08:28 기차를 지킵니다. 물, 간식, 보조배터리. 아침 가격은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "08:28–10:53",
          placeId: "wien-hbf",
          leg: true,
          text: "Wien Hbf 08:28 → Salzburg Hbf 10:53 (ÖBB RJX 262)",
          docId: "train-vie-sbg",
          booked: true,
          note: "약 2시간 25분, 직행. ✅ 예매 완료(Sparschiene · 이 열차에만 탈 수 있고 변경 · 환불 불가). 2등석. 좌석 번호는 문서함에서 확인해요. Wien Hbf 3A-C 승강장(예약 확인서 기준, 당일 전광판 확인). 표는 문서함 PDF를 휴대폰에 띄워 보여 주면 됩니다. 여권 지참."
        },
        {
          time: "10:53–11:15",
          placeId: "salzburg-hbf",
          text: "도착 · 카드 활성화 · 버스로 미라벨",
          docId: "salzburg-card-1130",
          note: "첫 탑승(약 10:55)에서 디지털 카드를 씁니다. 버스에서는 카드가 등록되지 않습니다. 검표 때 휴대폰의 카드를 보여 줍니다. 시작 시각은 처음에는 그날 00:00으로 보이고, 첫 명소에서 등록된 뒤 링크를 다시 열면 실제 시작 시각이 나옵니다. 명소·푸니쿨라·리프트는 각 1회입니다. 푸니쿨라 왕복은 하산 전에 카드가 유효해야 합니다. 실물 카드가 아닙니다. 확인 PDF의 Download your ticket으로 연 모바일 카드를 보여 줍니다. PDF는 문서함에 있습니다. 시내버스 1회권 묶음은 사지 않습니다."
        },
        {
          time: "11:15–11:25",
          placeId: "mirabell",
          text: "미라벨 정원 외관 · 마카르트 다리",
          note: "짧게 봅니다. 정원은 무료. 페가수스 분수와 요새를 보고 옛 Makartsteg인 Marko-Feingold-Steg를 건넙니다."
        },
        {
          time: "11:25–12:05",
          placeId: "mozart-wohnhaus",
          text: "모차르트 주거지 내부 · 카드 · 핵심만",
          note: "Makartplatz 8. 잘츠부르크 카드로 들어갑니다. 공식 매일 9:00–17:30, 마지막 입장 17:00. 권장은 약 1시간이지만 오늘은 40분만 봅니다. 생가와 앉아서 먹는 점심까지 12:50 전에 넣지는 않습니다."
        },
        {
          time: "12:05–12:25",
          placeId: "balkan-grill",
          text: "Balkan Grill 보스나 · 빠른 점심",
          note: "Getreidegasse 33a. 매일 11:00–18:30, 서서 먹습니다. 줄이 길면 간식으로 바꾸고 12:25에는 버스로 갑니다. 가격은 미정이며 0원으로 두지 않습니다. 저녁은 Sternbräu입니다."
        },
        {
          time: "12:25–13:00",
          placeId: "stiegl-brauwelt",
          text: "버스 1번 · 슈티글 이동 · 12:50 접수",
          note: "구시가지에서 버스 약 12분, 하차 후 도보 약 10분. 12:22–12:25에는 출발합니다. 12:50까지 안뜰 Braushop 매표소. 확인 PDF와 잘츠부르크 카드를 함께 보여 주고 시음권으로 바꿉니다. Bräuhausstraße 9."
        },
        {
          time: "13:00–15:00",
          placeId: "stiegl-brauwelt",
          text: "슈티글 영어 생산 투어 · 3종 시음",
          docId: "stiegl-1130",
          booked: true,
          note: "예약·결제 완료(실제)입니다. 2명 카드 추가요금 €22(€11×2), 약 32,500원. 실제 카드 원화 청구액은 확인되지 않았습니다. 환불되지 않습니다. 월요일이라 생산 라인을 볼 수 있습니다. 약 2시간, 시음 3잔. 계단이 있어 휠체어는 어렵습니다. 박물관 10:00–18:00. 티켓은 문서함입니다. 출처 https://www.brauwelt.at/museum/brauereifuehrung/"
        },
        {
          time: "15:00–15:25",
          placeId: "salzburg-dom",
          text: "버스 1번 · 구시가지 · 푸니쿨라 이동",
          note: "Bräuhausstraße에서 Ferdinand-Hanusch-Platz까지 버스 1번, 약 12분에 정류장 도보. Festungsgasse 4 푸니쿨라. 투어가 늦으면 이 이동을 줄입니다."
        },
        {
          time: "15:25–16:35",
          placeId: "hohensalzburg",
          text: "호엔잘츠부르크 · 푸니쿨라 · 일몰 16:18",
          note: "월요일 요새 9:30–17:00, 푸니쿨라 9:00–17:00, 막차 하산 17:15. 일몰은 16:18이고 16:35에는 내려옵니다. 잘츠부르크 카드는 요새 Basic 입장만 포함할 수 있습니다. 마술극장이 카드에 들어 있는지는 현장에서 창구에 확인하세요. 공식 2026 안내의 올인클루시브는 참고일 뿐 단정하지 않습니다. 왕복은 하산 전에 카드가 유효해야 합니다."
        },
        {
          time: "16:35–16:50",
          placeId: "mozart-geburtshaus",
          text: "하산 · 모차르트 생가 도보",
          note: "약 10분. 16:35에는 내려옵니다."
        },
        {
          time: "16:50–17:25",
          placeId: "mozart-geburtshaus",
          text: "모차르트 생가 내부 · 카드",
          note: "Getreidegasse 9. 잘츠부르크 카드로 들어갑니다. 주거지와 같이 매일 9:00–17:30, 17:00 입장 마감. 줄이 길면 생가를 건너뛰고 소금 가게로 갑니다."
        },
        {
          time: "17:25–17:37",
          placeId: "salzburg-salz",
          text: "Salzburg Salz 소금 가게",
          note: "Wiener-Philharmoniker-Gasse 3, 생가 뒤. E.A.T. Trade. 생가에서 걸어서 2–3분. 공식 월–금 10:00–18:00, 토 09:00–17:00. 11/30은 월요일이라 18:00에 끝나서 생가 직후에 먼저 들릅니다. 가을 휴가는 매장 기준 2026-11-01까지입니다. 요리용 고체 소금만 삽니다. 식초·기름·브라인·스크럽 페이스트는 기내 반입에 주의합니다. 예약은 필요 없습니다. 가격미정이며 0원으로 두지 않습니다. 공식 사이트에 가격이 없습니다. 출처 https://www.salzburg-salz.at/en/home-english/"
        },
        {
          time: "17:37–17:55",
          placeId: "fuerst-salzburg",
          text: "Fürst 본점 · 원조 모차르트쿠겔",
          note: "Café Konditorei Fürst, Brodgasse 13, Alter Markt. 소금 가게에서 걸어서 갑니다. 공식 월–토 9:00–19:00, 일·공휴일 10:00–17:00이라 11/30 월요일은 영업합니다. 예약은 필요 없습니다. 원조 모차르트쿠겔 시식·구매, 약 13,600–35,700원 · 추정(공식 온라인 10개 낱개 포 €23, 개당 €2.30, 낱개 4개에서 선물상자 9개 €24.20까지, 1 EUR=1,476.13). 현장 낱개 판매가는 다를 수 있습니다. 0원으로 두지 않습니다. 초콜릿 딥은 11/29 빈 그라벤 Läderach에서 삽니다. 출처 https://www.original-mozartkugel.com/en/locations/alter-markt"
        },
        {
          time: "17:55–19:00",
          placeId: "salzburg",
          text: "대성당·레지덴츠 마켓 · 크람푸스 · 간식",
          note: "월요일 마켓 10:00–20:30. Radecker Pass 크람푸스는 17:30–19:00, 무료·미예약. 게트라이데 거리와 알터 마르크트도 지나므로 가게 앞에서 일부를 볼 수 있습니다. 글뤼바인과 간식. 굴라시는 먹지 않습니다. 가격은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "19:00–20:10",
          placeId: "sternbrau",
          text: "저녁 · Sternbräu 노케를 · 미예약",
          note: "Griesgasse 23. 가벼운 메인과 잘츠부르거 노케를(€12.50). 앉자마자 주문하고 20:10에 역으로 갑니다. 노케를 2인 약 36,900원 · 추정. 저녁 합계는 미정. 미예약. St. Peter 일반 식당을 본 저녁으로 두지 않습니다. 아우구스티너 맥주홀은 기본 일정에서 뺐습니다. 0원으로 두지 않습니다."
        },
        {
          time: "20:10–20:40",
          placeId: "salzburg-hbf",
          text: "버스로 역 이동 · 승강장",
          note: "잘츠부르크 카드로 버스를 탑니다. 미라벨 마켓은 가는 길에만 선택입니다. 21:07 기차를 지킵니다."
        },
        {
          time: "20:40–21:07",
          placeId: "salzburg-hbf",
          text: "승강장에서 대기",
          note: "21:07 고정 출발 전 버퍼. 20:55까지 승강장."
        },
        {
          time: "21:07–23:32",
          placeId: "salzburg-hbf",
          leg: true,
          text: "Salzburg Hbf 21:07 → Wien Hbf 23:32 (ÖBB RJX 13483)",
          docId: "train-vie-sbg",
          booked: true,
          docLabel: "기차표 보기",
          note: "약 2시간 25분, 직행(ÖBB Scotty 2026.11.30: Salzburg 4번 → Wien Hbf 9A-B). ✅ 예매 완료. 이 편은 좌석 예약이 없으니 예약 표시가 없는 빈자리에 앉습니다. 가는 편 좌석 번호는 문서함에서 확인해요. 표는 문서함 PDF, 여권 지참. Sparschiene는 이 열차만 가능하고 환불·취소가 되지 않습니다. 놓치면 22:07 RJX 367 → Wien Hbf 00:35는 새 표가 필요합니다."
        },
        {
          time: "23:32",
          placeId: "wien-hbf",
          text: "Wien Hbf 도착 → 숙소",
          note: "고정 열차의 도착입니다. 걸어서 5–10분. 내일은 체크아웃과 부다페스트행이니 짐은 미리 싸 둡니다."
        }
      ],
      notes: [
        {
          title: "잘츠부르크 기차",
          docId: "train-vie-sbg",
          rows: [
            ["가는 편", "Wien Hbf 08:28 → Salzburg Hbf 10:53 (RJX 262)"],
            ["좌석", "좌석 번호는 문서함에서 확인해요 · 2등석 · 오는 편은 좌석 예약 없음"],
            ["오는 편", "Salzburg Hbf 21:07 → Wien Hbf 23:32 (RJX 13483, 직행)"],
            ["놓쳤을 때", "마지막 직행 22:07 RJX 367 → Wien Hbf 00:35 (Sparschiene는 열차 지정이라 새 표 필요)"],
            ["표", "✅ 예매 완료 · ÖBB Sparschiene 2명: 가는 편 €24.90 × 2 + 오는 편 €19.90 × 2 + 좌석 예약 €6 = €95.60 (약 141,900원)"],
            ["조건", "Sparschiene는 열차 지정 · 변경 · 환불 불가. 표는 문서함 PDF."],
            ["신분증", "여권 지참"],
            ["현지 이동", "구시가지는 걸어서. 시내버스와 요새 푸니쿨라는 잘츠부르크 카드. 1회권 묶음은 사지 않습니다."]
          ],
          foot: "시간·요금은 ÖBB 예약 확인서 기준. 좌석 번호는 문서함에서 확인해요."
        },
        {
          title: "잘츠부르크 카드",
          docId: "salzburg-card-1130",
          rows: [
            ["권종", "공식 디지털 24시간 성인 2장 · 실물 카드 아님"],
            ["결제", "유로 €70 결제 완료(실제) · 약 103,300원 · 2026-11-21 한국경제 종가 1 EUR=1,476.13원 · 실제 카드 원화 청구액은 확인되지 않음"],
            ["시간", "바우처의 Arrival 30.11.2026 / Departure 01.12.2026 / Duration 2 day(s)는 24시간권의 예약 구간입니다. 48시간권이 아닙니다. 첫 명소에 등록한 뒤 24시간입니다."],
            ["사용", "첫 탑승에서 디지털 카드를 씁니다. 버스에서는 등록되지 않고, 검표 때 휴대폰 카드를 보여 줍니다. 시작 시각은 처음 00:00으로 보이며, 첫 명소 등록 후 링크를 다시 열면 실제 시작이 나옵니다."],
            ["제시", "확인 PDF의 Download your ticket 또는 모바일 링크로 연 모바일 카드를 보여 줍니다. 링크는 문서함 PDF 안에만 있습니다."],
            ["취소", "사용 전(미사용) 카드는 무료 취소가 가능하다는 공식 안내가 있습니다. 이미 쓸 계획이므로 취소하지 않습니다."],
            ["포함", "모차르트 주거지 · 생가 내부 · 시내 교통. 요새는 Basic 입장만 카드에 들어 있을 수 있습니다. 마술극장은 현장에서 창구에 확인하세요. 공식 2026 올인클루시브 안내는 참고입니다. 명소·푸니쿨라는 각 1회이고, 왕복은 하산 전에 카드가 유효해야 합니다."],
            ["요새", "15:25–16:35 · 일몰 16:18 · 월요일 9:30–17:00 · 푸니쿨라 9:00–17:00 · 막차 하산 17:15."],
            ["리프트", "기본 일정에는 없습니다. 크람푸스를 일찍 보고 야경을 보고 싶을 때만 선택. 월요일 19:00 종료, 카드 1회 왕복."],
            ["넣지 않음", "돔쿼티어 · 자연사 박물관 · 헬브룬 · 운터스베르크반 · 유람선은 11/30에 닫혀 있거나 시간이 맞지 않습니다."],
            ["할인", "식당 · 카페 · 마켓 · 슈티글 샵 할인은 확인되지 않았습니다."]
          ]
        },
        {
          title: "슈티글 생산 투어",
          docId: "stiegl-1130",
          rows: [
            ["상태", "13:00 영어 생산 투어 · 예약·결제 완료(실제) · 문서함"],
            ["금액", "카드 추가요금 2명 €22(€11×2) · 약 32,500원 · 환불 불가"],
            ["접수", "12:50까지 안뜰 Braushop 매표소. 확인 PDF를 시음권으로 교환. 잘츠부르크 카드도 함께 제시."],
            ["교체", "낱장 약 €154.20을 카드 €70 + 추가요금 €22로 대체. 투어를 하나 더 더한 것이 아닙니다."]
          ]
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["기차 왕복 (예약 완료)", "€95.60 (약 141,900원) · 기존 예약 · 여행 전체 합계로 다시 묶지 않음"],
            ["Salzburg Card 24시간 성인 2장 (결제 완료·실제)", "€70 · 약 103,300원"],
            ["슈티글 카드 추가요금 (결제 완료·실제)", "€22 · 약 32,500원 · 시음은 이 추가요금에 포함"],
            ["카드+추가요금", "€92 · 약 135,800원 · 실제 유로 결제. 원화는 환율 환산"],
            ["낱장 대비", "시내 €10.40 · 모차르트 콤비 €50 · 요새 올인클루시브 €38.40 · 리프트 €9.60 · 슈티글 정가 €45.80 = €154.20(약 227,600원). 지불 €92가 약 €62.20(약 91,800원) 낮음"],
            ["Balkan Grill", "가격미정. 0원으로 두지 않음"],
            ["Sternbräu 노케를", "€12.50 · 2인 약 36,900원 · 추정. 저녁 합계는 미정 · 미예약"],
            ["Salzburg Salz", "요리용 고체 소금 · 가격미정. 0원으로 두지 않음"],
            ["17:37 Fürst", "원조 모차르트쿠겔 · 약 13,600–35,700원 · 추정 · 현장 낱개가는 다를 수 있음"],
            ["17:55 마켓 간식", "가격미정. 0원으로 두지 않음"]
          ],
          foot: "원화의 약은 2026-11-21 한국경제 종가 1 EUR=1,476.13원입니다. 기차 약 141,900원은 기존 견적입니다. 실제 카드 원화 청구액은 확인되지 않았습니다. 리프트는 기본 일정이 아닙니다."
        }
      ]
    },
    {
      date: "2026-12-01",
      title: "빈 오전 · 부다페스트 저녁",
      city: "기차",
      blurb: "화요일. 체크아웃 뒤 Café Frauenhuber 09:00–10:30, 슈테판 광장·그라벤 산책, 12:00 Gasthaus Reinthaler(이메일 예약 확정), 페터스 교회와 디저트, 15:10 Wien Hbf INTERSPAR에서 Wiener Zuckerl, 15:40 빈→부다페스트 기차는 예매된 그대로. 저녁은 19:40 대성당 마켓과 20:30 라이트쇼이고 랑고시와 굴라시는 없습니다. 젤라토는 12/4 낮으로 옮겼습니다. (선택) DiVino. 시각은 현지 시각입니다.",
      items: [
        {
          time: "08:30–09:00",
          placeId: "adina-vie",
          text: "체크아웃 · 짐 맡기기",
          note: "체크아웃 11:00. 리셉션에 짐을 맡기고 나갑니다."
        },
        {
          time: "09:00–10:30",
          placeId: "cafe-frauenhuber",
          text: "아침 · Café Frauenhuber",
          note: "Himmelpfortgasse 6. 아침 08:00–12:00. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "10:30–11:40",
          placeId: "graben",
          text: "슈테판 광장 · 그라벤 산책",
          note: "여유 산책입니다. 긴 쇼핑 창이 아닙니다. 금액은 확정하지 않습니다."
        },
        {
          time: "12:00–13:15",
          placeId: "gasthaus-reinthaler",
          text: "점심 · Gasthaus Reinthaler · 이메일 예약 확정",
          booked: true,
          note: "Gluckgasse 5. 이메일 예약 확정. 추천은 프리타텐수프 €5.20, 츠비벨로스트브라텐 €21.60 또는 바우언슈마우스 €18.20입니다. 슈니첼과 굴라시는 시키지 않습니다. 메인·디저트 약 72,600–99,200원 · 추정. 수프를 더하면 약 15,400원 · 추정. 음료는 미정. 0원으로 두지 않습니다. 공식 월–금 11:00–23:00, 주방 11:30–22:00. 12/1 화요일은 영업합니다."
        },
        {
          time: "13:15–14:00",
          placeId: "peterskirche",
          text: "페터스 교회 · 디저트 카페",
          note: "성당을 보고 근처에서 디저트입니다. 카페 가격은 미정이며 0원으로 두지 않습니다. 14:00 짐 찾기와 겹치지 않습니다."
        },
        {
          time: "14:00–14:40",
          placeId: "adina-vie",
          text: "숙소에서 짐 찾기",
          note: "휴식 블록이 아닙니다. 그 뒤 Wien Hbf로 갑니다."
        },
        {
          time: "14:40–15:10",
          placeId: "wien-hbf",
          text: "Wien Hbf로 이동",
          note: "15:40 기차를 지키려고 역에 먼저 갑니다."
        },
        {
          time: "15:10–15:25",
          placeId: "interspar-wien-hbf",
          text: "INTERSPAR · Wiener Zuckerl 구매",
          note: "역 지하 UG1. 역 안 대형 마트는 BILLA가 아니라 INTERSPAR입니다. 12/1 화요일 15:10에는 영업합니다. Wiener Zuckerl 약 3,400–14,800원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "15:25–15:40",
          placeId: "wien-hbf",
          text: "승강장 확인 · 여유",
          note: "15:40 출발 전 버퍼입니다."
        },
        {
          time: "15:40–18:29",
          placeId: "wien-hbf",
          leg: true,
          text: "Wien Hbf 15:40 → Budapest Keleti 18:29 (ÖBB RJX 65)",
          docId: "train-vie-bud",
          booked: true,
          note: "✅ 예매 완료. 2등석. 좌석 번호는 문서함에서 확인해요. €35.80 · 약 52,800원 · 실제. 표는 문서함 PDF, 여권 지참."
        },
        {
          time: "18:29–19:15",
          placeId: "adina-bud",
          text: "Keleti 도착 → 숙소 체크인",
          note: "18:29 Budapest Keleti. 체크인 15:00부터. 짐이 있으면 Bolt를 볼 수 있습니다. 요금은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "19:15–19:40",
          placeId: "basilica",
          text: "대성당 광장으로 이동",
          note: "19:40 마켓에 맞춥니다."
        },
        {
          time: "19:40–20:20",
          placeId: "basilica",
          text: "Advent Bazilika 마켓 저녁",
          note: "따뜻한 저녁입니다. 랑고시와 굴라시는 먹지 않습니다. 약 12,000–16,000원 · 추정은 마켓과 이어지는 라이트쇼를 함께 본 범위입니다. 0원으로 두지 않습니다."
        },
        {
          time: "20:20–20:50",
          placeId: "basilica",
          text: "라이트쇼 · 20:30 회차",
          note: "20:30 회차를 봅니다. 마켓·라이트쇼 약 12,000–16,000원 · 추정."
        },
        {
          time: "20:50–21:35",
          placeId: "lanchid",
          text: "강변 · 체인 브리지 도보 야경",
          note: "유람선이 아닙니다. 다리는 12/2에 건너므로 오늘은 강변과 입구입니다."
        },
        {
          time: "21:40–22:30",
          placeId: "divino-bazilika",
          text: "(선택) DiVino · 토카이 또는 프뢰치",
          note: "약 16,000–20,000원 · 추정. 빼도 됩니다. 젤라토는 12/4 낮 Gelarto Rosa입니다. 0원으로 두지 않습니다."
        }
      ],
      notes: [
        {
          title: "기차표",
          docId: "train-vie-bud",
          rows: [
            ["출발", "Wien Hbf 15:40 (ÖBB RJX 65)"],
            ["도착", "Budapest Keleti 18:29"],
            ["좌석", "좌석 번호는 문서함에서 확인해요 · 2등석"],
            ["표", "✅ 예매 완료 · €35.80 · 약 52,800원 · 실제 · 변경 · 환불 불가"]
          ],
          foot: "시간·요금은 예약 확인서 기준. 좌석 번호는 문서함에서 확인해요."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["기차 (결제 완료)", "€35.80 · 약 52,800원 · 실제"],
            ["Café Frauenhuber", "가격미정. 0원으로 두지 않음"],
            ["Gasthaus Reinthaler 점심", "메인·디저트 약 72,600–99,200원 · 추정 · 이메일 예약 확정. 수프 추가 약 15,400원 · 추정. 음료 미정"],
            ["페터스 교회 디저트", "가격미정. 0원으로 두지 않음"],
            ["Wiener Zuckerl", "15:10 Wien Hbf INTERSPAR · 약 3,400–14,800원 · 추정"],
            ["마켓 · 라이트쇼", "약 12,000–16,000원 · 추정. 랑고시·굴라시 없음"],
            ["(선택) DiVino", "약 16,000–20,000원 · 추정"]
          ],
          foot: "1 EUR = 1,476.13원 · 1 HUF ≈ 3.95원. 랑고시와 굴라시는 먹지 않습니다."
        },
        {
          title: "부다페스트 숙소",
          rows: [
            ["호텔", "Adina Apartment Hotel Budapest"],
            ["숙박", "12/01 ~ 12/05 (4박)"]
          ],
          foot: "예약 확인서는 개인 보관"
        }
      ]
    },
    {
      date: "2026-12-02",
      title: "Stand25 · 성 일몰",
      city: "부다페스트",
      blurb: "수요일. 레헬 시장 아침 뒤 오전의 어부의 요새·왕궁 산책은 하지 않습니다. 머르기트 다리와 페스트 강변, 우일리포토바로시 카페를 보고 13:00 Stand25(예약 완료, 이 여행의 굴라시는 여기만)입니다. 15:25 어부의 요새 일몰, 16:10 마차시 성당 내부, 17:20 트램 2, 18:00 마켓 저녁, 19:15 Élesztő. 유람선은 없습니다. 시각은 현지 시각입니다.",
      items: [
        {
          time: "08:30–09:30",
          placeId: "lehel-market",
          text: "아침 · 레헬 시장 Csirke Csibész",
          note: "숙소에서 도보 약 5분. 약 10,000–14,000원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "09:30–11:00",
          placeId: "margit-pest",
          text: "머르기트 다리 · 페스트 강변 산책",
          note: "오전에 어부의 요새나 왕궁을 먼저 돌지 않습니다."
        },
        {
          time: "11:00–12:15",
          placeId: "ujlipotvaros",
          text: "우일리포토바로시 카페",
          note: "Pozsonyi út 일대. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "13:00–15:00",
          placeId: "stand25",
          text: "점심 · Stand25 · 굴라시 · 예약 완료",
          docId: "restaurant-stand25",
          booked: true,
          note: "✅ 예약 완료 · 12/2 수 13:00 · 2명. 예약번호는 문서함에서 확인해요. 굴라시·메기 파프리카시·쇼믈로이. 랑고시는 시키지 않습니다. 팔링커는 선택입니다. 약 81,800원 · 추정. 서비스 차지와 팔링커는 미정. 굴라시는 이번 여행에서 여기서만 먹습니다. 0원으로 두지 않습니다."
        },
        {
          time: "15:00–15:25",
          placeId: "varkert-bazar",
          text: "Várkert Bazár 리프트",
          note: "무료 리프트로 성 쪽으로 올라갑니다."
        },
        {
          time: "15:25–16:10",
          placeId: "bastion",
          text: "어부의 요새 아래 테라스 · 일몰 15:54",
          note: "아래 테라스와 리프트는 무료입니다. 위층은 선택이고 2인 약 13,400원 · 추정입니다. 일몰은 15:54입니다."
        },
        {
          time: "16:10–16:50",
          placeId: "matthias",
          text: "마차시 성당 내부",
          note: "마지막 입장 16:45, 마감 17:00. 약 26,900원 · 추정. 10:45 입장이 아닙니다. 0원으로 두지 않습니다."
        },
        {
          time: "17:20–18:00",
          placeId: "danube",
          text: "트램 2 강변 야경",
          note: "유람선 대신 트램 2입니다. 요금은 타는 권종에 따르며 0원으로 두지 않습니다."
        },
        {
          time: "18:00–19:05",
          placeId: "vorosmarty",
          text: "뵈뢰슈마르티 마켓 저녁",
          note: "약 39,500원 · 추정. 굴라시와 랑고시는 시키지 않습니다. 0원으로 두지 않습니다."
        },
        {
          time: "19:15–21:00",
          placeId: "eleszto",
          text: "Élesztő",
          note: "약 12,000–16,000원 · 추정. 0원으로 두지 않습니다."
        }
      ],
      notes: [
        {
          title: "✅ 예약 완료",
          docId: "restaurant-stand25",
          rows: [
            ["Stand25", "12/2 점심 13:00 · 2명 · 예약 완료 · 굴라시 · 약 81,800원 · 추정 · 예약번호는 문서함에서 확인해요"]
          ]
        },
        {
          title: "아직 예약이 없는 식사",
          rows: [
            ["Comme Chez Soi", "12/3 점심 13:00 · 미예약 · 가장 급함"],
            ["Negro Mangalica", "12/3 저녁 17:30 · 미예약 · 권장"],
            ["Parasztkonyha", "12/4 저녁 18:30 · Október 6. utca · 미예약 · 권장 · 치킨 파프리카시"],
            ["기본이 아님", "iF Jazz와 오후 숙소 휴식, 12/4 중앙시장 재방문은 기본 일정에 없습니다."]
          ],
          foot: "예약 번호는 적지 않습니다. 이 앱은 예약·결제를 하지 않습니다."
        }
      ]
    },
    {
      date: "2026-12-03",
      title: "세체니 · 루인바",
      city: "부다페스트",
      blurb: "목요일. 늦게까지 노는 밤은 오늘입니다. 가벼운 아침은 미정이고 07:50에 나섭니다. 세체니 Good morning은 09:00 전 현장 입장, Espresso Embassy, Comme Chez Soi 13:00(미예약·가장 급함), 도하니 14:50(입장 마감 15:00), Fröhlich 플로드니(닫히면 Massolit), Massolit, Printa, Negro 17:30(미예약), Szimpla. 시각은 현지 시각입니다.",
      items: [
        {
          time: "07:50",
          placeId: "adina-bud",
          text: "숙소 출발 · 가벼운 아침",
          note: "아침 장소와 가격은 미정입니다. 0원으로 두지 않습니다."
        },
        {
          time: "08:20–10:50",
          placeId: "szechenyi",
          text: "세체니 온천 · Good morning · 09:00 전 입장",
          note: "현장 구매. 09:00 전에 들어갑니다. 약 83,000원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "10:50–13:00",
          placeId: "vajdahunyad",
          text: "아이스링크 구경 · 시립공원",
          note: "10:50–13:00 안에 공원, 영웅 광장, 오페라 외관, Espresso Embassy가 있습니다. 스케이팅은 선택이고 기본은 구경입니다."
        },
        {
          time: "10:50–13:00",
          placeId: "hosok-tere",
          text: "영웅 광장",
          note: "같은 10:50–13:00 창. 무료로 보고 지나갑니다."
        },
        {
          time: "10:50–13:00",
          placeId: "opera",
          text: "안드라시 · 오페라 외관",
          note: "외관만 봅니다. 공연 티켓은 없습니다."
        },
        {
          time: "10:50–13:00",
          placeId: "espresso-embassy",
          text: "Espresso Embassy",
          note: "Arany János utca 15. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "13:00–14:30",
          placeId: "comme-chez-soi",
          text: "점심 · Comme Chez Soi · 미예약 · 가장 급함",
          note: "거위 간·파스타. 굴라시 수프는 시키지 않습니다. 아직 예약하지 않았고 이 여행에서 가장 급한 예약입니다. 약 86,000원 · 추정. 음료는 미정. 0원으로 두지 않습니다."
        },
        {
          time: "14:50–15:50",
          placeId: "jewish",
          text: "도하니 회당",
          note: "14:50 도착. 입장 마감 15:00. 약 114,600원 · 추정. 온라인 구매를 권합니다. 0원으로 두지 않습니다."
        },
        {
          time: "15:50–16:15",
          placeId: "frohlich",
          text: "Fröhlich Cukrászda · 플로드니",
          note: "Dob utca 22. 가격미정. 닫혀 있으면 Massolit로 갑니다. 0원으로 두지 않습니다."
        },
        {
          time: "16:15–16:40",
          placeId: "massolit",
          text: "Massolit",
          note: "Nagy Diófa utca 30. 카페 가격은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "16:40–17:05",
          placeId: "printa",
          text: "Printa",
          note: "Rumbach Sebestyén utca 10. 소품 가격은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "17:30–19:15",
          placeId: "negromangalica",
          text: "저녁 · Negro Mangalica · 미예약 · 권장",
          note: "아직 예약하지 않았습니다. 약 53,000원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "19:30–23:30",
          placeId: "szimpla",
          text: "Szimpla Kert",
          note: "2잔 약 15,000원 · 추정. 당일 공연명은 확인하지 않았습니다. 0원으로 두지 않습니다."
        }
      ],
      notes: [
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["아침", "가격미정. 0원으로 두지 않음"],
            ["세체니 Good morning", "약 83,000원 · 추정 · 09:00 전 현장 구매"],
            ["Espresso Embassy", "가격미정"],
            ["Comme Chez Soi", "약 86,000원 · 추정 · 미예약 · 가장 급함 · 음료 미정"],
            ["도하니 회당", "약 114,600원 · 추정"],
            ["Fröhlich · Massolit · Printa", "가격미정. 0원으로 두지 않음"],
            ["Negro Mangalica", "약 53,000원 · 추정 · 미예약"],
            ["Szimpla", "2잔 약 15,000원 · 추정"]
          ],
          foot: "1 HUF ≈ 3.95원. 이 날의 합계는 적지 않습니다."
        }
      ]
    },
    {
      date: "2026-12-04",
      title: "랑고시 · 쇼핑 · 라이트쇼",
      city: "부다페스트",
      blurb: "금요일. 중앙시장 기본 랑고시로 시작해 동굴교회, Kelet, 국회 외관과 신발 추모비, Bortársaság, 대성당 마켓 점심과 돔, 14:15 Gelarto Rosa, Rózsavölgyi, 바치와 선택 굴뚝빵, Gerbeaud, 17:30 라이트쇼, 18:30 Parasztkonyha 치킨 파프리카시(미예약), 국회 야경, DiVino. 오후 숙소 휴식과 중앙시장 재방문, iF Jazz는 기본 일정이 아닙니다. 22:30에는 숙소. 내일 07:45 출발입니다. 시각은 현지 시각입니다.",
      items: [
        {
          time: "08:50–09:45",
          placeId: "great-market",
          text: "중앙시장 · 기본 랑고시",
          note: "사워크림과 치즈만. 약 8,000–12,000원 · 추정. 파프리카·과일·투로 루디·우니쿰 미니를 볼 수 있습니다. 쇼핑 약 20,000–40,000원 · 추정. 과일과 간식은 미정. 랑고시는 이날 아침만. 0원으로 두지 않습니다."
        },
        {
          time: "10:00–10:30",
          placeId: "cave-church",
          text: "동굴교회",
          note: "약 11,100원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "10:30–11:00",
          placeId: "kelet",
          text: "Kelet Kávézó",
          note: "Bartók Béla út 29. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "11:25–12:10",
          placeId: "parliament",
          text: "국회 외관",
          note: "내부 투어는 없습니다. 11:25–12:10 안에 외관과 신발 추모비를 봅니다."
        },
        {
          time: "11:25–12:10",
          placeId: "shoes",
          text: "신발 추모비",
          note: "무료입니다. 같은 11:25–12:10 창입니다."
        },
        {
          time: "12:10–12:30",
          placeId: "bortarsasag",
          text: "Bortársaság · 와인 2병",
          note: "Vécsey utca 5, Kossuth tér 가게. 금요일 11:00–20:00. 와인 2병 약 74,500원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "12:45–13:25",
          placeId: "basilica",
          text: "대성당 마켓 점심",
          note: "양배추 롤·뱅쇼. 약 20,000–32,000원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "13:25–14:15",
          placeId: "basilica",
          text: "대성당 내부 · 돔",
          note: "약 53,700원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "14:15–14:35",
          placeId: "gelarto-rosa",
          text: "Gelarto Rosa · 장미 젤라토",
          note: "낮에 먹습니다. 12/1 밤이 아닙니다. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "14:35–14:55",
          placeId: "rozsavolgyi",
          text: "Rózsavölgyi",
          note: "Szervita tér 5. 약 30,100–45,100원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "14:55–15:35",
          placeId: "vorosmarty",
          text: "뵈뢰슈마르티 · 바치 · 선택 굴뚝빵",
          note: "굴뚝빵은 선택입니다. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "15:35–16:20",
          placeId: "gerbeaud",
          text: "Gerbeaud",
          note: "Vörösmarty tér. 제르보·에스테르하지·도보스. 케이크 가격은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "17:30–18:20",
          placeId: "basilica",
          text: "대성당 라이트쇼",
          note: "17:30 회차 전후로 봅니다."
        },
        {
          time: "18:30–20:00",
          placeId: "parasztkonyha",
          text: "저녁 · Parasztkonyha · 치킨 파프리카시 · 미예약 · 권장",
          note: "Október 6. utca. 치킨 파프리카시와 팔링커. 굴라시와 푀르켈트는 시키지 않습니다. 아직 예약하지 않았습니다. 약 85,500원 · 추정. 팔링커는 미정. 0원으로 두지 않습니다."
        },
        {
          time: "20:00–20:50",
          placeId: "parliament",
          text: "국회 야경",
          note: "강변에서 외관을 봅니다. 내부 투어는 없습니다."
        },
        {
          time: "21:00–22:20",
          placeId: "divino-bazilika",
          text: "DiVino",
          note: "약 16,000–20,000원 · 추정. 0원으로 두지 않습니다."
        },
        {
          time: "22:30",
          placeId: "adina-bud",
          text: "숙소 복귀",
          note: "22:30에는 숙소입니다. 오후 휴식과 중앙시장 재방문, iF Jazz는 기본 일정이 아닙니다. 내일 07:45 출발."
        }
      ],
      notes: [
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["기본 랑고시", "약 8,000–12,000원 · 추정. 이날 아침만"],
            ["시장 쇼핑", "약 20,000–40,000원 · 추정. 과일·간식 미정"],
            ["동굴교회", "약 11,100원 · 추정"],
            ["Kelet", "가격미정"],
            ["와인 2병", "약 74,500원 · 추정"],
            ["마켓 점심", "약 20,000–32,000원 · 추정"],
            ["대성당 돔", "약 53,700원 · 추정"],
            ["Gelarto Rosa · 굴뚝빵 · Gerbeaud", "가격미정. 0원으로 두지 않음"],
            ["Rózsavölgyi", "약 30,100–45,100원 · 추정"],
            ["Parasztkonyha", "치킨 파프리카시 약 85,500원 · 추정 · 미예약. 팔링커 미정. 굴라시·푀르켈트 제외"],
            ["DiVino", "약 16,000–20,000원 · 추정"]
          ],
          foot: "1 HUF ≈ 3.95원. 이 날의 합계는 적지 않습니다. iF Jazz는 기본 일정이 아닙니다."
        }
      ]
    },
    {
      date: "2026-12-05",
      title: "출발",
      city: "부다페스트 → 인천",
      blurb: "토요일. 07:00 호텔 조식(가격미정)을 먹고 07:45에 나섭니다. 늦어도 08:15에는 숙소를 나섭니다. M3와 100E 전용권으로 T2B에 갑니다. 일반 단일권·72시간권으로는 100E를 타지 못합니다. 2인 약 19,800원 · 추정. 11:30 BUD 출발. 12/6은 현지 시간이고 기내식은 항공에 포함됩니다.",
      items: [
        {
          time: "07:00–07:45",
          placeId: "adina-bud",
          text: "호텔 조식",
          note: "주말 조식은 07:00부터입니다. 가격미정. 0원으로 두지 않습니다."
        },
        {
          time: "07:45",
          placeId: "adina-bud",
          text: "체크아웃 · 공항 이동 (M3 → 100E 전용권)",
          note: "총 약 50–60분. 늦어도 08:15에는 숙소를 나서세요(체크인 마감 10:45). ① 숙소에서 Lehel tér까지 걸어서 약 5분. ② M3 Lehel tér → Deák Ferenc tér(3정거장, 약 5분, 단일권 1인 500 HUF). ③ Deák Ferenc tér 지상, Károly körút의 Városháza 공원 쪽(BudapestInfo 근처) 100E 정류장('Repülőtér/Airport' 표지)에서 100E 공항버스 → Liszt Ferenc Airport 2, 약 35–40분. 100E는 Deák Ferenc tér → Kálvin tér → 공항만 서는 급행이고, 아침에는 10–15분 간격, 24시간 운행(BKK 공식). Deák가 출발 정류장이라 자리와 짐 칸을 잡기 쉽습니다. 요금은 전용 공항버스권 1인 2,500 HUF(2명 5,000 HUF · 약 19,800원 · 추정)이고, 72시간권 · 24시간권 같은 패스나 일반 단일권으로는 못 탑니다. 호텔 조식은 07:00–07:45, 가격미정입니다. 기내식은 항공에 포함됩니다. 앞문으로 타서 앞문 옆 단말기에 카드를 1명당 한 번씩 탭하세요(BudapestGO 앱으로 사도 됨). 08:05–08:20 버스를 타면 08:45–09:00쯤 T2B에 도착합니다. Bolt/택시 대비 2명 약 3.6–4.5만 원 절약(추정). 단점: 짐(1인 위탁 2개까지)을 들고 Deák에서 지상으로 올라가 갈아타야 합니다. 72시간권을 샀고 아직 유효하면 M3를 Kőbánya-Kispest까지 타고(약 25분) 200E 일반 버스(약 25분, 패스 가능)로 갈 수도 있지만, 서는 곳이 많고 붐빌 수 있습니다. 짐이 너무 많으면 Bolt를 부르세요. 호텔 조식은 주말 07:00부터라 07:00에 먹고 나오면 됩니다."
        },
        { time: "11:30", placeId: "bud", leg: true, text: "12/5 11:30 부다페스트(BUD) T2B 출발 · MU8640 / FM870", note: "기내식은 항공에 포함됩니다." },
        { time: "12/6", placeId: "pvg", leg: true, text: "12/6 05:25 상하이 푸동(PVG) 도착 · 환승. 08:40 출발 · MU5041", note: "시각은 현지 시간입니다. 기내식은 항공에 포함됩니다." },
        { time: "12/6", placeId: "icn", leg: true, text: "12/6 11:55 인천공항(ICN) 도착", note: "시각은 현지 시간입니다." }
      ]
    }
  ]
};
