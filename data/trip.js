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
    "2026-11-30": ["train-vie-sbg"],
    "2026-12-01": ["train-vie-bud", "budapest-hotel"],
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
    "sauska-budafok": {
      name: "Sauska 와인셀러 (Budafok 스파클링 와인 저장고)",
      city: "부다페스트",
      address: "Nagytétényi út 36–42, 1222 Budafok",
      lat: 47.41799,
      lng: 19.04154,
      station: "Városház tér (트램 47 종점)에서 걸어서 약 12분",
      lines: "트램 47"
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
            ["예산", "1인 100만 원 × 2명 = 200만 원"],
            ["11/28 비엔나", "약 177,300원 (소시지 · 데멜 · Ribs of Vienna 등갈비 · 시청사 마켓 뱅쇼 · Krah Krah · Casablanca)"],
            ["11/29 비엔나", "약 211,800원 (카페 자허 · 벨베데레 · 플라후타 · 베르무다 펍)"],
            ["11/30 잘츠부르크", "약 366,500원 (기차 왕복 · Stiegl 투어 · 요새 · 버스 · 엘리베이터 · 점심 · 아우구스티너)"],
            ["12/1 이동일", "약 106,000원 (Figlmüller 점심 · 대성당 마켓 저녁 · 선택 와인 한 잔)"],
            ["12/2 부다페스트", "약 160,000원 (시장 아침 · Stand25 · 마켓 저녁 · Élesztő)"],
            ["12/3 부다페스트", "약 257,800원 (세체니 · Comme Chez Soi · Negro Mangalica · Szimpla 늦게까지)"],
            ["12/4 부다페스트", "약 229,000원 (랑고시 · 마켓 점심 · Sauska · Parasztkonyha · 선택 재즈)"],
            ["교통", "약 153,000원 (비엔나 7일권 + 공항 구간 2명 €55 · 부다페스트 단일권 · 12/5 100E 공항버스)"],
            ["예비비", "약 150,000원 (마트 · 간식 · 마켓 · 성당 입장 · Bolt처럼 가격을 현장에서 확인할 항목)"],
            ["합계 (쇼핑 제외)", "약 1,811,400원 · 1인 약 905,700원"],
            ["🛍️ 쇼핑 예비비", "200만 − 181.1만 = 약 18.9만 원 (1인 약 9.4만 원)이 쇼핑 돈입니다(11/28 등갈비 저녁으로 약 6.2만 원 줄었어요). 쇼핑 시간: 비엔나 11/28 오후 · 12/1 오전, 부다페스트 12/3 오후(Király utca 주변) · 12/4 저녁(바치 거리). 11/29 일요일은 상점 휴무. 선택 항목(와인 한 잔 · 재즈 클럽)을 빼면 약 3.8만 원 더 생깁니다."]
          ],
          foot: "추정 금액은 범위의 중간값으로 더했습니다. 11/30 잘츠부르크 기차표(€95.60)는 포함, 12/1 비엔나→부다페스트 기차표는 결제 완료라 금액이 앱에 없어 빠져 있습니다. 1 EUR ≈ 1,484원 · 1 HUF ≈ 4.05원."
        }
      ]
    },
    {
      date: "2026-11-28",
      title: "도착 · 마트 · 크리스마스 마켓",
      city: "비엔나",
      blurb: "밤 비행 직후라 무리하지 않는 날. 숙소 체크인은 15:00라 짐부터 맡깁니다. 내일(일요일)은 마트와 상점 대부분이 쉬니 장보기와 비엔나 첫 쇼핑은 오늘(토요일 상점은 18:00쯤 닫음). 낮에는 간식(소시지 · 카이저슈마렌)으로 가볍게, 저녁은 쇼핑 바로 옆 Ribs of Vienna에서 등갈비(RIPS)를 든든히. 밤에는 베르무다 삼각지대에서 맥주 한 잔과 라이브 음악으로 흥을 올립니다(피곤하면 생략). 🍖 육식맨 추천 / 🍰 잡식맨 추천 = 유튜브 육식맨·잡식맨 영상에 나온 곳. 금액은 2명 기준, 1 EUR ≈ 1,484원 · 1 HUF ≈ 4.05원으로 계산했습니다.",
      items: [
        {
          time: "06:00",
          placeId: "vie",
          text: "비엔나 공항 도착 → Wien Hbf",
          note: "ÖBB Railjet/IC 직행으로 Wien Hbf까지 약 15분, 공항 출발 06:33부터 30분 간격. 7일권(아래 '비엔나 교통권')을 쓰면 공항 구간용 외곽 구간권 1인 €2.30만 더 사면 됩니다(7일권 없이 가면 1인 €5.50). 2026.9–2027.10 공사로 S7은 St. Marx까지만 가니 Railjet이나 REX7을 타세요."
        },
        {
          time: "07:30",
          placeId: "adina-vie",
          text: "숙소 · 짐 맡기기",
          note: "체크인 15:00 · 체크아웃 11:00 · 24시간 리셉션 · 짐 보관 가능. 이른 체크인은 전날 숙박을 추가 예약해야 확실합니다(유료)."
        },
        {
          placeId: "belvedere",
          text: "주변 구경 · 벨베데레 정원 산책",
          note: "숙소에서 걸어서 약 10–15분. 정원 산책만, 궁전(미술관) 입장은 11/29 일정 참고."
        },
        {
          placeId: "naschmarkt",
          text: "(선택) 나슈마르크트 · 토요 벼룩시장",
          note: "토요일 벼룩시장 06:30–15:00 (Kettenbrückengasse 쪽). 피곤하면 생략해도 됩니다."
        },
        {
          time: "12:00 전후",
          placeId: "wuerstelstand",
          text: "점심 간식 · 쥐트티롤러 광장 소시지 가판 🍖 육식맨 추천",
          note: "Hbf 바로 앞, 숙소에서 걸어서 몇 분. 매일 09:00–04:00(공식 사이트). 영상 평: '진짜 맛있다… 훨씬 요리 같은 느낌', 'Art des Hauses는 노골적으로 맛있어'. 주문(2명): 케제크라이너 Art des Hauses(양파·케첩·커리·카옌, 빵 없음) €5.60 + 케제크라이너 핫도그 €5.50 = €11.10 (약 16,500원, 공식 메뉴 가격). 음료는 별도. 예약 없음. 비엔나 소시지는 여기 한 번만 먹습니다."
        },
        {
          time: "15:00 전후",
          placeId: "wien-hbf",
          text: "Hauptbahnhof 마트 장보기 → 체크인 · 잠깐 휴식",
          note: "토요일은 일반 마트 영업. 일요일엔 대부분 문을 닫고, Hbf의 INTERSPAR-pronto(일 06:00–23:00) 정도만 엽니다."
        },
        {
          time: "16:00",
          placeId: "demel",
          text: "데멜 카이저슈마렌 🍰 잡식맨 추천",
          note: "숙소에서 U1 Stephansplatz(약 5분) 하차 후 걸어서 약 6분. 매일 10:00–19:00, 카이저슈마렌도 19:00까지, 예약 불가(공식 사이트). 영상 평: '월드 클래스 디저트… 꼭 드세요'. 푹신하고 푸딩처럼 부드럽고, 자두 콤포트(Zwetschkenröster)가 달지 않고 상큼하다고 했습니다(영상은 6월이라 자두가 아니었을 수 있음). 주문(2명): 카이저슈마렌 1개 나눠 먹기 + 멜랑주 2잔. 약 €26 (약 39,000원). 카이저슈마렌은 2026년 방문 후기 기준 €12.90, 멜랑주는 잔당 약 €6.5로 추정했습니다(미확인). 토요일엔 줄이 길어요. 그럴 땐 포장 창구에서 '스몰' 사이즈를 사세요(영상 추천). 자허토르테는 내일 카페 자허에서 먹으니 여기선 생략."
        },
        {
          time: "16:45",
          placeId: "kaerntner-strasse",
          text: "🛍️ 쇼핑 · 콜마르크트 → 그라벤 → 케른트너 거리 (17:35까지)",
          note: "데멜 앞 콜마르크트에서 그라벤을 지나 케른트너 거리까지 걸으며 구경합니다(데멜 → STEFFL 백화점 약 650 m, 9분). ⚠️ 오스트리아 상점은 토요일 18:00쯤 닫고 일요일엔 쉽니다. STEFFL(Kärntner Straße 19)은 토 10:00–18:00, 월–금 10:00–20:00, 일요일 휴무(공식). 다른 가게 영업시간은 가게마다 다르니 현장 확인. 큰 쇼핑은 12/1 오전에 한 번 더 할 수 있어요. 거리 쇼핑을 더 하고 싶으면 마리아힐퍼 거리(U3 Neubaugasse · Zieglergasse)도 있지만 오늘은 동선상 도심만 추천. 💶 택스 리펀드: 오스트리아는 한 영수증 €75.01 이상(공식, 영수증 합산 불가) · 여권 지참, EU를 떠나는 12/5 부다페스트 공항에서 세관 확인을 받습니다. 17:35에 STEFFL에서 Ribs of Vienna로 출발(Weihburggasse로 꺾어 약 250 m, 걸어서 4분)."
        },
        {
          time: "17:45",
          placeId: "ribs-of-vienna",
          text: "🍖 저녁 · Ribs of Vienna 등갈비 (RIPS)",
          note: "케른트너 거리 STEFFL에서 걸어서 약 4분, 1591년 지하 와인 저장고(셀러)를 쓰는 등갈비 · 스테이크 전문점. 간판 메뉴는 '1미터 등갈비'(모두 돼지 등갈비). 토 · 일 12:00–24:00 연속 영업, 주방 22:30까지, 휴무일 표기 없음(공식 사이트 ribsofvienna.at). 주문(2명): 'Spareribs for 2 people' €41(등갈비 + 구운 감자 · 베이컨 그린빈 · 마늘빵 · 코울슬로 · 소스 3종, 5가지 맛을 고르는 믹스는 €43) + 생맥주 0.5 l 2잔(Kaiser · Staro Brno 등 각 €5.50) = €52 (약 77,200원). 가격은 공식 메뉴(2025년 5월판) 기준이라 올랐을 수 있어요(미확인). 팁(5–10%)은 별도. ⚠️ 예약 권장: 공식 사이트 'Table Booking'(easyTableBooking 온라인 예약) 또는 전화 +43 1 513 85 19. 예약 시간 10분이 지나면 자동 취소되니 17:45 정시에 도착하세요. 최근 후기는 '부드럽고 양이 많다'는 평이 많지만, 관광객이 많고 붐비는 시간엔 서비스가 느리다는 평도 있어요. 19:00쯤 나와 시청사 마켓으로."
        },
        {
          time: "19:15",
          placeId: "rathaus",
          text: "시청사 크리스마스 마켓 · 뱅쇼 한 잔",
          note: "2026.11.13–12.26 매일 10:00–22:00. 해가 진 뒤라 조명이 켜져 있어요. Ribs of Vienna에서 걸어서 약 20–25분(약 1.7 km), 또는 Oper까지 걸어가(약 8분) 트램 D로 Rathausplatz/Burgtheater. 저녁은 먹었으니 펀치나 뱅쇼 2잔만(마켓 가격은 현장 확인, 약 €10–14 · 1.5–2.1만 원 추정). 머그 보증금(Häferlpfand)은 컵을 돌려주면 돌려받습니다. 20:15쯤 펍으로 출발. 펍에 가지 않고 바로 돌아올 땐 Rathausplatz/Burgtheater에서 트램 D 한 번에 숙소."
        },
        {
          time: "20:35",
          placeId: "krah-krah",
          text: "🍺 흥 나는 밤 ① · Krah Krah 비어바이즐 (베르무다 삼각지대)",
          note: "시청사 마켓에서 걸어서 약 20분(약 1.5 km), 또는 Burgtheater에서 트램 1로 Schwedenplatz까지 간 뒤 걸어서 3분. 첫 무대 전 맥주 한 잔만. 술집이 모여 있는 '베르무다 삼각지대'에서 1980년부터 가족이 운영하는 비어바이즐(맥주 선술집)로, 생맥주 종류가 많고 토요일 밤엔 골목 전체가 북적입니다. 토 11:00–01:00(일 ~23:00), 주방 22:30까지(공식 사이트). 주문(2명): 0.3 l 생맥주 2잔(오타크링거 츠비클 로트 · 슈티글 필스 · 트루머 필스 등 각 €4.60) = €9.20 (약 13,700원, 공식 메뉴). 하우스 맥주 Krah-Bier는 0.4 l €5.10. 카드는 €10부터 받는다는 표기가 있으니 현금을 조금 챙기세요. 21:00 전에 바로 옆 카사블랑카로 옮깁니다."
        },
        {
          time: "21:00",
          placeId: "casablanca",
          text: "🎸 흥 나는 밤 ② · Casablanca 라이브 바 (매일 밤 라이브)",
          note: "Krah Krah 바로 옆(같은 Rabensteig 8). 1983년부터 40년 넘게 약 7,000번의 라이브 공연을 해 온 베르무다 삼각지대 원조 라이브 바로, 재즈 · 블루스 · 오스트로팝 · 록앤롤 밴드가 매일 밤 21:00부터 연주합니다(공식). 토요일은 21:00–23:00 첫 무대, 23:30–03:30 두 번째 무대(10월 공식 프로그램 기준, 11/28 출연자는 아직 미발표). 영업 수–토 17:00–04:00, 일–화 17:00–02:00. 주문(2명): 오타크링거 헬레스(또는 츠비클 로트) 0.3 l 2잔 €8.80 (약 13,100원, 공식 음료 메뉴). 입장료 표기는 없지만 미확인. ⚠️ 현금만 받습니다(공식). 작은 바라 붐비고 시끄러울 수 있어요. 첫 무대 한 시간만 즐기고 22:15쯤 나오세요."
        },
        {
          time: "22:15",
          placeId: "adina-vie",
          text: "숙소 복귀",
          note: "Schwedenplatz까지 걸어서 약 3분 → U1(Oberlaa 방면) Hauptbahnhof까지 4정거장, 약 7분(7일권). 주말 밤에는 U-Bahn이 밤새 다닙니다. 비행 직후라 너무 피곤하면 일찍 들어가세요. 내일(11/29) 플라후타 저녁 뒤에도 같은 골목에서 한 번 더 놉니다."
        }
      ],
      notes: [
        {
          title: "비엔나 교통권",
          rows: [
            ["추천", "7일권 1인 €25.20 · WienMobil 앱에서 구매. 이름이 들어가는 기명식이라 탈 때 신분증(여권)을 지니고 다니세요."],
            ["공항 구간", "7일권은 빈 시내 구간만 됩니다. 공항 → Wien Hbf는 외곽 구간권 1인 €2.30을 함께 사세요. ÖBB Railjet/IC 직행 약 15분, 30분 간격."],
            ["왜 7일권", "11/28–12/1 동안 약 10번 탑니다(공항 → Hbf, U1, 트램 D · 1 등). 48 · 72시간권은 2026.1.1부로 없어졌습니다."],
            ["잘츠부르크", "11/30 ÖBB 기차표는 따로 삽니다(11/30 일정 참고)."]
          ],
          foot: "Wiener Linien 2026년 요금 기준. 유효 기간이 시작되는 시점은 앱에서 살 때 확인하세요."
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
          title: "비엔나 식사 · 미리 예약할 것",
          rows: [
            ["Plachutta Wollzeile", "11/29 저녁 17:30 · 2명 (온라인 예약 plachuttawollzeile.pide.at 또는 전화 +43 1 512 15 77)"],
            ["Ribs of Vienna", "11/28 저녁 17:45 · 2명 (ribsofvienna.at 'Table Booking' 온라인 예약 또는 전화 +43 1 513 85 19 · 10분 지나면 자동 취소) · 권장"],
            ["Figlmüller Bäckerstraße", "12/1 점심 12:00 · 2명 (공식 사이트 온라인 예약)"],
            ["Café Sacher", "11/29 10:00 · 2명 · 앉아서 먹기 (공식 사이트 온라인 예약 권장)"],
            ["Stiegl-Brauwelt (잘츠부르크)", "11/30 월 13:00 영어 양조장 투어 · 2명 · 1인 €22.90 (stiegl-shop.at 온라인 티켓 → 확인 PDF를 메일로 받음 · 문의 brauwelt@stiegl.at / +43 50 1492-1491) · 권장"],
            ["예약 없음", "소시지 가판 · 데멜(예약 불가) · 크리스마스 마켓 · Krah Krah · Casablanca(현금만) · Philosoph(11/29)"]
          ],
          foot: "가격은 2026년 10월 공식 메뉴 기준(일부 추정은 각 항목에 표시). 하루 식당 한 곳 + 간식으로 짰습니다."
        }
      ]
    },
    {
      date: "2026-11-29",
      title: "비엔나 셀프 가이드",
      city: "비엔나",
      blurb: "가이드 투어 대신 우리끼리 걷는 날. 오페라 → 카페 자허 → 호프부르크 → 그라벤 → 슈테판 대성당(13시 이후) → 트램 D → 벨베데레 상궁 → 숙소 → 플라후타 저녁 → 걸어서 베르무다 삼각지대 펍. 장소를 누르면 짧은 해설과 다음 장소 가는 길이 나와요. ⚠️ 일요일이라 상점은 거의 모두 휴무(쇼핑은 어제 11/28 오후와 12/1 오전). 내일 08:10 출발이니 펍은 21:30까지만. 금액은 1 EUR ≈ 1,484원.",
      guide: true,
      items: [
        {
          time: "09:45",
          placeId: "opernpassage",
          text: "출발 · 카를스플라츠 오페른파사주",
          note: "숙소 앞 Hauptbahnhof에서 U1(Leopoldau 방면) 2정거장(Taubstummengasse → Karlsplatz), 약 3분. 9:30쯤 숙소에서 나와요. 'Oper' 출구로 올라갑니다."
        },
        {
          time: "09:50",
          placeId: "staatsoper",
          text: "국립 오페라 극장 (외관)",
          note: "정면과 로지아만 보고 지나가요. 내부 투어는 생략."
        },
        {
          time: "10:00–10:50",
          placeId: "cafe-sacher",
          text: "카페 자허 · 앉아서 자허토르테 🍰 잡식맨 추천",
          note: "카페는 매일 07:00–23:00, 조식 07:00–11:00. 자허토르테를 앉아서 먹으려면 예약 권장. 영상 평: 토르테는 '혀 감각이 사라질 정도로 달다'. 속의 살구잼이 포인트이고, 달지 않은 생크림(Schlag)을 얹어 먹어야 맛있다고 했습니다. 멜랑주는 '그냥 커피', 인테리어는 '7성급'. 주문(2명): Sacher Sweet Treat 1개(토르테 + 따뜻한 음료 1잔 + 탄산수 0.33 l) €24.50 + 커피 1잔(Kaffee Verkehrt €7.50) = €32 (약 47,500원, 공식 메뉴). 한 조각만 나눠 먹으세요."
        },
        {
          time: "11:00",
          placeId: "albertina",
          text: "알베르티나 테라스 · 반전 기념비",
          note: "테라스(옛 성벽 위)는 무료로 올라갈 수 있어요. 미술관 입장은 생략(매일 10:00–18:00, 수·금 ~21:00). 광장 건너편에 흐르들리치카의 기념비가 있어요."
        },
        {
          time: "11:20",
          placeId: "hofburg",
          text: "호프부르크 · 요제프 광장 → 스위스 궁정 → In der Burg",
          note: "바깥 광장과 안뜰만 걸어요(무료). 시시 박물관·황제 아파트는 2026.11.19 재개관(성인 €20 · 약 29,700원) — 오늘은 들어가지 않아요. 원하면 헬덴 광장까지 한 번 내다보고 와요."
        },
        {
          time: "11:50",
          placeId: "hofreitschule",
          text: "스페인 승마학교 (미하엘러 문)",
          note: "입구와 돔 아래 원형 홀만 봐요. 공연·훈련 관람은 별도 예매라 이번 일정엔 넣지 않았어요."
        },
        {
          time: "12:00",
          placeId: "michaelerplatz",
          text: "미하엘러 광장 · 로마 유적 · 로스하우스",
          note: "광장 가운데 로마 시대 집터는 밖에서 무료로 볼 수 있어요. 미하엘 성당은 일요일 미사 시간엔 조용히."
        },
        {
          time: "12:10",
          placeId: "demel",
          text: "콜마르크트 · 데멜 쇼윈도",
          note: "어제 들른 데멜 앞을 지나며 쇼윈도만 구경. 일요일이라 명품 상점은 대부분 휴무."
        },
        {
          time: "12:25",
          placeId: "graben",
          text: "그라벤 · 페스트 기둥",
          note: "소시지는 대성당 다음, 트램 타러 가는 길의 Bitzinger 가판(알베르티나 광장)에서 먹어요. 그라벤에는 확인된 가판이 없어서 이렇게 짰어요."
        },
        {
          time: "12:35",
          placeId: "peterskirche",
          text: "성 페터 성당",
          note: "토·일 09:00–19:00, 무료. 일요일 미사 10:00 · 11:15 · 17:00 중에는 관람이 제한될 수 있어요(11:15 미사는 보통 12시쯤 끝나요)."
        },
        {
          time: "13:00–13:35",
          placeId: "stephansdom",
          text: "슈테판 대성당 내부",
          note: "⚠️ 일요일 관광객 관람은 13:00–16:30이라 13시 이후에 들어가요(공식). 입구 쪽 뒷부분은 무료, 본당 안쪽은 유료 — 가격은 현장 확인."
        },
        {
          time: "13:45",
          placeId: "bitzinger",
          text: "점심 · Bitzinger 소시지 가판 🍖 육식맨 추천",
          note: "매일 08:00–04:00(공식). 육식맨: '야 여기 진짜 맛있다'(2번 방문). 케제크라이너 1개를 나눠 먹어요. 서서 먹는 가판이라 15분이면 충분해요. 가격은 현장 확인."
        },
        {
          time: "14:00",
          placeId: "tram-oper",
          text: "트램 D → Schloss Belvedere",
          note: "D(Absberggasse 방면) 4정거장, 약 9분. 교통권을 미리 준비하세요. 대안: U1 Stephansplatz → Hauptbahnhof 후 걸어서 약 15분."
        },
        {
          time: "14:15–16:00",
          placeId: "belvedere",
          text: "벨베데레 상궁 · 미술관 가이드",
          note: "⚠️ 14:00–14:30 시간 지정 티켓을 미리 온라인으로 사 두세요. 성인 €23 (약 34,132원) × 2명 = €46 (약 68,264원). 매일 09:00–18:00. 시간 지정 티켓이 있으면 바로 입구로 갑니다. 현장 오디오 가이드 기기는 €5(약 7,400원), 한국어 포함 12개 언어. 아래 작품 안내를 보며 천천히 봐요."
        },
        {
          time: "16:00",
          placeId: "adina-vie",
          text: "숙소까지 걸어서 · 휴식",
          note: "상궁에서 숙소까지 약 830 m, 걸어서 약 11분. 저녁 전 1시간쯤 쉬어요."
        },
        {
          time: "17:30",
          placeId: "plachutta",
          text: "저녁 · Plachutta Wollzeile 타펠슈피츠 🍖 육식맨 추천",
          note: "숙소에서 U1 Stephansplatz → U3 Stubentor, 또는 Stephansplatz에서 걸어서 약 8분. 매일 11:30–23:30(공식). 영상은 히칭 본점이었지만, 같은 체인에서 같은 메뉴를 내고 도심이라 Wollzeile 지점으로 잡았습니다. 영상에서도 '많이 안 먹으려고' 1인분을 둘이 나눠 먹었습니다. 순서: 구리 냄비 수프 → 골수(빵에 발라서) → 고기 + 사과홀스래디시 · 차이브 소스 · 감자. 주문(2명): Tafelspitz 1인분 €36.90 + 음료 2잔(약 €10, 추정) ≈ €47 (약 70,000원). 접시 추가 요금이 있는지는 미확인. ⚠️ 예약 권장: plachuttawollzeile.pide.at 또는 +43 1 512 15 77."
        },
        {
          time: "19:15",
          placeId: "philosoph",
          text: "🍺 흥 나는 밤 · 베르무다 삼각지대 Philosoph 비어 바 (걸어서 10분)",
          note: "플라후타(Wollzeile 38)에서 Rotenturmstraße를 건너 Ruprechtsplatz 쪽 골목까지 걸어서 약 10분(약 760 m). 일요일이라 상점은 모두 닫았지만 펍 골목은 열려 있어요. Philosoph(Judengasse 11)는 오스트리아 맥주 · 크래프트 맥주와 하우스 맥주를 내는 록 음악 비어 바로, 일–목 17:00–02:00(공식). 주문(2명): 맥주 1–2잔씩, 약 €15–20 (2.2–3만 원, 가격 미확인 · 추정). 바로 옆 Seitenstettengasse 3의 Nelson's Pub(기네스 · 영국식 펍, 매일 17:00부터 · 공식)도 대안인데 일요일 마감 시각은 미확인(3자 자료 24:00). 어제 간 Krah Krah(일 ~23:00)와 Casablanca(일 17:00–02:00, 21:00 라이브)도 걸어서 2분이라 그쪽으로 가도 됩니다. Ruprechtsplatz의 King's Bar는 일요일 휴무."
        },
        {
          time: "21:30",
          placeId: "adina-vie",
          text: "숙소 복귀 (내일 08:10 출발)",
          note: "Schwedenplatz까지 걸어서 약 5분 → U1(Oberlaa 방면) Hauptbahnhof까지 약 7분(7일권). 내일 아침 08:28 잘츠부르크 기차라 일찍 자요."
        }
      ],
      notes: [
        {
          title: "⚠️ 출발 전에 할 일",
          rows: [
            ["투어 취소", "마이리얼트립 비엔나 투어는 앱에서 직접 취소 · 10/30(비엔나 현지 시각)까지 전액 환불. 이후 29–20일 전 10%, 19–6일 전 15%, 5–1일 전 20%, 당일 50% 차감"],
            ["벨베데레", "상궁 14:00–14:30 시간 지정 티켓 온라인 구매 · 성인 €23 (약 34,132원) × 2 = €46 (약 68,264원)"],
            ["카페 자허", "10:00 · 2명 착석 예약 권장"],
            ["플라후타", "17:30 · 2명 예약 (plachuttawollzeile.pide.at 또는 +43 1 512 15 77)"],
            ["11/30 잘츠부르크", "Stiegl-Brauwelt 13:00 영어 투어를 미리 예매 (ÖBB 기차표 RJX 262 · RJX 13483은 예매 완료 · 11/30 '오늘 비용' 참고)"]
          ],
          foot: "취소·예매는 직접 하세요. 이 앱에는 예약 번호를 적지 않습니다."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["카페 자허", "€32 (약 47,500원)"],
            ["벨베데레 상궁", "€46 (약 68,264원)"],
            ["플라후타", "≈ €47 (약 70,000원)"],
            ["베르무다 펍 (Philosoph)", "약 €15–20 (2.2–3만 원, 추정 · 가격 미확인)"],
            ["소시지 · 교통", "현장 확인"]
          ],
          foot: "가이드 투어(2명 118,000원 + 입장료)는 취소하므로 들지 않습니다."
        },
        {
          title: "추천 영화",
          rows: [["보고 가면 좋은 영화", "아마데우스 · 불멸의 연인 · 비포 선라이즈"]]
        }
      ]
    },
    {
      date: "2026-11-30",
      title: "잘츠부르크 당일치기 · 슈티글 양조장",
      city: "잘츠부르크",
      blurb: "투어 없이 기차로 다녀오는 잘츠부르크 하루(할슈타트 없음). 미라벨 정원 → 다리 → 게트라이데 거리(모차르트 생가는 밖에서만)를 오전에 걷고, 점심 뒤 버스로 Stiegl-Brauwelt에 가서 13:00 영어 양조장 투어(월요일이라 생산 라인이 돌아가는 모습을 봄, 맥주 3잔). 돌아와 15:45까지 요새에 올라 해 지는 모습을 보고, 크리스마스 마켓 → 묀히스베르크 엘리베이터로 구시가지 야경 → 아우구스티너 수도원 맥주홀에서 저녁 → 21:07 기차로 돌아옵니다. 기차 시간은 ÖBB Scotty 2026.11.30 기준입니다.",
      items: [
        {
          time: "08:10",
          placeId: "adina-vie",
          text: "숙소 출발 → Wien Hbf",
          note: "걸어서 5–10분. 08:15까지 역에 도착하면 여유 있습니다. 물·간식·보조배터리, 아우구스티너 저녁용 현금(유로, 2명 €40 정도)을 챙기세요. 아우구스티너는 카드를 받지 않습니다."
        },
        {
          time: "08:28",
          placeId: "wien-hbf",
          leg: true,
          text: "Wien Hbf 08:28 → Salzburg Hbf 10:53 (ÖBB RJX 262)",
          docId: "train-vie-sbg",
          note: "약 2시간 25분, 직행. ✅ 예매 완료(Sparschiene · 이 열차에만 탈 수 있고 변경 · 환불 불가). 2등석. 좌석 번호는 보관함(train-vie-sbg)에서 확인. Wien Hbf 3A-C 승강장(예약 확인서 기준, 당일 전광판 확인). 표는 문서함 PDF를 휴대폰에 띄워 보여 주면 됩니다(오스트리아에서는 PDF 표를 디지털로 인정). 🛂 여권 지참 — 표 검사 때 사진 신분증을 확인합니다."
        },
        {
          time: "10:53",
          placeId: "salzburg-hbf",
          text: "Salzburg Hbf 도착",
          note: "역 남쪽 출구로 나와 Rainerstraße를 따라 미라벨 정원까지 걸어서 약 15분(약 1 km). 역 안 담배 가게(Trafik)나 고객센터에서 시내버스 1회권 5장 묶음(€12.50, 1장 €2.50)을 사 두면 Stiegl 왕복(2명 × 2회)에 씁니다. 트롤리버스 안에서는 표를 팔지 않습니다(Salzburg Verkehr 2026)."
        },
        {
          time: "11:10",
          placeId: "mirabell",
          text: "미라벨 정원 (사운드 오브 뮤직)",
          note: "정원은 무료. 영화 '도레미' 장면의 페가수스 분수·계단이 있고, 정원 너머로 요새가 보입니다. 15분 정도만 보고 이동."
        },
        {
          time: "11:30",
          placeId: "feingold-steg",
          text: "Marko-Feingold-Steg (옛 Makartsteg) · 사랑의 자물쇠 다리",
          note: "미라벨 정원에서 걸어서 약 5분. 2021년에 Marko-Feingold-Steg로 이름이 바뀌었지만 흔히 Makartsteg라고 부릅니다. 다리를 건너면 바로 구시가지."
        },
        {
          time: "11:35",
          placeId: "getreidegasse",
          text: "게트라이데 거리",
          note: "다리에서 걸어서 약 3분. 철제 간판이 늘어선 쇼핑 거리."
        },
        {
          time: "11:45",
          placeId: "mozart-geburtshaus",
          text: "모차르트 생가 외관 (Getreidegasse 9 · 내부 관람 생략)",
          note: "게트라이데 거리 9번지의 노란 건물. 내부 관람(성인 €18)은 빼고 밖에서 사진만 찍어 2명 €36 (약 53,400원) 절약."
        },
        {
          time: "11:50",
          placeId: "getreidegasse",
          text: "가벼운 점심 · Sternbräu 케스노켄",
          note: "생가에서 걸어서 약 2분, Griesgasse 23. 핀츠가우 케스노켄(Pinzgauer Kasnockn, 치즈 뇨키 팬) 1개 + 수프 1개를 나눠 먹으면 비엔나에서 먹을 메뉴와 겹치지 않습니다. 가격은 미확인입니다(예전 메뉴는 케스노켄 €9.90 · 수프 €4.50이었고 지금은 더 비쌀 수 있음, 약 €20–25 · 3–3.7만 원 추정). 매일 영업이라는 정보도 3자 자료 기준. ⚠️ 12:30 버스를 타야 하니 앉자마자 주문하고, 계산도 미리 부탁하세요. 맥주는 양조장에서 마시니 여기선 물이나 음료로."
        },
        {
          time: "12:30",
          placeId: "stiegl-brauwelt",
          text: "버스 1 · 10번 → Bräuhausstraße (Stiegl-Brauwelt)",
          note: "Stiegl 공식 안내: 버스 1번과 10번이 'Bräuhausstraße' 정류장에 서고, 거기서 Bräuhausstraße를 따라 걸어서 약 5–10분. 구시가지에서 탈 정류장과 소요 시간(약 10–15분 추정)은 미확인이니 Salzburg Verkehr 앱 · ÖBB Scotty에서 'Bräuhausstraße'로 검색하세요. 1회권(5장 묶음 중 1장) 1명당 1장. 투어 10분 전(12:50)까지 안뜰의 Braushop 매표소에 도착해 확인 PDF(QR)를 보여 주고 티켓으로 바꿉니다."
        },
        {
          time: "13:00",
          placeId: "stiegl-brauwelt",
          text: "🍺 Stiegl-Brauwelt 영어 양조장 투어 (13:00–15:00)",
          note: "매일 10:30 · 13:00(영어) · 15:30, 약 2시간. 270° 스티글 영화관 → 맥주 박물관 → 하우스 브루어리 → 생산 시설(최신 양조실 · 시간당 9만 병 병입 라인). 생산 라인은 월–목에만 돌아가서 월요일인 오늘은 실제로 움직이는 모습을 봅니다(금–일은 멈춘 상태로 견학). 맥주 3종 시음 + Braushop 작은 선물 포함. 성인 1인 €22.90, 2명 €45.80 (약 68,000원) — Stiegl 온라인숍 · 독일어 공식 페이지 2026 기준(영어 페이지에는 예전 가격 €21.90이 남아 있음). 예매: stiegl-shop.at 'Stiegl-Brauwelt' 티켓. 계단이 있어 휠체어 불가. 박물관 10:00–18:00, Braushop 10:00–19:00 매일(공식)."
        },
        {
          time: "15:05",
          placeId: "salzburg-dom",
          text: "버스로 구시가지 복귀 → 대성당 앞 지나 FestungsBahn",
          note: "Bräuhausstraße에서 버스 1 · 10번으로 구시가지 쪽으로(정류장 · 소요 시간은 앱에서 확인, 미확인), 내려서 대성당 · 레지덴츠 광장을 지나 FestungsBahn 승강장(Festungsgasse 4)까지 걸어갑니다. 대성당 앞 Domplatz와 옆 Residenzplatz가 저녁 크리스마스 마켓 자리입니다. 늦어도 15:45–16:00에는 승강장에 도착해야 합니다."
        },
        {
          time: "15:45",
          placeId: "hohensalzburg",
          text: "호엔잘츠부르크 성 (FestungsBahn 산악열차)",
          note: "Basic 티켓(산악열차 왕복 포함) 성인 €15.50, 2명 €31 (약 46,000원). 10–12월 09:30–17:00이고 ⚠️ 표는 문 닫기 1시간 전(16:00)까지만 팝니다(공식 사이트, 2026). 투어가 늦게 끝나 16:00을 넘기면 요새는 건너뛰고 대성당 · 마켓을 먼저 보세요. 16:20쯤 해 지는 모습을 요새 위에서 보고 내려옵니다."
        },
        {
          time: "17:00",
          placeId: "salzburg",
          text: "잘츠부르크 크리스마스 마켓 (Domplatz · Residenzplatz)",
          note: "2026.11.19–2027.1.1, 월–목 10:00–20:30, 무료(공식 사이트). 해가 진 뒤라 조명이 켜져 있습니다. 저녁은 아우구스티너에서 먹으니 여기선 뱅쇼 1잔 · 간식 조금만. 18:00에 마켓을 나와 게트라이데 거리 서쪽 끝 Anton-Neumayr-Platz로 걸어갑니다(약 700 m, 10분). 사람이 많으니 소매치기 주의."
        },
        {
          time: "18:10",
          placeId: "moenchsberg-aufzug",
          text: "🌃 묀히스베르크 엘리베이터 · 구시가지 야경 (MönchsbergAufzug)",
          note: "Anton-Neumayr-Platz에서 30초 만에 절벽 위 Museum der Moderne 앞 전망 테라스로 올라가 불 켜진 구시가지 지붕 · 대성당 · 조명 켜진 요새를 내려다봅니다. ⚠️ 월요일은 08:00–19:00만 운행(화–일 08:00–21:00)이라 18:40까지는 다시 타고 내려오세요(공식 5schaetze.at, 2026). 왕복 성인 €4.80, 2명 €9.60 (약 14,200원). 박물관은 들어가지 않습니다. 비가 오거나 늦어지면 건너뛰고, 대신 Staatsbrücke나 Mozartsteg 다리 위에서 잘자흐 강 건너 구시가지 야경을 보세요(무료)."
        },
        {
          time: "18:55",
          placeId: "augustiner-muelln",
          text: "🍺 저녁 · Augustiner Bräustübl Mülln 수도원 맥주홀 (18:55–20:30)",
          note: "엘리베이터 아래에서 Gstättengasse를 따라 걸어서 약 15분(약 1.1 km). 1621년 아우구스티누스회 수도사들이 세운 양조장의 맥주홀로, 오스트리아에서 가장 큰 비어홀입니다. 맥주는 한 종류뿐이고 나무 통에서 바로 돌 맥주잔(Steinkrug)에 따라 줍니다(공식). 셀프 방식: 선반에서 잔을 골라 물에 헹군 뒤 계산대에서 0.5 l(Halbe)나 1 l를 계산하고 잔을 내밀면 받습니다. 음식은 홀 안 시장 골목 같은 '슈만커 골목(Schmankerlgang)'의 가게에서 골라 사 와서 먹습니다(공식): Müllner Grillerei(통닭구이 Grillhendl, 치즈 크뇌델), Pavlovic(돼지갈비 Ripperl, 학세 Stelze, 레버케제), Schleicher(레버케제, 소시지), Atanassoff(맥주 안주용 무 Radi), Kammeringer(치즈 · 스프레드), Raha 빵집(맥주 빵 Bierspitz, 프레첼). 소식하는 2명 주문 예: 맥주 0.5 l 2잔 + 통닭 반 마리 + 무(Radi) 1개 + 프레첼 · Bierspitz 1개 ≈ €25–35 (약 3.7–5.2만 원). 가격은 공식 자료가 없어 미확인이고(3자 자료: 맥주 0.5 l 약 €3.90–6, 음식 1개 약 €2–12), 가게별 메뉴 구성도 그날 다를 수 있습니다. 월–금 15:00–23:00(공식). ⚠️ 현금만(공식). 20:30에는 일어나세요."
        },
        {
          time: "20:30",
          placeId: "augustiner-muelln",
          text: "아우구스티너 → Salzburg Hbf (걸어서 약 25분)",
          note: "역까지 걸어서 약 1.8 km, 약 25분이라 20:55쯤 역에 닿습니다. 다리가 아프면 근처 S-Bahn Mülln-Altstadt 역에서 S3 20:40 → Hbf 20:43(ÖBB Scotty 2026.11.30 기준, 3분)을 타도 됩니다. 이 구간에 쓸 표는 미확인이니 ÖBB 앱에서 확인하세요."
        },
        {
          time: "21:07",
          placeId: "salzburg-hbf",
          leg: true,
          text: "Salzburg Hbf 21:07 → Wien Hbf 23:32 (ÖBB RJX 13483)",
          docId: "train-vie-sbg",
          note: "약 2시간 25분, 갈아타지 않는 직행(ÖBB Scotty 2026.11.30 조회: Salzburg 4번 승강장 → Wien Hbf 9A-B). ✅ 예매 완료. 이 편은 좌석 예약이 없으니 예약 표시가 없는 빈자리에 앉으세요. 좌석 번호는 보관함(train-vie-sbg)에서 확인. 표는 문서함 PDF, 🛂 여권 지참. 열차 지정 Sparschiene는 환불 · 취소가 안 되고 이 열차에만 탈 수 있어, 놓치면 표를 새로 사야 합니다. 20:55까지 승강장에 도착하세요. 정말 놓쳤을 때 마지막 직행은 22:07 RJX 367 → Wien Hbf 00:35(새 표 필요)."
        },
        {
          time: "23:32",
          placeId: "wien-hbf",
          text: "Wien Hbf 도착 → 숙소",
          note: "걸어서 5–10분, 23:45쯤 숙소. 내일(12/1)은 체크아웃 · 부다페스트 이동일이니 짐은 오늘 아침이나 11/29 밤에 미리 싸 두고 바로 쉬세요."
        }
      ],
      notes: [
        {
          title: "잘츠부르크 기차",
          docId: "train-vie-sbg",
          rows: [
            ["가는 편", "Wien Hbf 08:28 → Salzburg Hbf 10:53 (RJX 262)"],
            ["좌석", "좌석 번호는 보관함(train-vie-sbg)에서 확인 · 2등석 · 오는 편은 좌석 예약 없음"],
            ["오는 편", "Salzburg Hbf 21:07 → Wien Hbf 23:32 (RJX 13483, 직행)"],
            ["놓쳤을 때", "마지막 직행 22:07 RJX 367 → Wien Hbf 00:35 (Sparschiene는 열차 지정이라 새 표 필요)"],
            ["표", "✅ 예매 완료 · ÖBB Sparschiene 2명: 가는 편 €24.90 × 2 + 오는 편 €19.90 × 2 + 좌석 예약 €6 = €95.60 (약 141,900원)"],
            ["조건", "Sparschiene는 열차 지정 · 변경 · 환불 불가. 표는 문서함 '잘츠부르크 왕복 기차표' PDF를 휴대폰으로 보여 주면 됩니다(오스트리아에서는 PDF 디지털 표 인정)."],
            ["신분증", "여권 지참 (표 검사 때 사진 신분증 확인)"],
            ["현지 이동", "구시가지는 걸어서. Stiegl-Brauwelt만 버스 1 · 10번(1회권 5장 묶음 €12.50). 요새 산악열차는 요새 티켓에 포함. 묀히스베르크 엘리베이터는 따로(왕복 €4.80, 월요일 19:00까지)."]
          ],
          foot: "시간 · 요금은 ÖBB 예약 확인서 기준. 좌석 번호는 보관함(train-vie-sbg)에서 확인."
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["기차 왕복 (결제 완료)", "€95.60 (약 141,900원) · 좌석 예약 €6 포함"],
            ["Stiegl-Brauwelt 투어", "€45.80 (약 68,000원) · 맥주 3잔 포함"],
            ["호엔잘츠부르크 Basic", "€31 (약 46,000원)"],
            ["시내버스", "1회권 5장 묶음 €12.50 (약 18,600원) · 4장 사용"],
            ["묀히스베르크 엘리베이터", "왕복 €9.60 (약 14,200원)"],
            ["점심 Sternbräu", "약 €20–25 (약 3–3.7만 원, 추정)"],
            ["아우구스티너 저녁", "약 €25–35 (약 3.7–5.2만 원, 추정 · 현금만, 가격 미확인)"],
            ["마켓", "뱅쇼 · 간식 현장 확인"],
            ["합계(정해진 것)", "€194.50 (약 288,600원) + 점심 · 저녁 · 간식"]
          ],
          foot: "모차르트 생가 내부(2명 €36, 약 53,400원)는 빼고 외관만 봅니다. 환율 1 EUR ≈ 1,484원."
        }
      ]
    },
    {
      date: "2026-12-01",
      title: "비엔나 → 부다페스트",
      city: "기차",
      items: [
        {
          time: "08:30",
          placeId: "adina-vie",
          text: "체크아웃 · 짐 맡기기",
          note: "체크아웃 11:00. 미리 체크아웃하고 리셉션에 짐을 맡긴 뒤 가볍게 나갑니다. 전날 잘츠부르크에서 23:45쯤 돌아오니 늦잠을 자고, 상점이 여는 10:00에 맞춰 09:45쯤 나오세요. 12:00 Figlmüller 점심만 지키면 됩니다."
        },
        {
          time: "10:00",
          placeId: "kaerntner-strasse",
          text: "🛍️ 쇼핑 · 케른트너 거리 → 그라벤 → 콜마르크트 (10:00–11:50)",
          note: "숙소 앞 Hauptbahnhof에서 U1 → Stephansplatz(약 5분). 화요일이라 상점이 모두 열어요. 케른트너 거리의 STEFFL 백화점(월–금 10:00–20:00, 공식)부터 보고, 그라벤 → 콜마르크트(명품 거리) → 다시 그라벤 쪽으로 돌아옵니다. 다른 가게 영업시간은 가게마다 달라요(현장 확인). 오스트리아가 마지막 쇼핑 기회입니다(부다페스트에서는 12/3 · 12/4). 💶 택스 리펀드는 한 영수증 €75.01 이상(공식), 여권 지참, 12/5 부다페스트 공항 출국 때 세관 확인. 짐이 늘어도 숙소에 들렀다 기차를 타니 괜찮아요. 11:50에 STEFFL에서 Figlmüller까지 걸어서 약 7분."
        },
        {
          time: "12:00",
          placeId: "figlmueller",
          text: "점심 · Figlmüller 슈니첼 🍖 육식맨 추천",
          note: "Stephansplatz에서 걸어서 약 3분. 매일 11:30–23:30(3자 자료 기준, 미확인). 영상 평: 돼지 슈니첼이 송아지보다 '더 촉촉하다'고 했고, TasteAtlas '전설적인 식당' 1위. 접시보다 큰 슈니첼이라 둘이 1장이면 충분합니다. 주문(2명): Figlmüller-Schnitzel(돼지) 1장 €21.90 + 감자 · 콘샐러드(Erdäpfel-Vogerlsalat, 가격 미표기라 약 €7로 추정) + 링곤베리 잼 €2.90 + 음료 2잔(약 €10, 추정) ≈ €42 (약 62,000원). ⚠️ 예약 권장(공식 사이트). 13:45쯤 U1 Stephansplatz → Hauptbahnhof(약 5분) → 숙소에서 짐 찾기."
        },
        {
          time: "15:40",
          placeId: "wien-hbf",
          leg: true,
          text: "Wien Hbf (기차 출발)",
          note: "14:30쯤 숙소에서 짐을 찾아 15:15까지 플랫폼으로. 숙소에서 역까지 걸어서 몇 분."
        },
        {
          time: "18:29",
          placeId: "keleti",
          text: "Budapest Keleti (기차 도착)",
          note: "짐이 있으니 Bolt/택시를 추천합니다(숙소까지 약 10–15분). 대중교통은 Keleti에 M3가 없어서 M2로 Deák Ferenc tér, 또는 M4로 Kálvin tér까지 간 뒤 M3로 갈아타고 Lehel tér에서 내립니다. 대중교통이면 단일권(vonaljegy 1인 500 HUF, 메트로끼리는 같은 방향으로 한 번 갈아탈 수 있음)을 씁니다. 부다페스트에서는 72시간권 대신 단일권 · 10장 묶음권을 추천해요(12/2 '부다페스트 팁' 참고)."
        },
        {
          time: "19:00",
          placeId: "adina-bud",
          text: "숙소 체크인 · 짐 풀기",
          note: "Keleti에서 Bolt로 약 10–15분(요금은 앱에서 확인, 미확인). 체크인 15:00부터, 체크아웃 11:00, 리셉션 24시간, 짐 보관 가능(호텔 공식 페이지 기준). 너무 피곤하면 아래 저녁 외출 대신 근처 마트에서 맥주와 간식을 사 와서 쉬어도 됩니다(객실에 주방 있음). 🛍️ 쇼핑몰 대안: Nyugati 역 옆 WestEnd City Center(Váci út 1–3, M3 한 정거장)는 상점 월–토 10:00–20:00 · 일 10:00–18:00, 건물은 매일 08:00–22:00(공식)이라 오늘은 상점이 20:00에 닫아 짧게만 가능해요."
        },
        {
          time: "19:40",
          placeId: "basilica",
          text: "M3 Lehel tér → Arany János utca · Advent Bazilika 마켓 저녁",
          note: "숙소에서 Lehel tér까지 걸어서 약 5분, M3(Kőbánya-Kispest 방면) 2정거장 약 4분, Arany János utca에서 성당 광장까지 걸어서 약 4분(단일권 1인 500 HUF). Advent Bazilika는 2026.11.13–2027.1.1, 월–목 · 일 11:00–22:00, 금 · 토 11:00–23:00(공식). 매일 17:30부터 성당 파사드에 라이트 페인팅을 쏘고(공식), 저녁 내내 약 30분마다 다시 튼다는 3자 자료가 있어 19:50쯤 도착해도 볼 수 있을 거예요(반복 간격 미확인). 파사드 전체는 계단 앞보다 광장 건너편 Zrínyi utca 쪽에서 잘 보입니다. ⚠️ 예전에 트리를 둘러싸던 아이스링크는 2024년부터 무대로 바뀌어 지금은 없습니다(3자 자료). 가벼운 저녁(2명): 랑고시 1개 나눠 먹기 + 뱅쇼(forralt bor) 2잔 ≈ 5,500–7,500 HUF (약 2.2–3만 원, 추정 · 3자 자료로 지난 시즌 뱅쇼 3 dl 1,500 HUF). 굴뚝빵(kürtőskalács)은 12/2 뵈뢰슈마르티 마켓에서도 먹으니 선택. 컵 보증금이 있을 수 있어요. 12/4에 프로젝션 쇼를 다시 보니 오늘은 분위기만."
        },
        {
          time: "21:00",
          placeId: "lanchid",
          text: "다뉴브 강변 야경 산책 → 체인 브리지 앞",
          note: "성당 광장에서 Zrínyi utca를 따라 서쪽으로 걸어 강변(Széchenyi István tér)까지 약 12분(약 900 m). 불 켜진 부다 왕궁과 체인 브리지를 보고, 다리 위는 12/2에 걸으니 오늘은 입구까지만. 강바람이 차니 모자와 장갑. 21:35쯤 성당 쪽으로 돌아갑니다(약 11분)."
        },
        {
          time: "21:45",
          placeId: "divino-bazilika",
          text: "(선택) 🍷 DiVino Bazilika 와인 한 잔",
          note: "성당 광장 바로 옆(Szent István tér 3). 젊은 헝가리 와인 양조가들의 와인을 잔으로 파는 와인 바, 월–수 · 일 12:00–24:00, 목–토 12:00–02:00(공식). 주문(2명): 헝가리 와인 1잔씩, 약 4,000–5,000 HUF (약 1.6–2만 원, 가격 미확인 · 추정). 22:30쯤 나와 Arany János utca에서 M3 → Lehel tér(약 4분, 단일권)로 숙소에 갑니다. 내일은 08:30 레헬 시장 아침이니 너무 늦지 않게."
        }
      ],
      notes: [
        {
          title: "기차표",
          rows: [
            ["출발", "Wien Hbf 15:40"],
            ["도착", "Budapest Keleti 18:29"],
            ["좌석", "Wagen 24 / 102·108"]
          ],
          foot: "예약 확인서는 개인 보관"
        },
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["Figlmüller 점심", "≈ €42 (약 62,000원)"],
            ["대성당 마켓 저녁", "약 5,500–7,500 HUF (2.2–3만 원, 추정)"],
            ["(선택) DiVino 와인", "약 4,000–5,000 HUF (1.6–2만 원, 추정 · 가격 미확인)"],
            ["M3 단일권", "4장 2,000 HUF (약 8,100원)"],
            ["Keleti → 숙소 Bolt", "앱에서 확인 (미확인)"],
            ["쇼핑", "11/27 '여행 경비'의 쇼핑 예비비에서"]
          ],
          foot: "쇤브룬은 빼고 도심 쇼핑으로 바꿨습니다(쇤브룬은 입장료를 넣지 않았던 선택 일정). 환율 1 EUR ≈ 1,484원 · 1 HUF ≈ 4.05원."
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
          note: "어부의 요새에서 성 언덕 골목길(Tárnok utca · Úri utca)을 따라 남쪽으로 천천히 걸어 왕궁까지(바로 가면 약 15분). 왕궁 안뜰과 테라스는 자유롭게 걸을 수 있고, 테라스에서 다뉴브와 페스트 쪽 전망을 봅니다. 점심 예약이 13:15라 시간이 넉넉하니 벤치에서 쉬거나 사진을 찍으며 머무르세요. 12:55쯤 서쪽 기슭(Attila út)으로 내려가면 Stand25까지 도보 약 10–15분."
        },
        {
          time: "13:15",
          placeId: "stand25",
          text: "점심 · Stand25 Bisztró 🎬 영상 추천",
          note: "영상에서 먹은 것은 구야시 수프, 메기 파프리카시(harcsapaprikás), 사슴 스테이크, 쇼믈로이 갈루슈카(Somlói galuska), 토카이 와인과 팔린카입니다. 메뉴가 계절마다 바뀌니 일부는 없을 수 있지만, 구야시와 쇼믈로이는 대표 메뉴입니다. 미쉐린 빕구르망. 주문(2명): 구야시 5,900 + 메기 파프리카시(juhtúrós sztrapacska 곁들임) 9,900 + 쇼믈로이 4,900 = 20,700 HUF (약 84,000원) + 서비스 차지(비율 미확인, 10–15%면 약 9.2–9.6만 원). 구야시는 이번 여행에서 여기서만 먹습니다. (2026 메뉴 PDF 기준) 점심은 월–토 12:00–16:00(마지막 입장 14:30), 일요일 휴무. 서비스 차지가 붙습니다. ⚠️ 예약 필수: 전화(+36 30 961 3262) 또는 홈페이지의 SevenRooms."
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
          title: "미리 예약할 것",
          rows: [
            ["Stand25", "12/2 점심 13:15 (전화 / SevenRooms) · 필수"],
            ["Comme Chez Soi", "12/3 점심 13:00 (이메일 commechezsoi@gmail.com 또는 전화 +36 1 318 3943) · 필수, 10테이블 정도로 작음 · 현금만 받는다는 후기(미확인)"],
            ["Negro Mangalica", "12/3 저녁 17:30 (reservours.com/negromangalica 또는 전화 +36 20 244 4733) · 권장"],
            ["Parasztkonyha", "12/4 저녁 18:30 · Október 6. utca 지점 (booking@parasztkonyha.com / +36 70 596 7087) · 권장"],
            ["Sauska 와인셀러 (Budafok)", "12/4 금 14:00 영어 셀러 투어 · 2명 · 이메일 visitbudapest@sauska.hu (또는 budapest@sauska.hu / +36 20 467 6514) · 필수. 공개 일정에 없는 시간이라 미리 요청해야 합니다. 일반 투어 1인 10,500 HUF(60분 · 스파클링 3잔) 기준이고, 14:00 개별 투어 가격은 회신으로 확인(미확인). 공개 투어는 주로 17:30이라, 14:00이 안 되면 대안(Törley)을 쓰세요"],
            ["대안 · Törley 박물관 (Budafok)", "평일 10:00–16:00(마지막 입장) · 사전 예약만 · 1–7명 그룹 투어 50,000 HUF + 영어 가이드 15,000 HUF = 65,000 HUF (약 263,000원) · 이메일 muzeum@torley.hu · 트램 47 Leányka utca 하차, Anna utca 7"],
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
      blurb: "남쪽 중앙시장에서 랑고시로 시작해 트램 2를 타고 다뉴브를 따라 국회의사당까지 올라가 외관과 코슈트 광장, 강변의 신발 추모비를 무료로 봅니다. 대성당 마켓에서 점심을 먹고 트램 47로 부다 남쪽 Budafok의 옛 와인 저장고 거리에 가서 Sauska 스파클링 와인 셀러를 걷고 3잔 시음, 돌아와 바치 거리 · 뵈뢰슈마르티 광장에서 마지막 쇼핑 → 프로젝션 쇼 → 바로 옆 Parasztkonyha에서 마지막 헝가리 가정식 → 국회의사당 강변 야경 산책 → (선택) 금요일 밤 재즈 클럽 iF Jazz Café 라이브로 마무리합니다. 내일 07:45 출발이라 22:30에는 숙소로 갑니다.",
      items: [
        {
          time: "08:30",
          placeId: "great-market",
          text: "중앙시장 · 랑고시 아침 🎬 영상 추천",
          note: "M3 Lehel tér → Kálvin tér 직행(약 10분), 내려서 도보 5분. 월–금 06:00–18:00, 공휴일 휴무. 랑고시는 2층 갤러리에 있습니다. ⚠️ 영상에서는 토핑을 전부 '예스' 했다가 약 10만 원이 나왔습니다. 주문 전에 가격표와 토핑별 가격을 확인하고, 기본(사워크림 + 치즈)부터 시작하세요. 주문(2명): 사워크림 + 치즈 랑고시 1개 나눠 먹기(약 2,000–3,000 HUF · 8,000–12,000원, 추정). 12/1 대성당 마켓에서 랑고시를 먹었다면 여기선 다른 토핑으로 비교해 보세요. ⚠️ 붐비는 곳이니 소매치기 주의."
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
          placeId: "sauska-budafok",
          text: "트램 47 · Deák Ferenc tér → Budafok, Városház tér",
          note: "대성당에서 Deák Ferenc tér 지상 트램 정류장(Károly körút)까지 걸어서 약 5분. 47번 Budafok, Városház tér 방면을 종점까지 약 32분(위키백과 · BKK 시간표 기준), 내려서 Nagytétényi út를 따라 남쪽으로 걸어서 약 12분(약 1 km). 단일권 1인 500 HUF. Sauska 공식 안내도 '47번 Deák tér → Városház tér'입니다."
        },
        {
          time: "14:00",
          placeId: "sauska-budafok",
          text: "🥂 Sauska 스파클링 와인 셀러 투어 (14:00–15:30)",
          note: "Budafok 역사 저장고(약 400 m 구간)를 2015년에 사들여 만든 전통 방식(méthode traditionnelle) 스파클링 와인 셀러. 미로 같은 지하 통로와 '비밀의 방' 설치 작품을 지나며 토카이 · Budafok 이야기를 듣고 시음합니다. 공식 정보: 사전 예약으로만 방문 가능, 일반 투어 60분 · 스파클링 3잔 · 1인 10,500 HUF(2명 21,000 HUF · 약 85,000원). 지하는 13 °C라 겉옷과 편한 신발. 공개 일정의 영어 투어는 17:30(예: 2026.10.29 · 10.30)이라, 금요일 14:00은 이메일(visitbudapest@sauska.hu)로 따로 요청해야 하고 가격 · 가능 여부는 미확인입니다. 안 되면 Törley 박물관(12/2 '미리 예약할 것' 참고)으로 바꾸세요. 18세 미만 시음 불가."
        },
        {
          time: "15:45",
          placeId: "basilica",
          text: "트램 47 · Városház tér → Deák Ferenc tér (16:15쯤 도착)",
          note: "셀러에서 Városház tér까지 걸어서 약 12분, 트램 약 32분(단일권). Deák Ferenc tér에서 바로 바치 거리 쇼핑으로 갑니다."
        },
        {
          time: "16:20",
          placeId: "vaci-utca",
          text: "🛍️ 쇼핑 · 바치 거리 → 뵈뢰슈마르티 광장 마켓 (17:15까지)",
          note: "Deák Ferenc tér에서 걸어서 약 6분. 부다페스트 대표 보행자 쇼핑 거리로, Váci utca 6 Zara와 H&M 같은 체인점은 금요일 21:00까지 연다는 3자 자료가 있지만 가게마다 다릅니다(미확인). 거리 북쪽 끝 뵈뢰슈마르티 광장 크리스마스 마켓(금 11:00–22:00, 공식)에서 헝가리 공예품 · 파프리카 · 토카이 와인 같은 선물을 사기 좋아요. 💶 헝가리 택스 리펀드는 한 번에 68,000 HUF(€175) 넘게 살 때만(NAV 2026 공식) · 여권 지참 · 12/5 공항 세관 확인. 17:15에 대성당으로 걸어서 약 10분. 짐은 저녁 전에 미리 싸 두세요."
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
          note: "대성당에서 걸어서 약 5분. Váci utca에도 지점이 있으니 Október 6. utca 3으로 가세요. 월–목 17:00–23:00, 금–일 12:00–23:00(공식). 영상 평: 레초(lecsó), 구야시, 소고기 푀르켈트 모두 훌륭하고 양이 많다. 구야시는 12/2에 먹었으니 빼고 주문(2명): 레초 4,990 + 소고기 푀르켈트(marhapörkölt, 달걀 넣은 헝가리식 수제비 곁들임) 7,790 + 군델 팔러친타(호두 크레페 · 초콜릿 소스) 3,990 + 와인 1.5 dl 2잔(약 4,880) ≈ 21,650 HUF (약 88,000원). 2026/05 공식 메뉴, VAT 포함, 서비스 차지는 미확인. 예약 권장: booking@parasztkonyha.com / +36 70 596 7087."
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
          note: "Kálvin tér에서 M3(Újpest-központ 방면)를 타면 Lehel tér까지 갈아타지 않고 약 10분(단일권). 재즈 클럽을 건너뛰면 Kossuth Lajos tér에서 숙소까지 걸어서 약 20분(약 1.6 km), 또는 Bolt로 21:30쯤 복귀. 짐은 저녁 먹으러 나가기 전에 미리 싸 두면 편해요."
        }
      ],
      notes: [
        {
          title: "오늘 비용 (2명)",
          rows: [
            ["랑고시 아침", "약 2,000–3,000 HUF (8,000–12,000원, 추정)"],
            ["마켓 점심", "약 5,000–8,000 HUF (2–3.2만 원, 추정)"],
            ["Sauska 셀러 투어", "21,000 HUF (약 85,000원) · 일반 투어 가격 기준, 14:00 개별 투어 가격은 미확인"],
            ["트램 47 왕복", "단일권 4장 2,000 HUF (약 8,100원)"],
            ["Parasztkonyha 저녁", "약 21,650 HUF (약 88,000원)"],
            ["(선택) iF Jazz Café", "약 4,000–6,000 HUF + 커버 차지(미확인)"],
            ["바치 거리 쇼핑", "11/27 '여행 경비'의 쇼핑 예비비에서"]
          ],
          foot: "Sauska가 안 되면 Törley 대안은 2명 65,000 HUF (약 263,000원). 환율 1 HUF ≈ 4.05원."
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
