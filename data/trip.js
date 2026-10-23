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
      "12/5 11:30 부다페스트(BUD) T2A → 12/6 05:25 상하이 푸동(PVG) (MU8640 / FM870 공동운항)",
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
    schoenbrunn: {
      name: "Schönbrunn Palace",
      city: "비엔나",
      lat: 48.1848,
      lng: 16.3122,
      station: "Schönbrunn",
      lines: "U4",
      photo: "assets/img/schoenbrunn.webp",
      credit: {
        author: "Jebulon",
        license: "CC0",
        url: "https://commons.wikimedia.org/wiki/File:Fa%C3%A7ade_Sch%C3%B6nbrunn_Jardins_horloge.jpg",
        title: "Façade Schönbrunn"
      }
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
    "hospital-rock": {
      name: "Hospital in the Rock (Sziklakórház)",
      city: "부다페스트",
      address: "Lovas út 4/c",
      lat: 47.501,
      lng: 19.0315,
      station: "Széll Kálmán tér",
      lines: "M2 · 버스 16 (Bécsi kapu tér)",
      photo: "assets/img/hospital-rock.webp",
      credit: {
        author: "Globetrotter19",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Budapest._I._Lovas_%C3%BAt._4.-_Hospital_in_the_Rock_-_Secret_Military_Hospital_and_Nuclear_Bunker.JPG",
        title: "Hospital in the Rock – Lovas út 4"
      }
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
      name: "부다페스트(BUD) T2A",
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
            ["오는 편", "12/5 11:30 부다페스트(BUD) T2A → 12/6 05:25 상하이 푸동(PVG) (MU8640 / FM870 공동운항)\n12/6 08:40 푸동(PVG) → 11:55 인천(ICN) (MU5041)"],
            ["수하물", "위탁 수하물 1인 2개, 각 세 변의 합 158cm 이내"]
          ],
          foot: "예약 확인서는 개인 보관"
        }
      ]
    },
    {
      date: "2026-11-28",
      title: "도착 · 마트 · 크리스마스 마켓",
      city: "비엔나",
      blurb: "밤 비행 직후라 무리하지 않는 날. 숙소 체크인은 15:00라 짐부터 맡깁니다. 내일(일요일)은 마트 대부분이 쉬니 장보기는 오늘. 오늘은 식당 대신 간식(소시지 · 카이저슈마렌 · 마켓)으로 가볍게. 🍖 육식맨 추천 / 🍰 잡식맨 추천 = 유튜브 육식맨·잡식맨 영상에 나온 곳. 금액은 2명 기준, 1 EUR ≈ 1,484원 · 1 HUF ≈ 4.05원으로 계산했습니다.",
      items: [
        {
          time: "06:00",
          placeId: "vie",
          text: "비엔나 공항 도착 → Wien Hbf",
          note: "ÖBB Railjet/IC로 Wien Hbf까지 약 15분, 공항 출발 06:33부터 30분 간격(1인 €5.50). 2026.9–2027.10 공사로 S7은 St. Marx까지만 가니 Railjet이나 REX7을 타세요."
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
          time: "17:30~",
          placeId: "rathaus",
          text: "시청사 크리스마스 마켓 · 가벼운 저녁",
          note: "2026.11.13–12.26 매일 10:00–22:00. 16시쯤 해가 지면 조명이 켜집니다. 데멜에서 걸어서 약 12분, 돌아올 땐 Rathausplatz/Burgtheater에서 트램 D 한 번에 숙소. 펀치나 뱅쇼 2잔 + 간식 1–2개로 저녁(마켓 가격은 현장 확인, 약 €20–25 · 3–3.7만 원 추정). 머그 보증금(Häferlpfand)은 컵을 돌려주면 돌려받습니다."
        }
      ],
      notes: [
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
            ["Figlmüller Bäckerstraße", "12/1 점심 12:00 · 2명 (공식 사이트 온라인 예약)"],
            ["Café Sacher", "11/29 투어 시작 장소. 앉아서 먹는 게 투어에 포함되는지 가이드에게 확인하고, 아니면 온라인 예약"],
            ["예약 없음", "소시지 가판 · 데멜(예약 불가) · 크리스마스 마켓"]
          ],
          foot: "가격은 2026년 10월 공식 메뉴 기준(일부 추정은 각 항목에 표시). 하루 식당 한 곳 + 간식으로 짰습니다."
        }
      ]
    },
    {
      date: "2026-11-29",
      title: "비엔나 투어",
      city: "비엔나",
      blurb: "이정은의 로맨틱 비엔나 투어(마이리얼트립) 10:00–14:00. 아래 순서는 받은 일정표 순서이며, 실제 동선은 가이드 안내를 따릅니다. 일요일이라 상점은 대부분 휴무.",
      items: [
        {
          time: "10:00",
          placeId: "cafe-sacher",
          text: "투어 시작 · 카페 자허 🍰 잡식맨 추천",
          note: "카페는 매일 07:00–23:00, 조식 07:00–11:00. 자허토르테를 앉아서 먹으려면 예약 권장. 미팅 장소·시간은 투어 확인서 기준. 영상 평: 토르테는 '혀 감각이 사라질 정도로 달다'. 속의 살구잼이 포인트이고, 달지 않은 생크림(Schlag)을 얹어 먹어야 맛있다고 했습니다. 멜랑주는 '그냥 커피', 인테리어는 '7성급'. 주문(2명): Sacher Sweet Treat 1개(토르테 + 따뜻한 음료 1잔 + 탄산수 0.33 l) €24.50 + 커피 1잔(Kaffee Verkehrt €7.50) = €32 (약 47,500원, 공식 메뉴). 한 조각만 나눠 먹으세요."
        },
        {
          placeId: "albertina",
          text: "알베르티나 미술관",
          note: "매일 10:00–18:00 (수·금 ~21:00)."
        },
        {
          placeId: "hofburg",
          text: "호프부르크 왕궁",
          note: "시시 박물관·황제 아파트는 11/19 재개관. 내부 관람이 투어에 포함되는지 가이드에게 확인."
        },
        {
          placeId: "peterskirche",
          text: "성 페터 성당",
          note: "토·일 09:00–19:00, 무료. 일요일 미사 10:00 · 11:15 · 17:00에는 관람이 제한될 수 있습니다."
        },
        {
          placeId: "graben",
          text: "그라벤 거리",
          note: "소시지는 11/28에 Hbf 앞 가판에서 먹으니 여기선 생략해도 됩니다. 꼭 한 번 더 먹고 싶다면 알베르티나 앞 Bitzinger 가판(육식맨: '야 여기 진짜 맛있다', 2번 방문)에서 케제크라이너 1개만."
        },
        {
          placeId: "stephansdom",
          text: "슈테판 대성당",
          note: "일요일 관광객 관람 13:00–16:30. 그 전에는 입구 쪽 자유 구역만 볼 수 있습니다."
        },
        {
          time: "~14:00",
          placeId: "belvedere",
          text: "벨베데레 궁전 (상궁)",
          note: "상궁 매일 09:00–18:00, 성인 €23 · 시간 지정 티켓. 투어 종료 후 숙소까지 걸어서 약 10–15분."
        },
        {
          time: "17:30",
          placeId: "plachutta",
          text: "저녁 · Plachutta Wollzeile 타펠슈피츠 🍖 육식맨 추천",
          note: "숙소에서 U1 Stephansplatz → U3 Stubentor, 또는 Stephansplatz에서 걸어서 약 8분. 매일 11:30–23:30(공식). 영상은 히칭 본점이었지만, 같은 체인에서 같은 메뉴를 내고 도심이라 Wollzeile 지점으로 잡았습니다. 영상에서도 '많이 안 먹으려고' 1인분을 둘이 나눠 먹었습니다. 순서: 구리 냄비 수프 → 골수(빵에 발라서) → 고기 + 사과홀스래디시 · 차이브 소스 · 감자. 주문(2명): Tafelspitz 1인분 €36.90 + 음료 2잔(약 €10, 추정) ≈ €47 (약 70,000원). 접시 추가 요금이 있는지는 미확인. ⚠️ 예약 권장: plachuttawollzeile.pide.at 또는 +43 1 512 15 77."
        }
      ],
      notes: [
        {
          title: "비엔나 투어",
          rows: [
            ["투어", "이정은의 로맨틱 비엔나 투어 (마이리얼트립)"],
            ["시간", "10:00–14:00 (4시간)"],
            ["요금", "인당 59,000원"],
            ["예약", "도슨트 가이드가 예약·티켓 구매를 일괄 진행"],
            ["입장료", "미술관 입장료는 유로 현금으로 준비해 미팅 때 가이드에게 전달 · 벨베데레 성인 €23 (약 35,000원)"],
            ["추천 영화", "아마데우스 · 불멸의 연인 · 비포 선라이즈"]
          ],
          foot: "어느 미술관 입장료를 걷는지는 가이드에게 미리 확인하세요."
        }
      ]
    },
    {
      date: "2026-11-30",
      title: "잘츠부르크 당일치기",
      city: "잘츠부르크",
      blurb: "투어 없이 기차로 다녀오는 잘츠부르크 하루(할슈타트 없음). 역에서 미라벨 정원을 지나 강을 건너 구시가지와 요새까지 걸어서 다니고, 해가 진 뒤(16:20쯤) 불이 켜진 크리스마스 마켓을 보고 돌아옵니다. 기차 시간은 ÖBB Scotty에서 2026.11.30 기준으로 확인했습니다.",
      items: [
        {
          time: "07:10",
          placeId: "adina-vie",
          text: "숙소 출발 → Wien Hbf",
          note: "걸어서 5–10분. 07:15까지 역에 도착하면 여유 있습니다. 물·간식·보조배터리를 챙기세요."
        },
        {
          time: "07:28",
          placeId: "wien-hbf",
          leg: true,
          text: "Wien Hbf 07:28 → Salzburg Hbf 09:53 (ÖBB RJX)",
          note: "약 2시간 25분, 직행. 더 일찍 가려면 06:28 → 08:53 (RJX), 또는 Westbahn 06:38 Wien Westbahnhof → 09:08. Sparschiene·Superpreis 표는 고른 열차에만 탈 수 있습니다."
        },
        {
          time: "09:53",
          placeId: "salzburg-hbf",
          text: "Salzburg Hbf 도착",
          note: "역 남쪽 출구로 나와 Rainerstraße를 따라 미라벨 정원까지 걸어서 약 15분(약 1 km)."
        },
        {
          time: "10:15",
          placeId: "mirabell",
          text: "미라벨 정원 (사운드 오브 뮤직)",
          note: "정원은 무료. 영화 '도레미' 장면의 페가수스 분수·계단이 있고, 정원 너머로 요새가 보입니다."
        },
        {
          time: "10:45",
          placeId: "feingold-steg",
          text: "Marko-Feingold-Steg (옛 Makartsteg) · 사랑의 자물쇠 다리",
          note: "미라벨 정원에서 걸어서 약 5분. 2021년에 Marko-Feingold-Steg로 이름이 바뀌었지만 흔히 Makartsteg라고 부릅니다. 다리를 건너면 바로 구시가지."
        },
        {
          time: "11:00",
          placeId: "getreidegasse",
          text: "게트라이데 거리",
          note: "다리에서 걸어서 약 3분. 철제 간판이 늘어선 쇼핑 거리. 점심(영상 추천 아님): 생가 관람 뒤 걸어서 약 2분 거리인 Sternbräu(Griesgasse 23)에서 핀츠가우 케스노켄(Pinzgauer Kasnockn, 치즈 뇨키 팬) 1개 + 수프 1개를 나눠 먹으면 비엔나에서 먹을 메뉴와 겹치지 않습니다. 가격은 미확인입니다(예전 메뉴는 케스노켄 €9.90 · 수프 €4.50이었고 지금은 더 비쌀 수 있음, 약 €20–25 · 3–3.7만 원 추정). 매일 영업이라는 정보도 3자 자료 기준."
        },
        {
          time: "11:15",
          placeId: "mozart-geburtshaus",
          text: "모차르트 생가 (Getreidegasse 9)",
          note: "매일 09:00–17:30 (마지막 입장 17:00), 성인 €18. 관람 약 1시간. 공식 웹숍(mozarteum.at) 또는 현장 구매, 3자 판매처 표는 받지 않습니다. (Salzburg 관광청·Mozarteum, 2026년 10월 확인)"
        },
        {
          time: "13:30",
          placeId: "salzburg-dom",
          text: "잘츠부르크 대성당 · 레지덴츠 광장",
          note: "생가에서 걸어서 약 5분. 대성당 앞 Domplatz와 옆 Residenzplatz가 저녁 크리스마스 마켓 자리입니다."
        },
        {
          time: "14:15",
          placeId: "hohensalzburg",
          text: "호엔잘츠부르크 성 (FestungsBahn 산악열차)",
          note: "대성당에서 FestungsBahn 승강장(Festungsgasse 4)까지 걸어서 약 5분. Basic 티켓(산악열차 왕복 포함) 성인 €15.50. 10–12월 09:30–17:00, 표는 문 닫기 1시간 전까지 팝니다(공식 사이트, 2026). 16:20쯤 해 지는 모습을 요새 위에서 보고 내려오면 좋습니다."
        },
        {
          time: "17:00",
          placeId: "salzburg",
          text: "잘츠부르크 크리스마스 마켓 (Domplatz · Residenzplatz)",
          note: "2026.11.19–2027.1.1, 월–목 10:00–20:30, 무료(공식 사이트). 해가 진 뒤라 조명이 켜져 있습니다. 뱅쇼와 간식으로 저녁. 사람이 많으니 소매치기 주의."
        },
        {
          time: "19:07",
          placeId: "salzburg-hbf",
          leg: true,
          text: "Salzburg Hbf 19:07 → Wien Hbf 21:32 (ÖBB RJX)",
          note: "마켓에서 역까지 걸어서 약 25분(약 2 km). 더 늦게는 20:07 → 22:32, 마지막은 21:07 → 23:32. 22:07은 00:35 도착이라 비추천."
        },
        {
          time: "21:32",
          placeId: "wien-hbf",
          text: "Wien Hbf 도착 → 숙소",
          note: "걸어서 5–10분. 내일(12/1)은 체크아웃·부다페스트 이동일이니 일찍 쉬세요."
        }
      ],
      notes: [
        {
          title: "잘츠부르크 기차",
          rows: [
            ["가는 편", "Wien Hbf 07:28 → Salzburg Hbf 09:53 (RJX)\n대안 06:28 → 08:53 · Westbahn 06:38 Westbahnhof → 09:08"],
            ["오는 편", "Salzburg Hbf 19:07 → Wien Hbf 21:32 (RJX)\n대안 20:07 → 22:32 · 마지막 21:07 → 23:32"],
            ["표", "ÖBB Sparschiene 편도 €9.90부터 (shop.oebbtickets.at)\nWestbahn WestSuperpreis 편도 €13.99부터 (westbahn.at/ticketshop)"],
            ["조건", "둘 다 수량 한정·열차 지정. Sparschiene는 환불·취소 불가. 일찍 살수록 쌉니다."],
            ["현지 이동", "걸어서. 요새 산악열차는 요새 티켓에 포함."]
          ],
          foot: "시간은 ÖBB Scotty 2026.11.30 조회 기준입니다. 떠나기 전에 다시 확인하세요."
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
          note: "체크아웃 11:00. 미리 체크아웃하고 리셉션에 짐을 맡긴 뒤 가볍게 나갑니다."
        },
        {
          time: "09:00",
          placeId: "schoenbrunn",
          text: "(선택) 쇤브룬 궁전 · 주변 돌아다니기",
          note: "11/3–3/31 매일 08:30–17:00 (마지막 입장 16:15). Hbf에서 U1 → Karlsplatz → U4로 약 25–30분. 11:30쯤 나와서 U4 → Karlsplatz → U1 Stephansplatz로 점심 장소까지 약 20분. 가까이 있고 싶다면 벨베데레 정원·Hbf 주변 산책으로 대신."
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
          note: "짐이 있으니 Bolt/택시를 추천합니다(숙소까지 약 10–15분). 대중교통은 Keleti에 M3가 없어서 M2로 Deák Ferenc tér, 또는 M4로 Kálvin tér까지 간 뒤 M3로 갈아타고 Lehel tér에서 내립니다."
        },
        {
          time: "19:15",
          placeId: "adina-bud",
          text: "숙소 체크인 · 가볍게 쉬기",
          note: "체크인 15:00부터, 체크아웃 11:00, 리셉션 24시간, 짐 보관 가능(호텔 공식 페이지 기준). 객실에 주방이 있어 근처 마트에서 맥주와 간식을 사 와서 가볍게 첫날 저녁을 해결하기 좋습니다."
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
      title: "부다 성 · 다뉴브 크루즈",
      city: "부다페스트",
      blurb: "부다 언덕을 북쪽(바위 병원·어부의 요새)에서 남쪽(왕궁)으로 걸은 뒤, 서쪽 기슭의 Stand25에서 점심을 먹습니다. 체인 브리지를 건너 페스트에서 크리스마스 마켓 → 노을·야경 크루즈 → 마켓으로 돌아와 가벼운 저녁. 점심을 든든히 먹으니 저녁은 노점으로 가볍게. 🎬 영상 추천 = Edmmer 헝가리 브이로그, 🍖 육식맨 추천 = 육식맨 부다페스트 영상에 나온 곳입니다.",
      items: [
        {
          time: "09:30",
          placeId: "adina-bud",
          text: "숙소 출발",
          note: "Bolt로 Lovas út(바위 병원)까지 약 15분. 대중교통은 M3 Lehel tér → Deák Ferenc tér → M2 Széll Kálmán tér에서 내린 뒤 도보 약 10분(오르막)."
        },
        {
          time: "10:00",
          placeId: "hospital-rock",
          text: "바위 병원(Sziklakórház) 가이드 투어 🎬 영상 추천",
          note: "매일 10:00–19:00. 가이드 투어로만 볼 수 있고, 약 60분이며 정시마다 출발합니다(마지막 출발 18:00). 영어 투어 성인 30 EUR이며 당일 환율로 포린트 결제. 12/24·25·31 휴관. 온라인으로 회차를 예매해 두면 편합니다."
        },
        {
          time: "11:30",
          placeId: "bastion",
          text: "어부의 요새 · 마차시 성당 앞",
          note: "아래 테라스와 아케이드는 24시간 무료입니다. 위층 탑 전망대는 09:00–19:00 유료(성인 1,700 HUF)이고 그 밖의 시간에는 무료입니다. 가격은 2026년 3자 안내 사이트 기준이라 현장에서 확인하세요."
        },
        {
          time: "12:15",
          placeId: "castle",
          text: "부다 왕궁 산책",
          note: "왕궁 안뜰과 테라스는 자유롭게 걸을 수 있습니다. 어부의 요새에서 성 언덕을 따라 남쪽으로 약 15분. 다 보면 서쪽 기슭(Attila út)으로 내려갑니다."
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
          note: "Stand25에서 체인 브리지를 건너 도보 약 20분. 2026.11.13–12.31 운영, 일–목 11:00–21:00, 금–토 11:00–22:00(공식 사이트). 지금은 구경만 하고, 크루즈가 끝나면 다시 와서 저녁을 먹습니다. 사람이 많으니 소매치기 주의."
        },
        {
          time: "16:20",
          placeId: "danube",
          text: "다뉴브 노을·야경 크루즈 (Legenda, 7번 선착장)",
          note: "선착장은 Vigadó tér 7번(Jane Haining rakpart 7, 마켓에서 도보 5분). 11/23–12/31 저녁 크루즈는 15:40, 16:20부터 20분 간격으로 21:00까지 있습니다. 약 1시간이고 음료 1잔과 오디오 가이드가 포함되며 성인 €25. 해가 일찍 지니 16시대 배를 타면 노을과 야경을 둘 다 볼 수 있습니다. 온라인 예매 권장."
        },
        {
          time: "17:40",
          placeId: "vorosmarty",
          text: "가벼운 저녁 · 뵈뢰슈마르티 마켓 노점",
          note: "선착장에서 걸어서 약 5분. 수요일은 21:00까지. 주문(2명): 구운 소시지(kolbász) + 빵 1개 나눠 먹기, 굴뚝빵(kürtőskalács) 1개, 뱅쇼(forralt bor) 2잔. 약 10,000 HUF (약 40,000원). 노점 가격은 미확인이라 추정치이고 현장에서 확인하세요. 컵 보증금이 따로 있을 수 있습니다."
        },
        {
          time: "21:00",
          placeId: "adina-bud",
          text: "숙소 복귀",
          note: "Ferenciek tere에서 M3를 타면 Lehel tér까지 갈아타지 않고 갑니다."
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
            ["국회의사당", "12/4 오전 영어 투어 (jegymester.hu 공식)"],
            ["선택", "바위 병원 회차, 세체니 입장권, Legenda 크루즈 (온라인)"]
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
            ["주의", "시장, 크리스마스 마켓, 루인바에서는 소매치기 주의. 가방은 앞으로."]
          ]
        }
      ]
    },
    {
      date: "2026-12-03",
      title: "온천 · 유대인 지구 루인바",
      city: "부다페스트",
      blurb: "숙소 옆 시장에서 아침 → 세체니 온천 → M1으로 도심에 가서 푸아그라 점심 → 유대인 지구를 걸은 뒤 망갈리차 샤퀴테리와 와인으로 가벼운 저녁 → 루인바.",
      items: [
        {
          time: "08:30",
          placeId: "lehel-market",
          text: "아침 · 레헬 시장 Csirke Csibész 🎬 영상 추천",
          note: "숙소에서 도보 약 5분(Lehel tér M3 바로 앞). 시장은 월–금 06:00–18:00. 2층 갤러리의 닭 요리 가게 Csirke Csibész는 월–금 6:30–18:00입니다. 영상에 나온 메뉴 이름은 확인하지 못했으니 진열대를 보고 고르세요. 점심이 진하니 아침은 닭 요리 1인분과 곁들이 1개를 나눠 먹기(약 2,500–3,500 HUF · 1–1.4만 원, 추정). (영상의 Café ZAJ는 이 시장이 아니라 Jókai u. 11에 있어 일정에서 뺐습니다.)"
        },
        {
          time: "10:00",
          placeId: "szechenyi",
          text: "세체니 온천",
          note: "M3 Lehel tér → Deák Ferenc tér → M1 Széchenyi fürdő, 또는 Bolt로 약 10분. 월–목 07:00–20:00(탕은 19:40까지), 금 07:00–22:00. 평일 입장권 13,200 HUF, Fast Track 15,200 HUF(온라인 전용). ⚠️ 수건과 가운 대여가 현재 중단돼 있으니 수건, 슬리퍼, 수영복을 챙기세요(현장 판매는 있음). 온천 안 매점은 카드만 받습니다."
        },
        {
          time: "13:00",
          placeId: "comme-chez-soi",
          text: "점심 · Comme Chez Soi 거위 간 🍖 육식맨 추천",
          note: "M1 Széchenyi fürdő → Vörösmarty tér(약 12분), 내려서 걸어서 약 5분. 매일 12:00–23:00(공식). 영상 평: 차가운 푸아그라와 사과 플람베를 곁들인 구운 푸아그라 둘 다 극찬. 샐러드 · 셔벗 · 리큐어를 서비스로 준다는 후기가 있습니다. 주문(2명): 사과 곁들인 구운 거위 간 1개 12,900 HUF(3자 자료 기준) + 해산물 파스타 1개 8,900 HUF(2명이 먹을 만한 양이라는 후기) ≈ 21,800 HUF (약 88,000원) + 음료. 차가운 푸아그라도 먹고 싶으면 파스타 대신 시키세요(가격 미확인). ⚠️ 예약 필수: commechezsoi@gmail.com / +36 1 318 3943. ⚠️ 현금만 받는다는 후기가 있으니(미확인) 3만 HUF 정도 현금을 챙기세요."
        },
        {
          time: "15:00",
          placeId: "jewish",
          text: "유대인 지구 산책 · 도하니 회당",
          note: "Comme Chez Soi에서 걸어서 약 20분(약 1.5 km). 해가 지고 불이 켜진 골목이 분위기가 좋습니다. (Edmmer 영상의 Rosenstein · Karaván은 동선과 메뉴가 겹쳐서 이번엔 뺐습니다.)"
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
          text: "Szimpla Kert 루인바 🎬 영상 추천",
          note: "Negro Mangalica에서 걸어서 약 5분, Kazinczy utca에 있는 원조 루인바입니다. 영업시간(월–금 15:00–04:00, 토 12:00–, 일 09:00–)은 3자 자료 기준이고 공식 사이트에서는 확인하지 못했습니다(미확인). 밤이 깊을수록 붐비니 일찍 가세요. 소지품 주의."
        },
        {
          time: "22:30",
          placeId: "adina-bud",
          text: "숙소 복귀",
          note: "Bolt로 약 10–15분, 또는 Deák Ferenc tér에서 M3."
        }
      ]
    },
    {
      date: "2026-12-04",
      title: "페스트 · 국회의사당 · 크리스마스 마켓",
      city: "부다페스트",
      blurb: "남쪽 중앙시장에서 랑고시로 시작해 트램 2를 타고 다뉴브를 따라 국회의사당까지 올라갑니다. 대성당과 마켓을 본 뒤 숙소에서 쉬고, 저녁에는 프로젝션 쇼 → 바로 옆 Parasztkonyha에서 마지막 헝가리 가정식 → 국회의사당 강변 야경 산책으로 마무리합니다.",
      items: [
        {
          time: "08:30",
          placeId: "great-market",
          text: "중앙시장 · 랑고시 아침 🎬 영상 추천",
          note: "M3 Lehel tér → Kálvin tér 직행(약 10분), 내려서 도보 5분. 월–금 06:00–18:00, 공휴일 휴무. 랑고시는 2층 갤러리에 있습니다. ⚠️ 영상에서는 토핑을 전부 '예스' 했다가 약 10만 원이 나왔습니다. 주문 전에 가격표와 토핑별 가격을 확인하고, 기본(사워크림 + 치즈)부터 시작하세요. 주문(2명): 사워크림 + 치즈 랑고시 1개 나눠 먹기(약 2,000–3,000 HUF · 8,000–12,000원, 추정). 랑고시는 이번 여행에서 여기서만 먹습니다. ⚠️ 붐비는 곳이니 소매치기 주의."
        },
        {
          time: "10:30",
          placeId: "parliament",
          text: "국회의사당 가이드 투어",
          note: "Fővám tér에서 트램 2를 타면 다뉴브 강변을 따라 Kossuth Lajos tér까지 약 15분입니다. 비EU 성인 14,000 HUF, 약 45분, 영어 가이드 또는 오디오 가이드. 11월부터 방문자센터 08:00–16:00. ⚠️ 공식 jegymester.hu에서 날짜와 영어 회차를 미리 예매하세요(국가 행사가 있으면 투어가 바뀔 수 있음)."
        },
        {
          time: "12:15",
          placeId: "basilica",
          text: "성 이슈트반 대성당 · Advent Bazilika 마켓 점심",
          note: "국회에서 도보 약 15분. 성당 내부는 월–토 09:00–17:45, 전망대는 매일 09:00–19:00. 성인 요금은 성당 2,600 / 전망대 + 보물관 5,000 / 통합권 6,800 HUF. 마켓은 2026.11.13–2027.1.1, 일–목 11:00–22:00, 금–토 11:00–23:00. 주문(2명): 12/2에 소시지와 굴뚝빵을 먹었으니, 여기서는 töltött káposzta(양배추 롤) 1개 + 뱅쇼나 따뜻한 펀치 1–2잔(약 5,000–8,000 HUF · 2–3.2만 원, 추정). 저녁을 든든히 먹으니 가볍게."
        },
        {
          time: "14:30",
          placeId: "adina-bud",
          text: "(선택) 숙소에서 쉬기",
          note: "Arany János utca에서 M3로 Lehel tér까지 세 정거장."
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
          note: "Parasztkonyha에서 걸어서 약 12분(약 1 km). 오전에 투어한 국회의사당을 밤에 강변에서 한 번 더 봅니다. 가볍게 30–40분 걷고 숙소로 갑니다."
        },
        {
          time: "21:30",
          placeId: "adina-bud",
          text: "숙소 복귀 · 짐 싸기",
          note: "Kossuth Lajos tér에서 숙소까지 걸어서 약 20분(약 1.6 km), 또는 Bolt."
        }
      ]
    },
    {
      date: "2026-12-05",
      title: "출발",
      city: "부다페스트 → 인천",
      blurb: "11:30 출발이라 09:00까지 T2A에 도착하는 것을 목표로 07:30에 체크아웃합니다.",
      items: [
        {
          time: "07:30",
          placeId: "adina-bud",
          text: "체크아웃 · 공항 이동",
          note: "① Bolt나 택시: 앱에서 요금을 미리 확인하세요. 주말 아침이라 30–40분 정도 예상합니다(추정). ② 대중교통: M3 Lehel tér → Kálvin tér(약 10분) → 100E 공항버스(약 40분, 전용권 2,500 HUF, 앞문 단말기에 카드 탭). 아침에는 10–15분 간격. 호텔 조식은 주말 07:30부터라 시간이 빠듯합니다."
        },
        { time: "11:30", placeId: "bud", leg: true, text: "12/5 11:30 부다페스트(BUD) T2A 출발 · MU8640 / FM870" },
        { time: "12/6", placeId: "pvg", leg: true, text: "12/6 05:25 상하이 푸동(PVG) 도착 → 08:40 출발 · MU5041" },
        { time: "12/6", placeId: "icn", leg: true, text: "12/6 11:55 인천공항(ICN) 도착" }
      ]
    }
  ]
};
