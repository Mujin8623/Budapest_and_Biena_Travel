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
    hallstatt: {
      name: "Hallstatt",
      city: "잘츠캄머구트",
      lat: 47.562,
      lng: 13.649,
      station: "당일투어 버스",
      lines: "",
      photo: "assets/img/hallstatt.webp",
      credit: {
        author: "C.Stadler/Bwag",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Hallstatt_-_Zentrum_.JPG",
        title: "Hallstatt - Zentrum"
      }
    },
    salzburg: {
      name: "Salzburg 구시가지",
      city: "잘츠부르크",
      lat: 47.8,
      lng: 13.045,
      station: "당일투어 버스",
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
    szazeves: {
      name: "Százéves Étterem",
      city: "부다페스트",
      address: "Piarista u. 2",
      lat: 47.49315,
      lng: 19.05187,
      station: "Ferenciek tere",
      lines: "M3 · 트램 2 (Március 15. tér)",
      photo: "assets/img/szazeves.webp",
      credit: {
        author: "Prolete",
        license: "CC0",
        url: "https://commons.wikimedia.org/wiki/File:Sz%C3%A1z%C3%A9ves_%C3%89tterem,_P%C3%A9terffy-palota,_Piarista_utca,_Budapest,_September_2013_175.jpg",
        title: "Százéves Étterem, Péterffy-palota"
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
    rosenstein: {
      name: "Rosenstein Vendéglő",
      city: "부다페스트",
      address: "Mosonyi u. 3",
      lat: 47.49838,
      lng: 19.08237,
      station: "Keleti pályaudvar",
      lines: "M2 · M4"
    },
    karavan: {
      name: "Karaván Street Food",
      city: "부다페스트",
      address: "Kazinczy u. 18",
      lat: 47.49712,
      lng: 19.06293,
      station: "Astoria",
      lines: "M2 · 트램 47 · 49",
      photo: "assets/img/karavan.webp",
      credit: {
        author: "Christo",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Budapest,_Street_Food_Karav%C3%A1n.jpg",
        title: "Budapest, Street Food Karaván"
      }
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
    gozsdu: {
      name: "Gozsdu Udvar · Spíler",
      city: "부다페스트",
      address: "Király u. 13",
      lat: 47.49867,
      lng: 19.05911,
      station: "Deák Ferenc tér",
      lines: "M1 · M2 · M3",
      photo: "assets/img/gozsdu.webp",
      credit: {
        author: "Christo",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Budapest,_Gozsdu_Udvar,_2.jpg",
        title: "Budapest, Gozsdu Udvar"
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
      blurb: "밤 비행 직후라 무리하지 않는 날. 숙소 체크인은 15:00라 짐부터 맡깁니다. 내일(일요일)은 마트 대부분이 쉬니 장보기는 오늘.",
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
          time: "15:00 전후",
          placeId: "wien-hbf",
          text: "Hauptbahnhof 마트 장보기 → 체크인 · 휴식",
          note: "토요일은 일반 마트 영업. 일요일엔 대부분 문을 닫고, Hbf의 INTERSPAR-pronto(일 06:00–23:00) 정도만 엽니다."
        },
        {
          time: "17:00~",
          placeId: "rathaus",
          text: "시청사 크리스마스 마켓",
          note: "2026.11.13–12.26 매일 10:00–22:00. 16시쯤 해가 지면 조명이 켜집니다. 숙소 앞 트램 D 한 번에 Rathausplatz/Burgtheater."
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
          text: "투어 시작 · 카페 자허",
          note: "카페는 매일 07:00–23:00, 조식 07:00–11:00. 자허토르테를 앉아서 먹으려면 예약 권장. 미팅 장소·시간은 투어 확인서 기준."
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
          text: "그라벤 거리 · 소시지 간식"
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
      title: "잘츠부르크 · 할슈타트",
      city: "당일투어",
      blurb: "하루 13–14시간짜리 버스 투어. 보통 07:00 전후 출발해 밤 늦게 돌아옵니다. 할슈타트는 16:15쯤 해가 지니 밝을 때 보려면 할슈타트를 먼저 들르는 일정이 유리합니다.",
      items: [
        {
          time: "이른 아침",
          placeId: "adina-vie",
          leg: true,
          text: "투어 미팅 장소로 이동",
          note: "출발 시간·미팅 장소는 투어 확인서 기준. 전날 밤 일찍 자고, 간식·물·보조배터리를 챙기세요."
        },
        {
          placeId: "hallstatt",
          leg: true,
          text: "할슈타트 (소금마을)",
          note: "잘츠캄머구트 호숫가 마을. 청동기 시대부터 소금을 캐 왔고, 1997년 유네스코 세계유산(할슈타트-다흐슈타인/잘츠캄머구트 문화경관)에 올랐습니다."
        },
        {
          placeId: "salzburg",
          leg: true,
          text: "잘츠부르크 (사운드 오브 뮤직)",
          note: "모차르트의 고향이자 영화 사운드 오브 뮤직 촬영지. 미라벨 정원·게트라이데 거리 등."
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
          note: "11/3–3/31 매일 08:30–17:00 (마지막 입장 16:15). Hbf에서 U1 → Karlsplatz → U4로 약 25–30분. 12:30쯤엔 숙소 쪽으로 돌아오세요. 가까이 있고 싶다면 벨베데레 정원·Hbf 주변 산책으로 대신."
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
      blurb: "부다 언덕을 북쪽(바위 병원·어부의 요새)에서 남쪽(왕궁)으로 걸은 뒤, 서쪽 기슭의 Stand25에서 점심을 먹습니다. 체인 브리지를 건너 페스트에서 크리스마스 마켓 → 노을·야경 크루즈 → 오래된 식당에서 저녁. 🎬 영상 추천 = Edmmer 헝가리 브이로그에 나온 곳입니다.",
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
          note: "영상에서 먹은 것은 구야시 수프, 메기 파프리카시(harcsapaprikás), 사슴 스테이크, 쇼믈로이 갈루슈카(Somlói galuska), 토카이 와인과 팔린카입니다. 메뉴가 계절마다 바뀌니 일부는 없을 수 있지만, 구야시와 쇼믈로이는 대표 메뉴입니다. 미쉐린 빕구르망. 점심은 월–토 12:00–16:00(마지막 입장 14:30), 일요일 휴무. 서비스 차지가 붙습니다. ⚠️ 예약 필수: 전화(+36 30 961 3262) 또는 홈페이지의 SevenRooms."
        },
        {
          time: "15:15",
          placeId: "vorosmarty",
          text: "체인 브리지 건너 · 뵈뢰슈마르티 광장 크리스마스 마켓",
          note: "Stand25에서 체인 브리지를 건너 도보 약 20분. 2026.11.13–12.31 운영, 일–목 11:00–21:00, 금–토 11:00–22:00(공식 사이트). 뱅쇼(forralt bor)와 굴뚝빵(kürtőskalács)을 맛보세요. 사람이 많으니 소매치기 주의."
        },
        {
          time: "16:20",
          placeId: "danube",
          text: "다뉴브 노을·야경 크루즈 (Legenda, 7번 선착장)",
          note: "선착장은 Vigadó tér 7번(Jane Haining rakpart 7, 마켓에서 도보 5분). 11/23–12/31 저녁 크루즈는 15:40, 16:20부터 20분 간격으로 21:00까지 있습니다. 약 1시간이고 음료 1잔과 오디오 가이드가 포함되며 성인 €25. 해가 일찍 지니 16시대 배를 타면 노을과 야경을 둘 다 볼 수 있습니다. 온라인 예매 권장."
        },
        {
          time: "18:30",
          placeId: "szazeves",
          text: "저녁 · Százéves Étterem 🎬 영상 추천",
          note: "1831년에 문을 연 '페스트에서 가장 오래된 식당'. 선착장에서 도보 약 8분. 영상에서 먹은 것은 비프 타르타르, 구야시 수프, 구운 거위 다리, Soproni 맥주입니다. 화–일 12:00–23:00(월 13:00–). 예약 권장: 전화(+36 1 230 0329) 또는 홈페이지."
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
            ["Stand25", "12/2 점심 (전화 / SevenRooms)"],
            ["Százéves", "12/2 저녁 (전화 / 홈페이지)"],
            ["Rosenstein", "12/3 점심 (전화 / 이메일, 웹 폼은 자동 확정 아님)"],
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
      blurb: "숙소 옆 시장에서 아침 → 세체니 온천 → Keleti 근처 Rosenstein 점심 → 서쪽 유대인 지구로 걸어가 스트리트 푸드와 루인바. 북쪽에서 남쪽, 다시 서쪽으로 이어지는 동선입니다.",
      items: [
        {
          time: "08:30",
          placeId: "lehel-market",
          text: "아침 · 레헬 시장 Csirke Csibész 🎬 영상 추천",
          note: "숙소에서 도보 약 5분(Lehel tér M3 바로 앞). 시장은 월–금 06:00–18:00. 2층 갤러리의 닭 요리 가게 Csirke Csibész는 월–금 6:30–18:00입니다. 영상에 나온 메뉴 이름은 확인하지 못했으니 진열대를 보고 고르세요. (영상의 Café ZAJ는 이 시장이 아니라 Jókai u. 11에 있어 일정에서 뺐습니다.)"
        },
        {
          time: "10:00",
          placeId: "szechenyi",
          text: "세체니 온천",
          note: "M3 Lehel tér → Deák Ferenc tér → M1 Széchenyi fürdő, 또는 Bolt로 약 10분. 월–목 07:00–20:00(탕은 19:40까지), 금 07:00–22:00. 평일 입장권 13,200 HUF, Fast Track 15,200 HUF(온라인 전용). ⚠️ 수건과 가운 대여가 현재 중단돼 있으니 수건, 슬리퍼, 수영복을 챙기세요(현장 판매는 있음). 온천 안 매점은 카드만 받습니다."
        },
        {
          time: "13:30",
          placeId: "rosenstein",
          text: "점심 · Rosenstein Vendéglő 🎬 영상 추천",
          note: "세체니에서 Bolt로 약 10분. 월–토 12:00–23:00, 일요일 휴무. 2026년 여름 리노베이션 뒤 9/1에 다시 열었습니다. 영상에서 먹은 것은 강꼬치고기(süllő/fogas) 요리, 치킨 파프리카시(paprikás csirke), 맥주. 예약 권장: 전화 +36 1 333 3492 / +36 30 746 1603, 또는 rosenstein@rosenstein.hu."
        },
        {
          time: "15:30",
          placeId: "jewish",
          text: "유대인 지구 산책 · 도하니 회당",
          note: "Rosenstein에서 Rákóczi út를 따라 서쪽으로 약 1.5 km. 해가 지고 불이 켜진 골목이 분위기가 좋습니다."
        },
        {
          time: "17:30",
          placeId: "karavan",
          text: "Karaván 스트리트 푸드 🎬 영상 추천",
          note: "매일 11:30–23:59(공식 사이트), 겨울에도 엽니다. 랑고시, 랑고시 버거 같은 푸드트럭 음식에 맥주 한 잔."
        },
        {
          time: "19:30",
          placeId: "szimpla",
          text: "Szimpla Kert 루인바 🎬 영상 추천",
          note: "Karaván 바로 옆에 있는 원조 루인바입니다. 영업시간(월–금 15:00–04:00, 토 12:00–, 일 09:00–)은 3자 자료 기준이고 공식 사이트에서는 확인하지 못했습니다(미확인). 밤이 깊을수록 붐비니 일찍 가세요. 소지품 주의."
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
      blurb: "남쪽 중앙시장에서 랑고시로 시작해 트램 2를 타고 다뉴브를 따라 국회의사당까지 올라갑니다. 대성당과 마켓을 본 뒤 숙소에서 쉬고, 저녁에는 프로젝션 쇼 → Gozsdu 구야시 → 국회의사당 강변 야경 산책으로 마지막 밤을 가볍게 마무리합니다.",
      items: [
        {
          time: "08:30",
          placeId: "great-market",
          text: "중앙시장 · 랑고시 아침 🎬 영상 추천",
          note: "M3 Lehel tér → Kálvin tér 직행(약 10분), 내려서 도보 5분. 월–금 06:00–18:00, 공휴일 휴무. 랑고시는 2층 갤러리에 있습니다. ⚠️ 영상에서는 토핑을 전부 '예스' 했다가 약 10만 원이 나왔습니다. 주문 전에 가격표와 토핑별 가격을 확인하고, 기본(사워크림 + 치즈)부터 시작하세요. ⚠️ 붐비는 곳이니 소매치기 주의."
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
          note: "국회에서 도보 약 15분. 성당 내부는 월–토 09:00–17:45, 전망대는 매일 09:00–19:00. 성인 요금은 성당 2,600 / 전망대 + 보물관 5,000 / 통합권 6,800 HUF. 마켓은 2026.11.13–2027.1.1, 일–목 11:00–22:00, 금–토 11:00–23:00. 노점에서 소시지, 굴뚝빵, 뱅쇼로 점심."
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
          placeId: "gozsdu",
          text: "저녁 · Gozsdu Udvar의 Spíler 구야시 🎬 영상 추천",
          note: "대성당에서 도보 약 8분. Spíler는 매일 11:30부터(목–토 01:30까지)이고, 구야시 수프 2,940 HUF, 비프 구야시 6,580 HUF(메뉴 사이트 기준). 영상에서는 '해장 구야시'로 나왔습니다. Gozsdu 크리스마스 마켓은 12/4부터 금 10:00–19:00(3자 자료)."
        },
        {
          time: "20:00",
          placeId: "parliament",
          text: "국회의사당 · 다뉴브 강변 야경 산책",
          note: "Deák Ferenc tér에서 M2로 두 정거장 가서 Kossuth Lajos tér에서 내리거나, Gozsdu에서 걸어서 약 25분. 오전에 투어한 국회의사당을 밤에 강변에서 한 번 더 봅니다. 가볍게 30–40분 걷고 숙소로 갑니다."
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
