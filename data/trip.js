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
        { time: "18:29", placeId: "keleti", text: "Budapest Keleti (기차 도착)" },
        {
          time: "도착 후",
          placeId: "adina-bud",
          text: "숙소 이동 · 체크인",
          note: "Keleti에는 M3가 없습니다. M2로 Deák Ferenc tér, 또는 M4로 Kálvin tér에서 M3를 타고 Lehel tér. 택시는 약 10–15분."
        },
        { placeId: "basilica", text: "St. Stephen's Basilica" }
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
      title: "부다 성",
      city: "부다페스트",
      items: [
        { placeId: "castle", text: "Buda Castle" },
        { placeId: "bastion", text: "Fisherman’s Bastion" },
        { placeId: "danube", text: "다뉴브 야경 포인트" }
      ]
    },
    {
      date: "2026-12-03",
      title: "온천",
      city: "부다페스트",
      items: [
        { placeId: "szechenyi", text: "Széchenyi Thermal Bath" },
        { placeId: "jewish", text: "유대인 지구" }
      ]
    },
    {
      date: "2026-12-04",
      title: "국회의사당",
      city: "부다페스트",
      items: [
        { placeId: "parliament", text: "Hungarian Parliament Building" }
      ]
    },
    {
      date: "2026-12-05",
      title: "출발",
      city: "부다페스트 → 인천",
      blurb: "11:30 출발이라 오전은 공항으로 이동합니다.",
      items: [
        { placeId: "adina-bud", text: "공항 이동 (출발 2~3시간 전)" },
        { time: "11:30", placeId: "bud", leg: true, text: "12/5 11:30 부다페스트(BUD) T2A 출발 · MU8640 / FM870" },
        { time: "12/6", placeId: "pvg", leg: true, text: "12/6 05:25 상하이 푸동(PVG) 도착 → 08:40 출발 · MU5041" },
        { time: "12/6", placeId: "icn", leg: true, text: "12/6 11:55 인천공항(ICN) 도착" }
      ]
    }
  ]
};
