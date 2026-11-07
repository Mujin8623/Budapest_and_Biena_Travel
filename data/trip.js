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
    "2026-11-29": ["belvedere-1129"],
    "2026-11-30": ["train-vie-sbg"],
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
    "concert-dinner": {
      name: "콘서트홀 근처 저녁 (미정)",
      city: "비엔나",
      lat: 48.20115,
      lng: 16.3716,
      station: "Karlsplatz",
      lines: "U1 · U2 · U4"
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
            ["수하물", "위탁 수하물 1인 2개, 각 세 변의 합 158cm 이내"]
          ],
          foot: "예약 확인서는 개인 보관"
        },
        {
          title: "여행 경비 (2명 · 항공 · 숙소 제외)",
          rows: [
            ["상한", "1인 120만 원 × 2명 = 240만 원. 항공·숙소는 이 상한 밖입니다."],
            ["이 앱의 이전 기준", "쇼핑 제외 현지 약 1,779,500원(main). 보험 추정 29,650원은 이 앱에 없습니다. 페이지의 현지 1,798,550원·총액 3,688,550원은 그 보험을 넣은 이전 기준이고, 여기서 더하지 않습니다."],
            ["11/28 비엔나", "같은 식사 견적 약 177,300원(소시지 · 데멜 · Ribs · 시청사 뱅쇼 · Krah Krah · Casablanca). 쇤브룬 마켓 소비는 견적 없음. 0원으로 두지 않습니다."],
            ["11/29 비엔나", "가격이 있는 줄: 카페 자허 약 47,500원 · 벨베데레 실제 69,692원 · 대관람차 계획 43,500원 · 골든홀 입석 계획 18,000원. 점심·저녁은 미정. 플라후타 약 70,000원과 Philosoph 약 26,000원 추정은 일정에서 뺐습니다. 그 식당을 예약한 적은 없습니다."],
            ["11/30 잘츠부르크", "예전 하루 묶음 약 366,500원에 들어 있던 슈티글을 계획 68,700원으로 바꿉니다. 예전 약 68,000원의 교체이고, 투어를 하나 더 더하지 않습니다."],
            ["12/1 이동일", "기차 약 53,100원 · Figlmüller 약 62,000원은 유지. 랑고시는 없음. 아침·유동 디저트·마켓 따뜻한 저녁은 미정입니다. 예전 랑고시 포함 저녁 금액을 그대로 두거나 0원으로 두지 않습니다."],
            ["12/2 부다페스트", "약 160,000원 (시장 아침 · Stand25 · 마켓 저녁 · Élesztő). 이 날짜 일정은 그대로"],
            ["12/3 부다페스트", "약 257,800원 (세체니 · Comme Chez Soi · Negro Mangalica · Szimpla 늦게까지)"],
            ["12/4 부다페스트", "약 144,000원 (랑고시 · 마켓 점심 · Parasztkonyha · 선택 재즈). 랑고시는 이 날만"],
            ["교통", "약 153,000원 (비엔나 7일권 + 공항 구간 2명 €55 · 부다페스트 단일권 · 12/5 100E 공항버스)"],
            ["예비비", "약 150,000원 유지. 미정 식사를 이 예비비로 확정하거나 0원으로 메우지 않습니다."],
            ["확정 합계", "적지 않습니다. 골든홀 입석과 대관람차 계획 61,500원은 기준 원장에 없던 명목 한 쌍이고, 빠진 식사 추정과 상계한 새 총액이 아닙니다."]
          ],
          foot: "기존 원화 견적은 1 EUR ≈ 1,484원을 유지합니다. 이번에 새로 적는 유로 계획액만 1 EUR = 1,500원입니다. 벨베데레 69,692원은 실제 결제액이라 1,500원으로 다시 바꾸지 않습니다. 결제 완료 기차는 11/30 왕복 €95.60, 12/1 €35.80입니다. 1 HUF ≈ 4.05원. 항공 1,440,000원·숙소 450,000원은 이 현지 장부에 없습니다."
        }
      ]
    },
    {
      date: "2026-11-28",
      title: "도착 · 마켓 · 쇼핑 · 등갈비",
      city: "비엔나",
      blurb: "토요일. 공항 도착 뒤 나슈마르크트와 데멜, 도심 쇼핑, 소시지, 체크인, 쇤브룬 크리스마스 마켓, Ribs of Vienna, 시청사 마켓, 베르무다 삼각지대 순입니다. 벨베데레 정원은 오늘 걷지 않습니다. 궁전 입장은 내일 14:00입니다. Ribs는 18:15 제안이고 예약하지 않았습니다. 23:15 이후 복귀 시각은 고정하지 않습니다. 시각은 빈 현지 시각입니다. 기존 식사 견적은 1 EUR ≈ 1,484원입니다.",
      items: [
        {
          time: "06:00–08:00",
          placeId: "vie",
          text: "도착 · 입국 → 기차로 Wien Hbf → 숙소 짐",
          note: "기존 항공 도착을 유지합니다. 06:00 비엔나 공항. ÖBB Railjet 또는 REX7으로 Wien Hbf까지 약 15분, 공항 출발 06:33부터 30분 간격. 7일권을 쓰면 공항 구간 외곽권 1인 €2.30입니다. 2026.9–2027.10 공사로 S7은 St. Marx까지만 갑니다. 숙소 체크인은 15:00라 짐만 맡깁니다. 개인 예약 번호는 적지 않습니다."
        },
        {
          time: "08:00–09:00",
          placeId: "wien-hbf",
          text: "Hbf 아침 → 카를스플라츠로 이동",
          note: "아침 장소와 메뉴, 가격은 견적이 없습니다. 0원으로 두지 않습니다. 이후 U1로 Karlsplatz."
        },
        {
          time: "09:00–10:15",
          placeId: "naschmarkt",
          text: "나슈마르크트 · 토요일 벼룩시장",
          note: "정규 오전 동선입니다. 벼룩시장은 토요일 06:30–15:00, Kettenbrückengasse 쪽. 벨베데레 정원은 오늘 일정에 없습니다."
        },
        {
          time: "10:15–11:00",
          placeId: "staatsoper",
          text: "오페라 외관 · 케른트너 거리 → 데멜",
          note: "걸어서 이동하는 창입니다. 오페라 내부 투어는 없습니다. 데멜은 다음 줄."
        },
        {
          time: "11:00–12:00",
          placeId: "demel",
          text: "데멜 카이저슈마렌 · 멜랑주",
          note: "줄 서는 시간을 포함합니다. 늦으면 다음 쇼핑을 줄입니다. 매일 10:00–19:00, 예약 불가. 주문(2명): 카이저슈마렌 1개 나눠 먹기 + 멜랑주 2잔, 약 €26 (약 39,000원, 기존 견적). 카이저슈마렌은 2026년 방문 후기 €12.90, 멜랑주는 잔당 약 €6.5 추정(미확인). 자허토르테는 내일 카페 자허입니다."
        },
        {
          time: "12:00–13:00",
          placeId: "kaerntner-strasse",
          text: "쇼핑 · 콜마르크트 → 그라벤 → 케른트너 거리",
          note: "예전 16:45–17:35 쇼핑을 이 창으로 옮겼습니다. 실제 지출은 모릅니다. 토요일 상점은 18:00쯤 닫고 일요일은 쉽니다. STEFFL은 토 10:00–18:00(공식). 택스 리펀드는 한 영수증 €75.01 이상, 여권 지참, 12/5 부다페스트 공항 세관."
        },
        {
          time: "13:00–13:30",
          placeId: "wien-hbf",
          text: "Hbf 쪽으로 이동",
          note: "소요 시간 추정입니다."
        },
        {
          time: "13:30–14:15",
          placeId: "wuerstelstand",
          text: "점심 · 쥐트티롤러 광장 소시지",
          note: "예: 케제크라이너. 굴라시는 먹지 않습니다. Hbf 앞 가판, 매일 09:00–04:00. 주문(2명): Art des Hauses €5.60 + 핫도그 €5.50 = €11.10 (약 16,500원, 기존 공식 메뉴 견적). 음료는 별도. 예약 없음. 비엔나 소시지는 여기 한 번입니다."
        },
        {
          time: "14:15–14:50",
          placeId: "adina-vie",
          text: "장보기 → 숙소",
          note: "마트 지출은 모릅니다. 0원으로 두지 않습니다. 일요일에는 대부분 문을 닫습니다."
        },
        {
          time: "15:00–15:20",
          placeId: "adina-vie",
          text: "체크인 · 짐",
          note: "체크인 15:00 · 체크아웃 12/1 11:00. 쉬는 블록이 아닙니다. 이른 체크인은 전날 숙박을 추가해야 확실합니다."
        },
        {
          time: "15:20–16:00",
          placeId: "schonbrunn-market",
          text: "쇤브룬으로 이동",
          note: "U4 Schönbrunn 추정. 궁전 내부와 글로리에테는 들어가지 않습니다."
        },
        {
          time: "16:00–17:15",
          placeId: "schonbrunn-market",
          text: "쇤브룬 크리스마스 마켓",
          note: "마켓만 봅니다. 음식·기념품 가격은 견적이 없습니다. 0원으로 두지 않습니다. 11/28 식사 견적 177,300원에는 이 마켓이 들어 있지 않습니다."
        },
        {
          time: "17:15–18:00",
          placeId: "ribs-of-vienna",
          text: "Ribs of Vienna로 이동",
          note: "소요 시간 추정입니다. Weihburggasse 22."
        },
        {
          time: "18:15–19:30",
          placeId: "ribs-of-vienna",
          text: "저녁 · Ribs of Vienna 등갈비 (제안 · 미예약)",
          note: "예전 17:45 제안을 18:15–19:30으로 바꿨습니다. 예약하지 않았고, 잡아 둔 테이블도 없습니다. 토·일 12:00–24:00, 주방 22:30까지(ribsofvienna.at). 주문(2명): Spareribs for 2 people €41 + 생맥주 0.5 l 2잔 각 €5.50 = €52 (약 77,200원). 공식 메뉴 2025년 5월판이라 올랐을 수 있습니다(미확인). 팁은 별도. 나중에 예약하면 공식 Table Booking 또는 +43 1 513 85 19. 10분이 지나면 자동 취소된다는 안내가 있습니다. 이 앱은 예약하지 않습니다."
        },
        {
          time: "19:30–20:00",
          placeId: "rathaus",
          text: "시청사로 이동",
          note: "걸어서 약 20–25분 추정, 또는 트램 D."
        },
        {
          time: "20:00–21:00",
          placeId: "rathaus",
          text: "시청사 크리스마스 마켓",
          note: "2026.11.13–12.26, 매일 10:00–22:00. 뱅쇼 2잔 약 €10–14 (1.5–2.1만 원 추정, 기존 범위). 머그 보증금은 컵을 돌려주면 받습니다."
        },
        {
          time: "21:00–21:30",
          placeId: "krah-krah",
          text: "베르무다 삼각지대로 이동",
          note: "시청사에서 걸어서 약 20분 추정, 또는 트램 1."
        },
        {
          time: "21:30–22:15",
          placeId: "krah-krah",
          text: "Krah Krah 생맥주",
          note: "Rabensteig. 토 11:00–01:00. 0.3 l 2잔 각 €4.60 = €9.20 (약 13,700원, 기존 공식 메뉴). 카드는 €10부터일 수 있으니 현금을 조금 챙기세요."
        },
        {
          time: "22:15–23:15",
          placeId: "casablanca",
          text: "Casablanca",
          note: "Krah Krah 옆. 매일 밤 21:00부터 라이브라는 공식 안내가 있지만, 11/28 실제 출연진은 확인하지 않았습니다. 영업 수–토 17:00–04:00. 맥주 0.3 l 2잔 €8.80 (약 13,100원, 기존 메뉴). 현금만. 23:15 이후 숙소 복귀 시각은 고정하지 않습니다. 주말 밤 U-Bahn은 밤새 다닙니다."
        }
      ],
      notes: [
        {
          title: "비엔나 교통권",
          rows: [
            ["추천", "7일권 1인 €25.20 · WienMobil 앱. 기명식이라 여권 등 신분증을 지닙니다."],
            ["공항 구간", "7일권은 시내만 됩니다. 공항 → Wien Hbf는 외곽 구간권 1인 €2.30."],
            ["왜 7일권", "11/28–12/1에 U1, 트램 D · 1, 공항 열차를 여러 번 탑니다. 48·72시간권은 2026.1.1부로 없습니다."],
            ["잘츠부르크", "11/30 ÖBB 기차표는 따로입니다."]
          ],
          foot: "Wiener Linien 2026년 요금. 시작 시각은 앱에서 확인하세요."
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
          title: "비엔나 식사 · 아직 예약이 없는 것",
          rows: [
            ["Ribs of Vienna", "11/28 18:15–19:30 제안 · 미예약. 잡아 둔 테이블 없음"],
            ["11/29 저녁", "17:50–18:45 공연장 근처 · 식당·메뉴 미정. 플라후타가 아니고 예약도 없음"],
            ["카페 자허", "11/29 10:00–10:50 · 착석 예약은 확인되지 않음"],
            ["Figlmüller", "12/1 12:00–13:15 · 미예약. 예약된 것처럼 적지 않음"],
            ["Stiegl-Brauwelt", "11/30 13:00–15:00 영어 생산 투어 · 1인 €22.90 · 예매 필요 · 아직 예매하지 않음"],
            ["골든홀 입석", "11/29 19:30 · 2명 €12 · 예약·결제 결과 미확인"],
            ["대관람차", "11/29 16:15–17:15 · €29 · 미예매"],
            ["예약 없음", "소시지 · 데멜(예약 불가) · 마켓 · Krah Krah · Casablanca(현금만)"]
          ],
          foot: "이 앱은 예약·결제·취소를 하지 않습니다. 예약 번호는 적지 않습니다. 디저트 제한은 없습니다."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["소시지", "€11.10 (약 16,500원, 기존 견적)"],
            ["데멜", "약 €26 (약 39,000원, 기존 견적)"],
            ["Ribs of Vienna", "€52 (약 77,200원, 기존 견적) · 미예약"],
            ["시청사 뱅쇼", "약 €10–14 (1.5–2.1만 원, 기존 추정)"],
            ["Krah Krah", "€9.20 (약 13,700원)"],
            ["Casablanca", "€8.80 (약 13,100원) · 당일 출연 미확인"],
            ["여섯 항목", "예전과 같이 약 177,300원. 메뉴를 바꾸지 않은 견적입니다."],
            ["아침 · 마트 · 쇤브룬 마켓 · 쇼핑", "가격 미정. 177,300원에 포함하지 않았고 0원도 아닙니다."]
          ],
          foot: "기존 견적 환율 1 EUR ≈ 1,484원."
        }
      ]
    },
    {
      date: "2026-11-29",
      title: "구시가지 · 벨베데레 · 골든홀 입석",
      city: "비엔나",
      blurb: "일요일. 구시가지를 걷고 카페 자허를 들른 뒤 12:00 슈테판 광장에서 가볍게 점심, 13:15에 성당을 나와 14:00 벨베데레에 입장합니다. 15:30 프라터, 17:50 공연장 근처 저녁(식당 미정), 19:30 무직페라인 골든홀 입석 2명. 숙소에서 쉬는 시간은 없고, 베르무다 삼각지대도 오늘은 가지 않습니다. 상점은 쉽니다. 시각은 빈 현지 시각입니다. 오전 11:00–12:00은 승인된 한 창이고, 해설 투어가 그 창 안의 장소를 순서대로 읽습니다.",
      guide: true,
      items: [
        {
          time: "09:15–09:50",
          placeId: "opernpassage",
          text: "카를스플라츠에서 오페라 외관까지",
          note: "숙소 Hauptbahnhof에서 U1(Leopoldau) Karlsplatz, Oper 출구. 내부 투어는 없습니다."
        },
        {
          time: "09:15–09:50",
          placeId: "staatsoper",
          text: "국립 오페라 극장 외관",
          note: "같은 09:15–09:50 창입니다. 정면과 로지아만 보고 10:00 카페 자허로 갑니다."
        },
        {
          time: "10:00–10:50",
          placeId: "cafe-sacher",
          text: "카페 자허 · 자허토르테",
          note: "카페 07:00–23:00. 착석 예약은 확인되지 않았습니다. 예약된 것처럼 적지 않습니다. 주문(2명): Sacher Sweet Treat 1개 €24.50 + 커피 1잔 €7.50 = €32 (약 47,500원, 기존 공식 메뉴 견적). 한 조각만 나눠 먹습니다."
        },
        {
          time: "11:00–12:00",
          placeId: "albertina",
          text: "알베르티나 테라스 · 외관 산책 시작",
          note: "11:00–12:00은 알베르티나 테라스, 호프부르크, 미하엘러 광장, 그라벤 외관입니다. 미술관 입장과 일요일 쇼핑은 없습니다. 테라스는 무료."
        },
        {
          time: "11:00–12:00",
          placeId: "hofburg",
          text: "호프부르크 외관",
          note: "같은 11:00–12:00 창. 요제프 광장, 스위스 궁정, In der Burg 바깥만. 시시 박물관·황제 아파트는 들어가지 않습니다."
        },
        {
          time: "11:00–12:00",
          placeId: "hofreitschule",
          text: "스페인 승마학교 입구",
          note: "호프부르크에서 미하엘러 광장으로 지나가는 입구입니다. 공연·훈련 관람은 없습니다."
        },
        {
          time: "11:00–12:00",
          placeId: "michaelerplatz",
          text: "미하엘러 광장",
          note: "로마 유적과 로스하우스는 밖에서 봅니다."
        },
        {
          time: "11:00–12:00",
          placeId: "demel",
          text: "콜마르크트 · 데멜 쇼윈도",
          note: "어제 들른 데멜 앞을 지나 그라벤으로 갑니다. 다시 앉지 않습니다. 일요일 상점은 쉽니다."
        },
        {
          time: "11:00–12:00",
          placeId: "graben",
          text: "그라벤 · 페스트 기둥",
          note: "같은 외관 창의 마지막 거리 쪽입니다."
        },
        {
          time: "11:00–12:00",
          placeId: "peterskirche",
          text: "성 페터 성당 외관",
          note: "그라벤 옆. 미사 중이면 들어가지 않고 지나갑니다. 12:00에 광장 마켓으로."
        },
        {
          time: "12:00–12:45",
          placeId: "stephansplatz-market",
          text: "슈테판 광장 마켓 · 가벼운 점심",
          note: "식당과 메뉴는 정하지 않았습니다. 굴라시·랑고시가 아닙니다. 가격 미정이며 0원으로 두지 않습니다. 14:00 입장을 지키려고 점심을 앞으로 당겼습니다. 13:00에 성당으로 갑니다."
        },
        {
          time: "13:00–13:15",
          placeId: "stephansdom",
          text: "슈테판 대성당 · 짧게",
          note: "13:15에 나옵니다. 일요일 관광 관람은 13:00–16:30. 줄이 길면 안으로 들어가지 않고 외관만 봅니다. 입구 쪽은 무료, 본당 안쪽은 유료일 수 있어 현장 확인입니다. 그 요금은 미정이고 0원이 아닙니다."
        },
        {
          time: "13:15–13:50",
          placeId: "tram-oper",
          text: "벨베데레로 이동 · 입장 준비",
          note: "소시지 가판에는 들르지 않습니다. 트램 D(Absberggasse) 4정거장, 시간표상 약 9분 뒤 입구까지 걸음. 14:00 결제 완료 입장을 위한 버퍼입니다."
        },
        {
          time: "14:00–15:30",
          placeId: "belvedere",
          text: "벨베데레 상궁 · 핵심 작품",
          docId: "belvedere-1129",
          booked: true,
          note: "✅ 입장 예약과 결제가 끝난 일정입니다. 11/29 14:00 입장, 2명, €46, 실제 결제 69,692원. 관람은 14:00–15:30이고 15:30에 나와 프라터로 갑니다. 티켓은 문서함에서 확인합니다. 매일 09:00–18:00. 시간 지정 티켓이 있으면 바로 입구로 갑니다. 현장 오디오 가이드 €5(약 7,400원, 기존 환율)는 선택입니다. 아래 작품 안내의 핵심만 봅니다."
        },
        {
          time: "15:30–16:15",
          placeId: "prater-riesenrad",
          text: "프라터로 이동",
          note: "15:30–16:15는 추정입니다. 숙소로 돌아가 쉬지 않습니다."
        },
        {
          time: "16:15–17:15",
          placeId: "prater-riesenrad",
          text: "대관람차 · 프라터 겨울 마켓 (미예매)",
          note: "미예매. 성인 €14.50 × 2 = €29, 계획 환율 43,500원(1유로=1,500원). 현장 가격과 대기 줄은 보장하지 않습니다. 17:15에 나옵니다. 늦으면 마켓을 줄이거나 관람차를 건너뜁니다. 출처 https://wienerriesenrad.com/en/opening-times/"
        },
        {
          time: "17:15–17:50",
          placeId: "concert-dinner",
          text: "카를스플라츠 · 공연장 쪽으로 이동",
          note: "17:15–17:50은 추정입니다."
        },
        {
          time: "17:50–18:45",
          placeId: "concert-dinner",
          text: "저녁 · 공연장 근처 (식당·메뉴 미정)",
          note: "식당과 메뉴를 정하지 않았습니다. 플라후타가 아닙니다. 플라후타 테이블을 잡아 둔 적이 없고, 취소할 예약도 없습니다. 55분이라 빨리 나오는 곳이어야 합니다. 굴라시는 먹지 않습니다. 가격은 미정이며 0원으로 두지 않습니다."
        },
        {
          time: "18:45–19:00",
          placeId: "musikverein",
          text: "무직페라인까지 걷기",
          note: "Musikvereinsplatz 1. 18:45–19:00은 추정입니다."
        },
        {
          time: "19:00–19:30",
          placeId: "musikverein",
          text: "골든홀 도착 · 입석 입장 준비",
          note: "좌석이 아닙니다. 휴대품을 맡기고 입석 줄에 섭니다. 표가 나왔다고 적지 않습니다."
        },
        {
          time: "19:30–21:45",
          placeId: "musikverein",
          text: "골든홀 입석 2명 · 브루크너 오케스트라 린츠",
          note: "19:30 시작은 고정입니다. Großer Saal. Bruckner Orchester Linz, 지휘 Alondra de la Parra, 첼로 Raphaela Gromes. 프로그램: Gabriela Ortiz La Reina Roja(오스트리아 초연), Tchaikovsky Variations on a Rococo Theme op.33, Shostakovich Symphony No.5 op.47. 브루크너 작품은 아닙니다. 선택: 성인 일반 입석 2매, 1매 €6, 합계 €12, 배송비 €0, 청구 €12, print at home. 예약·결제 결과는 미확인입니다. 구매·예약 완료로 적지 않고, 실패로 단정하지도 않습니다. 표가 나왔다는 근거는 없고 좌석 배정도 없습니다. 계획 원화 18,000원(1유로=1,500원)이며 카드 실청구 환율이 아닙니다. €20·39·49·59·69·79·89는 게시된 다른 등급입니다. 공연장 월간 안내는 21:30 종료, 시 안내는 21:45 종료라 이 줄은 21:45까지입니다. 21:45는 확정된 종료가 아닙니다. 출처: https://www.bruckner-orchester.at/kalender/der-bol-zyklus-in-wien/zwei-alondra-2 · https://musikverein.at/wp-content/uploads/2026/09/8_MVZ_November-2026_Kalendarium.pdf · https://spielplan.musikverein.at/spielplan?month=2026-11 · https://www.wien.gv.at/veranstaltungen/bruckner-orchester-linz-und-alondra-de-la-parra"
        },
        {
          time: "21:45–22:30",
          placeId: "adina-vie",
          text: "공연 뒤 복귀 여유",
          note: "계획용 버퍼입니다. 실제 종료와 이동에 따라 달라집니다. 쉬는 블록이 아닙니다. 내일 기차는 08:28이고, 숙소에서는 07:40–08:15에 나섭니다."
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
          title: "결과가 아직 없는 것",
          rows: [
            ["골든홀 입석", "19:30 · 성인 일반 입석 2명 · €12 · 배송 €0 · 예약·결제 결과 미확인 · 좌석 없음"],
            ["대관람차", "16:15–17:15 · €29 · 미예매 · 17:15에 출발"],
            ["카페 자허", "10:00–10:50 · 착석 예약 확인 안 됨"],
            ["저녁", "17:50–18:45 · 식당·메뉴 미정 · 플라후타 아님 · 예약 없음"],
            ["11/30 Stiegl", "13:00 영어 생산 투어 · 예매 필요 · 아직 예매하지 않음. 기차는 예매 완료"]
          ],
          foot: "예매와 결제는 직접 하세요. 이 앱에는 예약 번호, 좌석, 카드 정보를 적지 않습니다."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["카페 자허", "€32 (약 47,500원, 기존 견적)"],
            ["벨베데레 상궁", "€46 · 실제 69,692원 · 결제 완료. 예전 약 68,264원 견적을 이 금액으로 바꿈"],
            ["대관람차", "€29 · 계획 43,500원 · 미예매"],
            ["골든홀 입석", "€12 · 계획 18,000원 · 배송 €0 · 예약·결제 미확인"],
            ["광장 점심 · 저녁 · 성당 유료 구간", "가격 미정. 0원으로 계산하지 않음"],
            ["오디오 가이드", "선택 €5. 오늘 합계에 넣지 않음"]
          ],
          foot: "새 유로 계획액만 1 EUR = 1,500원. 자허와 오디오 가이드의 기존 원화는 1 EUR ≈ 1,484원. 벨베데레는 재환산하지 않습니다. 입석과 대관람차 61,500원은 이 날의 새 계획 한 쌍이지, 여행 총액에 자동으로 더하는 값이 아닙니다."
        },
        {
          title: "추천 영화",
          rows: [["보고 가면 좋은 영화", "아마데우스 · 불멸의 연인 · 비포 선라이즈"]]
        }
      ]
    },
    {
      date: "2026-11-30",
      title: "잘츠부르크 · 슈티글 생산 투어",
      city: "잘츠부르크",
      blurb: "월요일. 예매된 기차 08:28–10:53, 21:07–23:32는 그대로입니다. 미라벨과 다리를 짧게 보고 11:45 슈테른브로이에서 빨리 점심, 13:00 슈티글 영어 생산 투어(예매 필요, 아직 예매하지 않음), 15:45 요새, 17:00 마켓, 17:40 모차르트 생가 외관, 18:40까지 묀히스베르크, 19:00 아우구스티너. 시각은 현지 시각입니다. 기차 시간은 ÖBB Scotty 2026.11.30 기준입니다.",
      items: [
        {
          time: "07:40–08:15",
          placeId: "adina-vie",
          text: "숙소 → Wien Hbf · 아침·간식·승강장",
          note: "08:28 기차를 지킵니다. 물, 간식, 보조배터리, 아우구스티너용 현금(유로, 2명 €40 안팎). 아우구스티너는 카드를 받지 않습니다. 아침 가격은 견적이 없습니다."
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
          text: "도착 · 버스 준비 · 미라벨로 이동",
          note: "역 남쪽 출구. 역 안 Trafik이나 고객센터에서 시내버스 1회권 5장 묶음 €12.50(1장 €2.50)을 사 두면 슈티글 왕복에 씁니다. 버스 안에서는 표를 팔지 않습니다(Salzburg Verkehr 2026). 늦으면 정원을 줄여 투어를 지킵니다."
        },
        {
          time: "11:15–11:45",
          placeId: "mirabell",
          text: "미라벨 · Marko-Feingold-Steg · 강변에서 점심 쪽으로",
          note: "예전 11:35 시작을 이 창으로 고쳤습니다. 정원은 무료. 페가수스 분수와 요새를 보고, 옛 Makartsteg인 Marko-Feingold-Steg를 건너 구시가지로 갑니다. 늦으면 정원을 줄입니다."
        },
        {
          time: "11:45–12:20",
          placeId: "getreidegasse",
          text: "가벼운 점심 · Sternbräu 케스노켄",
          note: "Griesgasse 23. 케스노켄과 굴라시가 아닌 수프 또는 커피. 여유 있는 점심이 아니라 바로 주문합니다. 가격은 미확인(예전 메뉴 케스노켄 €9.90 · 수프 €4.50, 지금 약 €20–25 · 3–3.7만 원 추정). 맥주는 양조장에서 마십니다. 모차르트 생가 내부는 보지 않고, 외관은 저녁 17:40입니다."
        },
        {
          time: "12:20–12:50",
          placeId: "stiegl-brauwelt",
          text: "슈티글로 이동 · 입장 확인",
          note: "13:00보다 최소 10분 전, 12:50까지 안뜰 Braushop 매표소. 버스 1·10번 Bräuhausstraße 하차 후 도보 약 5–10분. 구시가지 정류장과 소요 시간은 Salzburg Verkehr 앱에서 확인(미확인). 1회권 1명 1장."
        },
        {
          time: "13:00–15:00",
          placeId: "stiegl-brauwelt",
          text: "슈티글 영어 가이드 생산 투어 (예매 필요 · 미예매)",
          note: "약 2시간, 시음 3잔. 성인 €22.90 × 2 = €45.80, 계획 환율 68,700원(1유로=1,500원). 예전 약 68,000원 줄을 이 금액으로 바꿉니다. 다른 박물관 투어를 추가하는 것이 아닙니다. 아직 예매하지 않았습니다. 월–목에는 생산 라인이 대체로 돌아가고, 오늘 특정 라인은 확인하지 않았습니다. 금–일은 멈춘 채 견학입니다. 예매는 stiegl-shop.at. 계단이 있어 휠체어는 어렵습니다. 박물관 10:00–18:00. 출처 https://www.brauwelt.at/museum/brauereifuehrung/"
        },
        {
          time: "15:00–15:45",
          placeId: "salzburg-dom",
          text: "구시가지 · 푸니쿨라로 이동",
          note: "추정. 버스 1·10번으로 돌아온 뒤 대성당·레지덴츠 광장을 지나 FestungsBahn(Festungsgasse 4). 투어가 늦으면 이 이동을 줄입니다."
        },
        {
          time: "15:45–16:50",
          placeId: "hohensalzburg",
          text: "호엔잘츠부르크 성 · 푸니쿨라와 핵심 전시",
          note: "Basic(산악열차 왕복 포함) 성인 €15.50, 2명 €31 (약 46,000원, 기존 견적). 겨울 운영은 17:00에 끝난다는 공식 안내가 있고, 마지막 표 시각은 이번 일정에서 다시 확인하지 않았습니다. 투어가 늦으면 요새를 줄입니다. 출처 https://www.festung-hohensalzburg.at/en/your-visit/opening-hours"
        },
        {
          time: "17:00–17:40",
          placeId: "salzburg",
          text: "대성당 · 레지덴츠 마켓 · 간식",
          note: "2026.11.19–2027.1.1, 월–목 10:00–20:30, 무료(공식). 따뜻한 음료와 간식만. 가격 미정. 저녁은 아우구스티너입니다."
        },
        {
          time: "17:40–18:10",
          placeId: "mozart-geburtshaus",
          text: "게트라이데 거리 · 모차르트 생가 외관과 불빛",
          note: "Getreidegasse 9 외관만. 내부(성인 €18, 2명 €36)는 들어가지 않습니다. 조명이 켜진 간판 거리를 걷습니다."
        },
        {
          time: "18:10–18:40",
          placeId: "moenchsberg-aufzug",
          text: "묀히스베르크 엘리베이터 · 야경",
          note: "월요일은 19:00에 끝납니다. 18:40까지 내려옵니다. 왕복 성인 €4.80, 2명 €9.60 (약 14,200원, 기존 견적). 박물관은 들어가지 않습니다. 출처 https://www.5schaetze.at/de/moenchsbergaufzug/oeffnungszeiten.html"
        },
        {
          time: "18:40–19:00",
          placeId: "augustiner-muelln",
          text: "아우구스티너로 이동",
          note: "엘리베이터 아래에서 Gstättengasse를 따라 약 15분 추정."
        },
        {
          time: "19:00–20:05",
          placeId: "augustiner-muelln",
          text: "아우구스티너 · 통닭 · 무 · 프레첼 · 빵 · 맥주",
          note: "현금만. 음식 재고와 줄은 확인하지 않았습니다. 월–금 15:00–23:00(공식). 셀프: 잔을 헹구고 계산한 뒤 슈만커 골목에서 통닭, 무, 프레첼·맥주빵을 골라 옵니다. 2명 약 €25–35 (약 3.7–5.2만 원, 기존 추정, 가격 미확인). 굴라시는 없습니다. 20:05에 일어납니다. 출처 https://www.augustinerbier.at/oeffnungszeiten.html"
        },
        {
          time: "20:05–20:40",
          placeId: "salzburg-hbf",
          text: "역으로 이동 · 간식",
          note: "오는 기차를 지킵니다. 걸어서 약 1.8 km, 약 25분. 다리가 아프면 Mülln-Altstadt S-Bahn을 앱에서 확인하세요. 간식 가격은 미정입니다."
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
            ["현지 이동", "구시가지는 걸어서. 슈티글만 버스 1·10번(1회권 5장 €12.50). 요새 산악열차는 요새 티켓에 포함. 묀히스베르크 엘리베이터는 따로, 월요일 19:00까지, 18:40에 하차."]
          ],
          foot: "시간·요금은 ÖBB 예약 확인서 기준. 좌석 번호는 문서함에서 확인해요."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["기차 왕복 (결제 완료)", "€95.60 (약 141,900원) · 좌석 예약 €6 포함"],
            ["슈티글 영어 생산 투어", "€45.80 · 계획 68,700원 · 예전 약 68,000원과 교체 · 예매 필요 · 미예매"],
            ["호엔잘츠부르크 Basic", "€31 (약 46,000원, 기존 견적)"],
            ["시내버스", "1회권 5장 묶음 €12.50 (약 18,600원)"],
            ["묀히스베르크 엘리베이터", "왕복 €9.60 (약 14,200원, 기존 견적)"],
            ["점심 Sternbräu", "약 €20–25 (약 3–3.7만 원, 추정)"],
            ["아우구스티너 저녁", "약 €25–35 (약 3.7–5.2만 원, 추정 · 현금만)"],
            ["마켓·간식", "가격 미정. 0원으로 두지 않음"],
            ["유로로 정해진 항목", "€194.50. 슈티글만 계획 환율이고 나머지는 기존 1,484원 견적. 여행 전체 합계로 다시 묶지 않음"]
          ],
          foot: "모차르트 생가 내부(2명 €36)는 외관만 봐서 빼 둡니다. 새 계획 환율은 슈티글에만 씁니다."
        }
      ]
    },
    {
      date: "2026-12-01",
      title: "쇼핑 · 부다페스트",
      city: "기차",
      blurb: "화요일. 체크아웃 뒤 아침(장소 미정), 10:00–11:30 도심 쇼핑, 12:00 Figlmüller(미예약), 13:15 선물 또는 디저트(미정), 15:40 빈→부다페스트 기차는 예매된 그대로. 저녁은 성 이슈트반 대성당 마켓의 뱅쇼·라이트 쇼와 따뜻한 저녁이고 랑고시와 굴라시는 없습니다. 디비노는 선택입니다. 시각은 현지 시각입니다.",
      items: [
        {
          time: "08:30–09:00",
          placeId: "adina-vie",
          text: "체크아웃 · 짐 맡기기",
          note: "체크아웃 11:00. 리셉션에 짐을 맡기고 나갑니다. 쉬는 시간이 아닙니다."
        },
        {
          time: "09:00–09:40",
          placeId: "wien-hbf",
          text: "아침 · 커피 (장소 미정)",
          note: "가게를 정하지 않았습니다. 가격 견적을 만들지 않았고 0원으로 두지 않습니다."
        },
        {
          time: "09:40–10:00",
          placeId: "kaerntner-strasse",
          text: "구시가지로 이동",
          note: "U1 Stephansplatz 추정."
        },
        {
          time: "10:00–11:30",
          placeId: "kaerntner-strasse",
          text: "쇼핑 · 케른트너 · 그라벤 · 콜마르크트",
          note: "예전 11:50까지이던 쇼핑을 11:30에 끝냅니다. 화요일이라 상점이 열립니다. STEFFL은 월–금 10:00–20:00(공식). 오스트리아에서의 마지막 쇼핑입니다. 택스 리펀드는 한 영수증 €75.01 이상, 여권, 12/5 공항 세관. 실제 지출은 쇼핑 예비비 쪽이고 금액을 확정하지 않습니다."
        },
        {
          time: "11:30–12:00",
          placeId: "figlmueller",
          text: "Figlmüller로 이동",
          note: "오후 기차를 지키려고 11:30에 쇼핑을 끝냅니다. Stephansplatz에서 걸어서 약 3분."
        },
        {
          time: "12:00–13:15",
          placeId: "figlmueller",
          text: "점심 · Figlmüller 슈니첼 (미예약)",
          note: "Bäckerstraße. 예약을 만들어 둔 것이 아닙니다. 미예약으로 둡니다. 나눠 먹기는 선택입니다. 주문 예: 돼지 슈니첼 1장 €21.90 + 감자 샐러드(약 €7 추정) + 링곤베리 €2.90 + 음료 2잔(약 €10 추정) ≈ €42 (약 62,000원, 기존 견적). 영업시간은 3자 자료 11:30–23:30(미확인). 공식 사이트에서 직접 예약할 수는 있지만 이 앱은 예약하지 않습니다."
        },
        {
          time: "13:15–14:00",
          placeId: "kaerntner-strasse",
          text: "선물 찾기 또는 디저트 · 커피",
          note: "유동 시간. 장소와 가격은 미정입니다. 0원으로 두지 않습니다. 데멜이나 특정 카페로 정해 두지 않았습니다."
        },
        {
          time: "14:00–14:40",
          placeId: "adina-vie",
          text: "숙소에서 짐 찾기",
          note: "휴식 블록이 아닙니다. U1으로 Hauptbahnhof."
        },
        {
          time: "14:40–15:15",
          placeId: "wien-hbf",
          text: "Wien Hbf · 승강장",
          note: "15:40 출발 전 버퍼."
        },
        {
          time: "15:40–18:29",
          placeId: "wien-hbf",
          leg: true,
          text: "Wien Hbf 15:40 → Budapest Keleti 18:29 (ÖBB RJX 65)",
          docId: "train-vie-bud",
          booked: true,
          note: "✅ 예매 완료(Sparschiene · 이 열차만, 변경·환불 불가). 2등석. 좌석 번호는 문서함에서 확인해요. 표는 문서함 PDF, 여권 지참."
        },
        {
          time: "18:29–19:15",
          placeId: "adina-bud",
          text: "Keleti 도착 → 숙소 체크인",
          note: "18:29 Budapest Keleti. 짐이 있으면 Bolt를 권합니다(요금은 앱에서 확인, 미확인). 체크인 15:00부터, 체크아웃 11:00. 대중교통이면 M2 또는 M4 뒤 M3 Lehel tér, 단일권 1인 500 HUF."
        },
        {
          time: "19:15–19:45",
          placeId: "basilica",
          text: "대성당 마켓으로 이동",
          note: "Lehel tér까지 도보 약 5분, M3 2정거장, Arany János utca에서 광장까지 도보 약 4분."
        },
        {
          time: "19:45–20:45",
          placeId: "basilica",
          text: "Advent Bazilika · 뱅쇼 · 라이트 쇼 · 따뜻한 저녁",
          note: "2026.11.13–2027.1.1, 월–목·일 11:00–22:00, 금·토 11:00–23:00. 17:30부터 파사드 라이트. 가게·메뉴·가격은 정하지 않았습니다. 랑고시와 굴라시는 먹지 않습니다. 랑고시는 12/4 중앙시장만, 굴라시는 12/2 Stand25만. 가격 미정이며 예전 랑고시 포함 추정으로 두지 않고 0원도 아닙니다. 컵 보증금이 있을 수 있습니다."
        },
        {
          time: "20:45–21:30",
          placeId: "lanchid",
          text: "다뉴브 · 체인 브리지 입구까지",
          note: "Zrínyi utca로 강변까지 약 12분. 다리는 12/2에 건너므로 오늘은 입구까지. 모자와 장갑."
        },
        {
          time: "21:40–22:20",
          placeId: "divino-bazilika",
          text: "(선택) DiVino Bazilika",
          note: "빼면 디저트나 마켓을 더 봐도 됩니다. 그 뒤 복귀 시각은 고정하지 않습니다. Szent István tér 3. 월–수·일 12:00–24:00(공식). 와인 2잔 약 4,000–5,000 HUF (약 1.6–2만 원, 가격 미확인 추정). 돌아올 때는 M3 Lehel tér. 내일 08:30 레헬 시장."
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
            ["표", "✅ 예매 완료 · ÖBB Sparschiene 2명: €14.90 × 2 + 좌석 예약 €6 = €35.80 (약 53,100원) · 변경 · 환불 불가"]
          ],
          foot: "시간·요금은 ÖBB 예약 확인서 기준. 좌석 번호는 문서함에서 확인해요."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["기차 (결제 완료)", "€35.80 (약 53,100원) · 좌석 예약 €6 포함"],
            ["Figlmüller 점심", "≈ €42 (약 62,000원, 기존 견적) · 미예약"],
            ["아침 · 유동 디저트 · 마켓 저녁", "가격 미정. 랑고시 없음. 0원으로 두지 않음"],
            ["(선택) DiVino 와인", "약 4,000–5,000 HUF (1.6–2만 원, 추정 · 가격 미확인)"],
            ["M3 단일권", "왕복이면 4장 2,000 HUF (약 8,100원). 선택 일정을 빼면 줄어듦"],
            ["Keleti → 숙소 Bolt", "앱에서 확인 (미확인)"],
            ["쇼핑", "금액 미정. 예전 합계에서 남은 돈으로 확정하지 않음"]
          ],
          foot: "기존 견적 환율 1 EUR ≈ 1,484원 · 1 HUF ≈ 4.05원. 랑고시를 뺀 뒤의 마켓 저녁에 새 견적을 만들지 않았습니다."
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
      title: "부다 성 · 다뉴브 야경 (트램 2 · 체인 브리지)",
      city: "부다페스트",
      blurb: "숙소 옆 레헬 시장에서 아침을 먹고, 부다 언덕을 북쪽(어부의 요새)에서 남쪽(왕궁)으로 천천히 걸은 뒤, 서쪽 기슭의 Stand25에서 점심을 먹습니다. 체인 브리지를 건너 페스트에서 크리스마스 마켓 → 해 질 녘 트램 2로 강변 야경 → 체인 브리지를 걸어서 왕복 → 마켓으로 돌아와 가벼운 저녁 → 크래프트 맥주 펍 Élesztő에서 흥 나는 밤. 유람선은 빼고 트램(90분권 1장)과 다리 산책으로 대신해 2명 약 74,200원을 아끼고, 바위 병원 가이드 투어(1인 €30)도 빼서 2명 €60 (약 89,000원)을 더 아낍니다. 점심을 든든히 먹으니 저녁은 노점으로 가볍게. 🎬 영상 추천 = Edmmer 헝가리 브이로그, 🍖 육식맨 추천 = 육식맨 부다페스트 영상에 나온 곳입니다.",
      items: [
        {
          time: "08:30",
          placeId: "lehel-market",
          text: "아침 · 레헬 시장 Csirke Csibész 🎬 영상 추천",
          note: "숙소에서 도보 약 5분(Lehel tér M3 바로 앞). 시장은 월–금 06:00–18:00. 2층 갤러리의 닭 요리 가게 Csirke Csibész는 월–금 6:30–18:00입니다. 영상에 나온 메뉴 이름은 확인하지 못했으니 진열대를 보고 고르세요. 점심(Stand25)이 든든하니 아침은 닭 요리 1인분과 곁들이 1개를 나눠 먹기(약 2,500–3,500 HUF · 1–1.4만 원, 추정). 12/3은 온천을 09:00 전에 들어가야 해서 시장 아침을 오늘로 옮겼습니다. (영상의 Café ZAJ는 이 시장이 아니라 Jókai u. 11에 있어 일정에서 뺐습니다.)"
        },
        {
          time: "09:15",
          placeId: "adina-bud",
          text: "Lehel tér에서 출발",
          note: "시장 바로 앞 Lehel tér에서 M3 → Deák Ferenc tér → M2 Széll Kálmán tér(약 15분)에서 내린 뒤 Bécsi kapu를 지나 어부의 요새까지 도보 약 15–20분(오르막). 오르막이 싫으면 Széll Kálmán tér에서 버스 16A·116으로 Szentháromság tér까지(단일권 1장 더). 표는 BudapestGO 앱에서 사서 탈 때마다 개시합니다(72시간권을 샀다면 여기서 개시하면 12/5 09:15까지 유효). Bolt면 Szentháromság tér까지 약 15분."
        },
        {
          time: "10:00",
          placeId: "bastion",
          text: "어부의 요새 · 마차시 성당 앞",
          note: "아래 테라스와 아케이드는 24시간 무료입니다. 위층 탑 전망대는 10/1–12/23 09:00–19:00 유료(성인 1,700 HUF, 카드만)이고 그 밖의 시간에는 무료입니다(운영사 budavarikapu.hu 2026 공지). 10시쯤 도착하면 유료 시간이니, 아래 테라스에서도 국회의사당과 다뉴브가 잘 보여 위층은 선택입니다. 마차시 성당은 앞 광장과 외관만 봅니다. 약 1시간."
        },
        {
          time: "11:15",
          placeId: "castle",
          text: "성 언덕 골목 · 부다 왕궁 천천히 산책",
          note: "어부의 요새에서 성 언덕 골목길(Tárnok utca · Úri utca)을 따라 남쪽으로 천천히 걸어 왕궁까지(바로 가면 약 15분). 왕궁 안뜰과 테라스는 자유롭게 걸을 수 있고, 테라스에서 다뉴브와 페스트 쪽 전망을 봅니다. 점심 예약이 13:00이라 시간이 넉넉하니 벤치에서 쉬거나 사진을 찍으며 머무르세요. 12:40쯤 서쪽 기슭(Attila út)으로 내려가면 Stand25까지 도보 약 10–15분."
        },
        {
          time: "13:00",
          placeId: "stand25",
          text: "점심 · Stand25 Bisztró 🎬 영상 추천",
          docId: "restaurant-stand25",
          booked: true,
          note: "✅ 예약 완료(SevenRooms) · 12/2 수 13:00–15:00 · 2명 · 보증금 없음. 예약번호는 문서함에서 확인해요. 변경 · 취소는 24시간 전까지 알려 주세요. 테이블은 2시간 이용. 영상에서 먹은 것은 구야시 수프, 메기 파프리카시(harcsapaprikás), 사슴 스테이크, 쇼믈로이 갈루슈카(Somlói galuska), 토카이 와인과 팔린카입니다. 메뉴가 계절마다 바뀌니 일부는 없을 수 있지만, 구야시와 쇼믈로이는 대표 메뉴입니다. 미쉐린 빕구르망. 주문(2명): 구야시 5,900 + 메기 파프리카시(juhtúrós sztrapacska 곁들임) 9,900 + 쇼믈로이 4,900 = 20,700 HUF (약 84,000원) + 서비스 차지(비율 미확인, 10–15%면 약 9.2–9.6만 원). 구야시는 이번 여행에서 여기서만 먹습니다. (2026 메뉴 PDF 기준) 점심은 월–토 12:00–16:00(마지막 입장 14:30), 일요일 휴무. 서비스 차지가 붙습니다. 문의 · 변경: 전화(+36 30 961 3262) 또는 SevenRooms 확인 메일의 '예약 수정'."
        },
        {
          time: "15:15",
          placeId: "vorosmarty",
          text: "체인 브리지 건너 · 뵈뢰슈마르티 광장 크리스마스 마켓",
          note: "Stand25에서 체인 브리지를 건너 도보 약 20분. 2026.11.13–12.31 운영, 일–목 11:00–21:00, 금–토 11:00–22:00(공식 사이트). 지금은 구경만 하고, 트램과 다리 산책을 마친 뒤 다시 와서 저녁을 먹습니다. 사람이 많으니 소매치기 주의."
        },
        {
          time: "16:00",
          placeId: "danube",
          text: "트램 2 강변 야경 (페스트 쪽 다뉴브 강변)",
          note: "마켓에서 걸어서 약 5분, Vigadó tér 정류장에서 탑니다. 16시 전후로 해가 지니 노을과 불 켜지는 순간을 같이 봅니다. ① 북쪽 Jászai Mari tér행(약 7분, 강은 왼쪽 창): 강 건너 부다 왕궁, 가까이 국회의사당 야경. ② 종점에서 내려 반대 방향(남쪽)으로 다시 타고 Fővám tér까지(약 12분, 강은 오른쪽 창): 체인 브리지, 겔레르트 언덕, 자유의 다리. ③ 다시 북쪽으로 Széchenyi István tér까지(약 5분). 탈 때마다 단일권을 쓰면 1인 3장(1,500 HUF)이니 이 구간은 90분권(1인 850 HUF) 1장이 낫습니다(72시간권을 샀다면 추가 요금 없음). 유람선(Legenda 1인 €25)을 빼서 2명 €50 (약 74,200원) 절약. (BKK 정기선 D11·D12도 유람선보다 싼 대안이지만, 12월 운항 여부와 요금을 확인하지 못해 일정에는 넣지 않았습니다.)"
        },
        {
          time: "17:00",
          placeId: "lanchid",
          text: "체인 브리지 걸어서 건너기 · 야경",
          note: "Széchenyi István tér에서 내리면 바로 다리 입구. 다리는 보행자와 버스만 다닙니다. 부다 쪽 Clark Ádám tér까지 건너갔다가(약 10분) 돌아오며 다리 위에서 국회의사당과 왕궁 야경을 봅니다. 사진 찍으며 왕복 약 30–40분. 강바람이 차니 장갑과 모자를 챙기세요."
        },
        {
          time: "17:45",
          placeId: "vorosmarty",
          text: "가벼운 저녁 · 뵈뢰슈마르티 마켓 노점",
          note: "체인 브리지 페스트 쪽 끝에서 걸어서 약 5분. 수요일은 21:00까지. 주문(2명): 구운 소시지(kolbász) + 빵 1개 나눠 먹기, 굴뚝빵(kürtőskalács) 1개, 뱅쇼(forralt bor) 2잔. 약 10,000 HUF (약 40,000원). 노점 가격은 미확인이라 추정치이고 현장에서 확인하세요. 컵 보증금이 따로 있을 수 있습니다."
        },
        {
          time: "19:15",
          placeId: "eleszto",
          text: "🍺 흥 나는 밤 · Élesztő 크래프트 맥주 펍",
          note: "마켓 앞 Vörösmarty tér에서 M1 → Deák Ferenc tér → M3 Corvin-negyed(2정거장), 내려서 걸어서 약 7분, 모두 약 20분(단일권, 메트로끼리 환승 가능). '부다페스트 최초의 독립 크래프트 맥주 펍'(공식)으로, 루인바처럼 꾸민 안뜰에 헝가리 수제 맥주 탭이 20개 넘게 있고 현지 맥주 애호가들로 북적입니다. 같은 건물에 직접 맥주를 빚는 Brew Studio도 있어 양조장을 좋아하는 취향에도 맞아요. 정기 라이브 음악은 확인하지 못했습니다(분위기는 사람들의 열기). 영업 화 · 수 15:00–02:00, 목–토 15:00–03:00, 일 · 월 15:00–01:00(공식 사이트). 주문(2명): 서로 다른 맥주 작은 잔 2개를 나눠 마시기, 약 3,000–4,000 HUF (약 1.2–1.6만 원, 추정 · 가격 미확인). 3자 자료엔 하우스 라거 1,350 · 부다페스트 수제 IPA 1,850 HUF였지만 지금은 더 비쌀 수 있습니다. 직원에게 Fehér Nyúl 같은 부다페스트 양조장 맥주를 추천해 달라고 하세요. ⚠️ 밤이 깊을수록 붐빕니다. 안뜰 흡연 여부는 미확인."
        },
        {
          time: "21:00",
          placeId: "adina-bud",
          text: "숙소 복귀",
          note: "Corvin-negyed에서 M3(Újpest-központ 방면)를 타면 Lehel tér까지 갈아타지 않고 약 12분(단일권). 내일은 07:50 출발이니 일찍 쉬세요. 펍을 건너뛰면 Deák Ferenc tér나 Ferenciek tere에서 M3로 바로 숙소(마켓은 수요일 21:00까지)."
        }
      ],
      notes: [
        {
          title: "✅ 예약 완료",
          docId: "restaurant-stand25",
          rows: [
            ["Stand25", "12/2 점심 13:00 · 2명 · 예약 완료(SevenRooms · 보증금 없음 · 변경은 24시간 전까지) · 예약번호는 문서함에서 확인해요"]
          ]
        },
        {
          title: "미리 예약할 것",
          rows: [
            ["Comme Chez Soi", "12/3 점심 13:00 (이메일 commechezsoi@gmail.com 또는 전화 +36 1 318 3943) · 필수, 10테이블 정도로 작음 · 현금만 받는다는 후기(미확인)"],
            ["Negro Mangalica", "12/3 저녁 17:30 (reservours.com/negromangalica 또는 전화 +36 20 244 4733) · 권장"],
            ["Parasztkonyha", "12/4 저녁 18:30 · Október 6. utca 지점 (booking@parasztkonyha.com / +36 70 596 7087) · 권장"],
            ["(선택) iF Jazz Café", "12/4 금 21:00쯤 · 그날 공연 시작 시간과 입장료를 공식 Facebook에서 확인하고, 자리가 작으니 가능하면 예약"],
            ["예약 필요 없음", "Élesztő(12/2 밤) · 트램 2(90분권) · 체인 브리지(도보) · 국회의사당 외관 · 신발 추모비(무료) · 세체니 Good morning 티켓(12/3 09:00 전 입장, 서커스 맞은편 현장 매표소는 카드만)"]
          ],
          foot: "시간과 가격은 2026년 10월 확인 기준입니다. 떠나기 전에 다시 확인하세요."
        },
        {
          title: "부다페스트 팁",
          rows: [
            ["건배", "Egészségedre! (에게세게드레) — 눈을 마주치며. 맥주잔은 전통적으로 부딪치지 않습니다(1849년 아라드 순교자 처형 때 오스트리아인들이 맥주로 건배했다는 전설인데, 역사적 근거는 약함). 와인과 팔린카는 부딪쳐도 괜찮습니다."],
            ["생수", "라벨을 보세요: szénsavmentes = 탄산 없음, szénsavas = 탄산, enyhén szénsavas = 약한 탄산. 뚜껑 색(분홍 = 무탄산, 파랑 = 탄산)이 흔하지만 브랜드마다 다릅니다."],
            ["돈", "통화는 포린트(HUF)입니다. 카드가 대부분 되지만 시장이나 노점용으로 현금을 조금 챙기세요. 카드 결제 때 통화를 고르라면 HUF를 선택하세요."],
            ["이동", "Bolt와 Uber는 면허 택시로 운행합니다. 대중교통은 BudapestGO 앱. 내릴 때 휴대폰과 지갑을 두고 내리지 않았는지 확인하세요."],
            ["교통권", "추천: 72시간권은 사지 않아도 됩니다. 12/1–12/5 동안 약 12번 타니 단일권(vonaljegy 1인 500 HUF)과 10장 묶음권으로 사면 2명 약 4.3만 원으로, 72시간권(2명 약 4.7–5.1만 원)보다 쌉니다. BudapestGO 앱에서 사고 탈 때마다 개시하세요. 12/2 트램 2 야경처럼 90분 안에 여러 번 타는 구간은 90분권(1인 850 HUF), 하루에 아주 많이 타는 날만 24시간권(1인 2,750 HUF)을 고려하세요. 대안: 표를 매번 사기 번거로우면 72시간권 1인 5,750 HUF(약 23,300원, BKK 공식 2026)도 괜찮습니다. 12/2 09:15쯤 개시하면 12/5 09:15까지 유효해 12/5 아침 M3까지 커버합니다. 100E 공항버스는 어떤 패스로도 못 타고 전용권(1인 2,500 HUF)이 필요합니다."],
            ["주의", "시장, 크리스마스 마켓, 루인바에서는 소매치기 주의. 가방은 앞으로."]
          ]
        }
      ]
    },
    {
      date: "2026-12-03",
      title: "온천 · 시립공원 · 유대인 지구 루인바",
      city: "부다페스트",
      blurb: "🎉 이번 여행에서 늦게까지 노는 밤은 오늘(12/3)입니다. 내일(12/4)은 다음 날 07:45 출발 때문에 22:30에 끝나니, 루인바 Szimpla는 오늘 마음껏 즐기세요. 목요일이라 세체니 온천에 09:00 전에 들어가 'Good morning Budapest' 티켓(1인 10,500 HUF)으로 아침 온천 → 시립공원·버이더후녀드 성·영웅 광장 → 안드라시 거리를 걸어 오페라 → M1으로 도심에 가서 푸아그라 점심 → 유대인 지구를 해 질 녘까지 걸으며 디자인 가게 구경 → 망갈리차 샤퀴테리와 와인으로 가벼운 저녁 → 루인바. 레헬 시장 아침은 12/2로 옮겼습니다.",
      items: [
        {
          time: "07:50",
          placeId: "adina-bud",
          text: "숙소 출발 → 세체니 온천",
          note: "아침은 숙소에서 가볍게(전날 마트에서 사 둔 빵·요거트 등, 온천 전이라 조금만). 걸어서 Lehel tér(약 5분) → M3 Deák Ferenc tér(3정거장, 약 5분) → M1 Széchenyi fürdő(약 10분), 온천 입구까지 약 25–30분(단일권 1장, 메트로끼리 환승 가능). Bolt면 약 10분. 수건 · 슬리퍼 · 수영복을 챙겼는지 확인하세요."
        },
        {
          time: "08:20",
          placeId: "szechenyi",
          text: "세체니 온천 · 'Good morning Budapest' 티켓 (09:00 전 입장)",
          note: "월–목 07:00–20:00(탕은 19:40까지), 매표소는 문 닫기 1시간 전까지(공식 사이트). 12/3은 목요일이라 09:00 전에 입장하면 Good morning Budapest 티켓 1인 10,500 HUF(약 42,500원)로, 일반 평일권 13,200 HUF보다 싸서 2명 21,000 HUF(약 85,000원), 5,400 HUF(약 21,900원) 절약(2026 공식 요금). 줄을 생각해 08:40까지는 매표소에 도착하세요. 서커스 맞은편 입구 현장 매표소는 카드만 받습니다. 기본 사물함이 포함돼 있어 Fast Track(15,200 HUF)이나 캐빈은 필요 없습니다. ⚠️ 수건·가운 대여는 현재 없습니다. 수건과 슬리퍼를 챙기세요(현장에서 사면 수건 6,900 · 슬리퍼 4,200 HUF, 1인 11,100 HUF · 약 45,000원). 온천 안 매점은 카드만. 약 2시간 반 즐기고 11:00쯤 나옵니다."
        },
        {
          time: "11:00",
          placeId: "vajdahunyad",
          text: "시립공원 산책 · 버이더후녀드 성",
          note: "온천에서 걸어서 약 5분. 성 안뜰과 호숫가는 무료로 걸을 수 있습니다(안의 농업 박물관은 유료라 생략). 겨울에는 성 앞 호수가 야외 아이스링크(Városligeti Műjégpálya)로 바뀌어 구경하기 좋습니다(올해 운영 기간은 현장 확인). 온천 직후라 머리를 잘 말리고 모자를 쓰세요."
        },
        {
          time: "11:40",
          placeId: "hosok-tere",
          text: "영웅 광장 (Hősök tere)",
          note: "성에서 다리를 건너 걸어서 약 5–10분. 무료, 24시간. 밀레니엄 기념비와 헝가리 건국 지도자 동상들. 사진을 찍고 안드라시 거리로 내려갑니다."
        },
        {
          time: "11:55",
          placeId: "opera",
          text: "안드라시 거리 산책 → 오페라 하우스 (외관)",
          note: "영웅 광장에서 오페라까지 안드라시 거리(세계유산)를 따라 약 2.4 km, 걸어서 약 35분. 코다이 원형광장(Kodály körönd)과 옥토곤(Oktogon)을 지납니다. 힘들면 중간에 M1(이 거리 바로 아래를 달리는 1896년 지하철)을 타세요. 오페라 하우스는 외관만(내부 투어는 유료라 생략). 12:35쯤 Opera에서 M1 → Vörösmarty tér(3정거장, 약 5분), 내려서 걸어서 약 5분."
        },
        {
          time: "13:00",
          placeId: "comme-chez-soi",
          text: "점심 · Comme Chez Soi 거위 간 🍖 육식맨 추천",
          note: "Vörösmarty tér에서 걸어서 약 5분. 매일 12:00–23:00(공식). 영상 평: 차가운 푸아그라와 사과 플람베를 곁들인 구운 푸아그라 둘 다 극찬. 샐러드 · 셔벗 · 리큐어를 서비스로 준다는 후기가 있습니다. 주문(2명): 사과 곁들인 구운 거위 간 1개 12,900 HUF(3자 자료 기준) + 해산물 파스타 1개 8,900 HUF(2명이 먹을 만한 양이라는 후기) ≈ 21,800 HUF (약 88,000원) + 음료. 차가운 푸아그라도 먹고 싶으면 파스타 대신 시키세요(가격 미확인). ⚠️ 예약 필수: commechezsoi@gmail.com / +36 1 318 3943. ⚠️ 현금만 받는다는 후기가 있으니(미확인) 3만 HUF 정도 현금을 챙기세요."
        },
        {
          time: "14:30",
          placeId: "jewish",
          text: "유대인 지구 산책 · 도하니 회당",
          note: "Comme Chez Soi에서 Deák Ferenc tér를 지나 걸어서 약 20분(약 1.5 km). 도하니 회당은 11–12월 일–목 10:00–16:00, 입장은 15:00까지, 성인 14,500 HUF(약 58,700원)라 외관과 뒤편 기념 정원 쪽만 보고 지나갑니다(안을 보고 싶으면 15:00 전에 들어가세요). 이어서 Rumbach 회당(외관) → Kazinczy utca 정통파 회당 → 골목 벽화 → Király utca · Klauzál tér 쪽으로 천천히 걷습니다. 16시쯤 해가 지면 골목에 불이 켜져 분위기가 좋습니다. 추우면 가까운 카페에서 쉬었다가 17:30에 저녁 장소로. (Edmmer 영상의 Rosenstein · Karaván은 동선과 메뉴가 겹쳐서 이번엔 뺐습니다.)"
        },
        {
          time: "16:15",
          placeId: "judapest",
          text: "🛍️ Király utca 주변 디자인 · 콘셉트 가게",
          note: "유대인 지구 산책 중 들르는 작은 디자인 가게들(모두 걸어서 5분 안). ① Judapest(Kazinczy u. 52, Király utca 쪽 끝): 헝가리 공예가들이 만든 현대적인 유대 문화 소품 · 주얼리 · 도자기 콘셉트 스토어, 매일 10:00–19:00(공식). ② Szimpla Design Shop(Kazinczy u. 14, Szimpla Kert 옆): 헝가리 디자이너 소품 · 업사이클링 제품, 월–금 10:00–19:00(공식). ③ Printa(Rumbach Sebestyén u. 10): 부다페스트 그래픽을 실크스크린으로 찍은 티셔츠 · 에코백 · 포스터 디자인 숍 겸 카페, 영업시간은 3자 자료로 매일 10:00–19:00(미확인). Király utca 1의 주얼리 공방 H&B Design은 3자 자료상 화–금 10:00–18:00(미확인). 💶 헝가리 택스 리펀드는 한 번에 68,000 HUF(€175) 넘게 살 때만(NAV 2026 공식)이라 작은 소품은 해당 없어요. 17:30에 저녁 장소로."
        },
        {
          time: "17:30",
          placeId: "negromangalica",
          text: "가벼운 저녁 · Negro Mangalica 샤퀴테리 🍖 육식맨 추천",
          note: "Szimpla에서 걸어서 약 5분. 매일 12:00–23:30(공식). 헝가리 토종 돼지 망갈리차 전문점. 영상에서는 샤퀴테리 플레이트(파프리카 소시지, 페퍼 소시지, 햄, 디스노샤이트)를 먹었습니다. 주문(2명): Mangalica felvágottas tál 5,900 + 호르토바지 팔러친타(고기를 넣은 크레페) 3,500 + 헝가리 와인 2잔(약 4,000, 추정) ≈ 13,400 HUF (약 54,000원). 메뉴판 사진 기준이고 서비스 차지는 미확인. 예약 권장: reservours.com/negromangalica 또는 +36 20 244 4733."
        },
        {
          time: "19:30",
          placeId: "szimpla",
          text: "🎸 흥 나는 밤 · Szimpla Kert 루인바 🎬 영상 추천",
          note: "Negro Mangalica에서 걸어서 약 5분, Kazinczy utca에 있는 원조 루인바입니다. 영업시간(월–금 15:00–04:00, 토 12:00–, 일 09:00–)은 3자 자료 기준이고 공식 사이트에서는 확인하지 못했습니다(미확인). 입장은 무료이고, 거의 매일 밤 무료 콘서트가 열린다고 합니다(3자 자료 2026.10). 그날 공연은 Szimpla 공식 Facebook(concertsatszimpla) 이벤트에서 확인하세요. 주문(2명): 생맥주 0.3 l 2잔 1,900 × 2 = 3,800 HUF (약 15,400원, 3자 자료 2026.10 기준, 바마다 칠판 가격이 조금씩 다름). 줄은 주로 금 · 토 밤이라 목요일 저녁은 비교적 수월해요. 🎉 오늘이 늦게까지 노는 밤이니 공연을 보고 자정 무렵까지 여러 방을 돌아다니며 즐기세요(내일은 08:30 출발로 여유가 있고, 12/4 밤은 다음 날 07:45 출발 때문에 22:30에 끝내요). 늦게까지 있으면 2명 맥주 2잔씩 약 7,600 HUF(약 30,800원, 3자 자료 가격 기준). 소지품 주의."
        },
        {
          time: "00:00 전후",
          placeId: "adina-bud",
          text: "숙소 복귀 (Bolt)",
          note: "자정 무렵에는 메트로 막차가 가까우니(Lehel tér 기준 M3 막차 23:51 · 00:08, 3자 시간표 · 미확인) Bolt로 약 10–15분이 편해요(요금은 앱에서 확인). 일찍 나오면 Astoria에서 M2 → Deák Ferenc tér → M3 Lehel tér(약 20분, 단일권)."
        }
      ],
      notes: [
        {
          title: "12/3 준비물",
          rows: [
            ["온천", "수영복 · 수건 · 슬리퍼(플립플롭) 챙기기. 대여 없음, 현장 구매 시 수건 6,900 · 슬리퍼 4,200 HUF"],
            ["티켓", "Good morning Budapest(09:00 전 입장) 1인 10,500 HUF. 기본 사물함 포함, Fast Track·캐빈 필요 없음. 현장 매표소는 카드만"],
            ["그 밖에", "젖은 머리용 모자 · 비닐봉지(젖은 수영복) · 점심용 현금 약 3만 HUF(Comme Chez Soi 현금만 후기, 미확인)"]
          ],
          foot: "가격과 시간은 세체니 공식 사이트(2026) 기준입니다. 떠나기 전에 다시 확인하세요."
        }
      ]
    },
    {
      date: "2026-12-04",
      title: "페스트 · 국회의사당 · 크리스마스 마켓",
      city: "부다페스트",
      blurb: "남쪽 중앙시장에서 랑고시로 시작해 트램 2를 타고 다뉴브를 따라 국회의사당까지 올라가 외관과 코슈트 광장, 강변의 신발 추모비를 무료로 봅니다. 대성당 마켓에서 점심을 먹고 오후에는 뵈뢰슈마르티 광장 마켓에서 바치 거리를 따라 중앙시장까지 걸으며 마지막 쇼핑, 숙소에서 쉬며 짐을 싼 뒤 → 프로젝션 쇼 → 바로 옆 Parasztkonyha에서 마지막 헝가리 가정식과 토카이 한 잔 → 국회의사당 강변 야경 산책 → (선택) 금요일 밤 재즈 클럽 iF Jazz Café 라이브로 마무리합니다. 내일 07:45 출발이라 22:30에는 숙소로 갑니다.",
      items: [
        {
          time: "08:30",
          placeId: "great-market",
          text: "중앙시장 · 랑고시 아침 🎬 영상 추천",
          note: "M3 Lehel tér → Kálvin tér 직행(약 10분), 내려서 도보 5분. 월–금 06:00–18:00, 공휴일 휴무. 랑고시는 2층 갤러리에 있습니다. ⚠️ 영상에서는 토핑을 전부 '예스' 했다가 약 10만 원이 나왔습니다. 주문 전에 가격표와 토핑별 가격을 확인하고, 기본(사워크림 + 치즈)부터 시작하세요. 주문(2명): 사워크림 + 치즈 랑고시 1개 나눠 먹기(약 2,000–3,000 HUF · 8,000–12,000원, 추정). 랑고시는 12/4 오늘만 먹어요. 12/1 대성당 마켓에서는 먹지 않아요. ⚠️ 붐비는 곳이니 소매치기 주의."
        },
        {
          time: "10:00",
          placeId: "great-market",
          text: "트램 2 · Fővám tér → Kossuth Lajos tér 강변 따라",
          note: "중앙시장 바로 앞 Fővám tér 정류장에서 북쪽(Jászai Mari tér)행을 타고 Kossuth Lajos tér까지 약 15분(단일권). 강은 왼쪽 창이라 왼쪽에 앉으면 부다 왕궁, 체인 브리지, 어부의 요새를 차례로 봅니다."
        },
        {
          time: "10:30",
          placeId: "parliament",
          text: "국회의사당 외관 · 코슈트 광장 (무료)",
          note: "내부 투어는 하지 않고 밖에서 봅니다. 코슈트 광장은 24시간 열려 있고 무료입니다. 광장의 큰 국기 게양대 앞에서 의장대가 낮 동안 정시마다 교대합니다(2014년 발표 기준 겨울 09:00–17:00, 현장 확인). 11:00 교대를 보고 강변 쪽으로 걸어가세요. 국회 투어(비EU 성인 14,000 HUF × 2)를 빼서 2명 28,000 HUF (약 113,400원) 절약."
        },
        {
          time: "11:15",
          placeId: "shoes",
          text: "신발 추모비 (다뉴브 강변의 신발)",
          note: "국회의사당에서 강변을 따라 남쪽으로 도보 약 5분. 1944–45년 강가에서 희생된 유대인을 기리는 쇠 신발 조형물입니다. 조용히 보고, 신발 안에 놓인 초나 꽃은 건드리지 마세요."
        },
        {
          time: "12:15",
          placeId: "basilica",
          text: "성 이슈트반 대성당 · Advent Bazilika 마켓 점심",
          note: "신발 추모비에서 도보 약 15분. 성당 내부는 월–토 09:00–17:45, 전망대는 매일 09:00–19:00. 성인 요금은 성당 2,600 / 전망대 + 보물관 5,000 / 통합권 6,800 HUF. 마켓은 2026.11.13–2027.1.1, 일–목 11:00–22:00, 금–토 11:00–23:00. 주문(2명): 12/2에 소시지와 굴뚝빵을 먹었으니, 여기서는 töltött káposzta(양배추 롤) 1개 + 뱅쇼나 따뜻한 펀치 1–2잔(약 5,000–8,000 HUF · 2–3.2만 원, 추정). 저녁을 든든히 먹으니 가볍게."
        },
        {
          time: "13:15",
          placeId: "vaci-utca",
          text: "🛍️ 쇼핑 · 뵈뢰슈마르티 광장 마켓 → 바치 거리 남쪽으로",
          note: "대성당에서 뵈뢰슈마르티 광장까지 걸어서 약 10분. 광장 크리스마스 마켓(금 11:00–22:00, 공식)에서 헝가리 공예품 · 파프리카 · 토카이 와인 같은 선물을 보고, 부다페스트 대표 보행자 쇼핑 거리인 바치 거리를 따라 남쪽 중앙시장 쪽으로 천천히 내려갑니다(약 1.2 km). Váci utca 6 Zara와 H&M 같은 체인점은 금요일 21:00까지 연다는 3자 자료가 있지만 가게마다 다릅니다(미확인). 💶 헝가리 택스 리펀드는 한 번에 68,000 HUF(€175) 넘게 살 때만(NAV 2026 공식) · 여권 지참 · 12/5 공항 세관 확인."
        },
        {
          time: "14:30",
          placeId: "great-market",
          text: "🛍️ 중앙시장 · 기념품 · 파프리카 · 와인 선물",
          note: "바치 거리 남쪽 끝에서 바로입니다. 아침에 랑고시를 먹은 그곳으로, 이번에는 1층 파프리카 · 살라미 가게와 2층 기념품 · 자수 가게를 둘러봅니다. 금요일 18:00까지(월–금 06:00–18:00). 토카이 한 병을 선물로 산다면 위탁 수하물에 넣으세요(기내 반입 액체 제한). ⚠️ 붐비는 곳이니 소매치기 주의."
        },
        {
          time: "15:15",
          placeId: "adina-bud",
          text: "숙소에서 쉬기 · 짐 싸기 (17:00까지)",
          note: "중앙시장 옆 Kálvin tér에서 M3(Újpest-központ 방면)로 Lehel tér까지 갈아타지 않고 약 10분(단일권), 내려서 걸어서 약 5분. 산 물건을 내려놓고 내일 07:45 출발에 맞춰 짐을 미리 싸 두고 쉽니다. 17:00에 나와 Lehel tér에서 M3 2정거장(약 4분, 단일권) Arany János utca에서 내려 성당 광장까지 걸어서 약 4분."
        },
        {
          time: "17:30",
          placeId: "basilica",
          text: "대성당 파사드 프로젝션 쇼 · 크리스마스 마켓",
          note: "매일 17:30부터 성당 파사드에 라이트 페인팅을 쏩니다(날에 따라 17:00 콘서트, 공식 사이트 기준)."
        },
        {
          time: "18:30",
          placeId: "parasztkonyha",
          text: "저녁 · Parasztkonyha 헝가리 가정식 🍖 육식맨 추천",
          note: "대성당에서 걸어서 약 5분. Váci utca에도 지점이 있으니 Október 6. utca 3으로 가세요. 월–목 17:00–23:00, 금–일 12:00–23:00(공식). 영상 평: 레초(lecsó), 구야시, 소고기 푀르켈트 모두 훌륭하고 양이 많다. 구야시는 12/2에 먹었으니 빼고 주문(2명): 레초 4,990 + 소고기 푀르켈트(marhapörkölt, 달걀 넣은 헝가리식 수제비 곁들임) 7,790 + 군델 팔러친타(호두 크레페 · 초콜릿 소스) 3,990 + 와인 1.5 dl 2잔(약 4,880) ≈ 21,650 HUF (약 88,000원). 2026/05 공식 메뉴, VAT 포함, 서비스 차지는 미확인. 🍷 추천: 와인 한 잔은 헝가리 대표 와인인 토카이로(드라이한 푸르민트 Furmint, 디저트와 함께라면 달콤한 Tokaji Aszú). 잔으로 파는지 · 가격은 메뉴에서 확인하세요(미확인). 헝가리 와인을 여러 잔 비교해 보고 싶으면 12/1 DiVino Bazilika가 시음 자리입니다. 예약 권장: booking@parasztkonyha.com / +36 70 596 7087."
        },
        {
          time: "20:00",
          placeId: "parliament",
          text: "국회의사당 · 다뉴브 강변 야경 산책",
          note: "Parasztkonyha에서 걸어서 약 12분(약 1 km). 오전에 밖에서 본 국회의사당을 밤에 불 켜진 모습으로 강변에서 한 번 더 봅니다. 가볍게 30–40분 걷고 숙소로 갑니다."
        },
        {
          time: "21:00",
          placeId: "if-jazz",
          text: "(선택) 🎷 흥 나는 밤 · iF Jazz Café 금요일 라이브",
          note: "Kossuth Lajos tér에서 M2 → Deák Ferenc tér → M3 Kálvin tér(약 15분, 단일권, 메트로끼리 환승 가능), 내려서 걸어서 약 3분. 라데이 거리(Ráday utca)의 재즈 클럽으로 2007년부터 이어 왔고 2026년 7월 새 운영진으로 다시 열었습니다. 지금은 수–일에 라이브가 있고 목 · 금 · 토가 메인 공연 날이라고 공동 대표가 밝혔습니다(JazzMa 인터뷰, 2026.9). 재개장 뒤 로비 라카토시 같은 집시 재즈 연주자도 섰던 곳이라 금요일 밤 열기를 기대할 만해요. ⚠️ 공연 시작 시간 · 입장료(커버 차지) · 음료 가격 · 영업시간은 확인하지 못했습니다(미확인). 12/4 공연은 공식 Facebook에서 확인하고, 자리가 작으니 가능하면 예약하세요. 주문(2명): 맥주나 와인 1잔씩(약 4,000–6,000 HUF · 1.6–2.4만 원, 추정) + 커버 차지(있다면). 내일 아침 07:45 출발이니 22:30에는 나오세요."
        },
        {
          time: "22:45",
          placeId: "adina-bud",
          text: "숙소 복귀 · 짐 싸기",
          note: "Kálvin tér에서 M3(Újpest-központ 방면)를 타면 Lehel tér까지 갈아타지 않고 약 10분(단일권). 재즈 클럽을 건너뛰면 Kossuth Lajos tér에서 숙소까지 걸어서 약 20분(약 1.6 km), 또는 Bolt로 21:30쯤 복귀. 짐은 오후에 숙소에서 싸 두었으니 돌아와서 바로 쉬세요."
        }
      ],
      notes: [
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["랑고시 아침", "약 2,000–3,000 HUF (8,000–12,000원, 추정)"],
            ["마켓 점심", "약 5,000–8,000 HUF (2–3.2만 원, 추정)"],
            ["Parasztkonyha 저녁", "약 21,650 HUF (약 88,000원)"],
            ["(선택) iF Jazz Café", "약 4,000–6,000 HUF + 커버 차지(미확인)"],
            ["바치 거리 · 중앙시장 쇼핑", "11/27 '여행 경비'의 쇼핑 예비비에서"]
          ],
          foot: "교통(M3 단일권)은 11/27 '여행 경비'의 교통에 들어 있습니다. 환율 1 HUF ≈ 4.05원."
        }
      ]
    },
    {
      date: "2026-12-05",
      title: "출발",
      city: "부다페스트 → 인천",
      blurb: "11:30 출발(체크인은 출발 45분 전인 10:45에 마감)이라 09:00까지 T2B에 도착하는 것을 목표로 07:45에 체크아웃합니다. 늦어도 08:15에는 숙소를 나서세요. 택시 대신 M3 + 100E 공항버스로 가서 2명 약 3.6–4.5만 원을 아낍니다(짐을 들고 한 번 갈아타야 함). 호텔 조식은 주말 07:00부터라 먹고 나올 수 있어요.",
      items: [
        {
          time: "07:45",
          placeId: "adina-bud",
          text: "체크아웃 · 공항 이동 (M3 → 100E 공항버스)",
          note: "총 약 50–60분. 늦어도 08:15에는 숙소를 나서세요(체크인 마감 10:45). ① 숙소에서 Lehel tér까지 걸어서 약 5분. ② M3 Lehel tér → Deák Ferenc tér(3정거장, 약 5분, 단일권 1인 500 HUF). ③ Deák Ferenc tér 지상, Károly körút의 Városháza 공원 쪽(BudapestInfo 근처) 100E 정류장('Repülőtér/Airport' 표지)에서 100E 공항버스 → Liszt Ferenc Airport 2, 약 35–40분. 100E는 Deák Ferenc tér → Kálvin tér → 공항만 서는 급행이고, 아침에는 10–15분 간격, 24시간 운행(BKK 공식). Deák가 출발 정류장이라 자리와 짐 칸을 잡기 쉽습니다. 요금은 전용 공항버스권 1인 2,500 HUF(2명 5,000 HUF · 약 20,000원)이고, 72시간권 · 24시간권 같은 패스나 일반 단일권으로는 못 탑니다. 앞문으로 타서 앞문 옆 단말기에 카드를 1명당 한 번씩 탭하세요(BudapestGO 앱으로 사도 됨). 08:05–08:20 버스를 타면 08:45–09:00쯤 T2B에 도착합니다. Bolt/택시 대비 2명 약 3.6–4.5만 원 절약(추정). 단점: 짐(1인 위탁 2개까지)을 들고 Deák에서 지상으로 올라가 갈아타야 합니다. 72시간권을 샀고 아직 유효하면 M3를 Kőbánya-Kispest까지 타고(약 25분) 200E 일반 버스(약 25분, 패스 가능)로 갈 수도 있지만, 서는 곳이 많고 붐빌 수 있습니다. 짐이 너무 많으면 Bolt를 부르세요. 호텔 조식은 주말 07:00부터라 07:00에 먹고 나오면 됩니다."
        },
        { time: "11:30", placeId: "bud", leg: true, text: "12/5 11:30 부다페스트(BUD) T2B 출발 · MU8640 / FM870" },
        { time: "12/6", placeId: "pvg", leg: true, text: "12/6 05:25 상하이 푸동(PVG) 도착 → 08:40 출발 · MU5041" },
        { time: "12/6", placeId: "icn", leg: true, text: "12/6 11:55 인천공항(ICN) 도착" }
      ]
    }
  ]
};
