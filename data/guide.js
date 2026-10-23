/* Self-guided Vienna walk for 2026-11-29 (text only, no audio yet).
   Every paragraph has a stable id (g-<stop>-<n>, a-<artwork>-<n>, l-<leg>) so audio files or TTS can be attached later.
   Walking paths: OSRM foot profile on OpenStreetMap data (routing.openstreetmap.de), simplified. © OpenStreetMap contributors, ODbL.
   Tram D path follows the roads the tram uses (approximate). Prices: 1 EUR ≈ 1,484 KRW.
   Artwork photos: Wikimedia Commons (credit on each artwork; PD-Art paintings, CC BY-SA photos of rooms/sculpture).
   No booking references or names. */
window.TRIP_GUIDE = {
  "2026-11-29": {
    title: "셀프 가이드 · 비엔나 구시가지와 벨베데레",
    intro: { id: "g-intro-1", text: "오늘은 가이드 없이 우리끼리 천천히 걸어요. 장소마다 짧은 이야기와 다음 장소 가는 길을 적어 두었어요. 걷는 거리는 모두 합쳐 약 4 km예요." },
    stops: {
      opernpassage: {
        paras: [
          { id: "g-opernpassage-1", text: "여기는 카를스플라츠 지하의 오페른파사주예요. U1·U2·U4가 만나는 곳이라 오늘 산책의 출발점으로 딱 좋아요. 계단을 올라가면 바로 오페라 극장이 반겨 줄 거예요." }
        ],
        sources: []
      },
      staatsoper: {
        paras: [
          { id: "g-staatsoper-1", text: "국립 오페라 극장은 링슈트라세에 처음 들어선 큰 건물로, 1869년 5월 25일 모차르트의 〈돈 조반니〉로 문을 열었어요. 두 건축가는 안타깝게도 1868년에 세상을 떠나 완공을 보지 못했어요." },
          { id: "g-staatsoper-2", text: "1945년 3월 12일 폭격으로 객석과 무대가 불탔고, 1955년 11월 5일 베토벤의 〈피델리오〉로 다시 문을 열었어요." }
        ],
        sources: [{ title: "Vienna State Opera (Wikipedia)", url: "https://en.wikipedia.org/wiki/Vienna_State_Opera" }]
      },
      "cafe-sacher": {
        paras: [
          { id: "g-cafe-sacher-1", text: "자허토르테는 1832년, 열다섯이나 열여섯 살 견습생이던 프란츠 자허가 메테르니히를 위해 만들었다고 전해져요. 아들 에두아르트가 1876년 호텔 자허를 열면서 메뉴에 올렸어요." },
          { id: "g-cafe-sacher-2", text: "데멜과 '원조' 이름을 두고 긴 소송이 이어지다 1963년에 끝났어요. 달지 않은 생크림을 곁들여 천천히 드세요." }
        ],
        sources: [{ title: "Sachertorte (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sachertorte" }]
      },
      albertina: {
        paras: [
          { id: "g-albertina-1", text: "알베르티나는 마리아 테레지아의 사위 알베르트 공작의 수집품에서 시작된 미술관이에요. 드로잉 약 6만 5천 점, 판화 약 100만 점을 가진 세계적인 판화실이에요." },
          { id: "g-albertina-2", text: "테라스에서 광장 건너편을 보세요. 1945년 3월 12일 폭격으로 수백 명이 숨진 필립호프 자리에 1988년 흐르들리치카의 〈전쟁과 파시즘에 반대하는 기념비〉가 세워졌어요." }
        ],
        sources: [
          { title: "Albertina (Wikipedia)", url: "https://en.wikipedia.org/wiki/Albertina" },
          { title: "Mahnmal gegen Krieg und Faschismus (Wikipedia)", url: "https://de.wikipedia.org/wiki/Mahnmal_gegen_Krieg_und_Faschismus" }
        ]
      },
      hofburg: {
        paras: [
          { id: "g-hofburg-1", text: "호프부르크는 13세기에 처음 지어져 합스부르크 가문이 수백 년 동안 겨울을 보낸 궁전이에요. 지나가는 스위스 궁정에는 신성로마제국 황제관과 오스트리아 제국 황관을 보관한 왕실 보물관이 있어요." },
          { id: "g-hofburg-2", text: "새로 꾸민 시시 박물관은 2026년 11월 19일에 다시 문을 열었어요. 오늘은 바깥만 보고 지나가요." }
        ],
        sources: [
          { title: "Hofburg (Wikipedia)", url: "https://en.wikipedia.org/wiki/Hofburg" },
          { title: "Imperial Treasury, Vienna (Wikipedia)", url: "https://en.wikipedia.org/wiki/Imperial_Treasury,_Vienna" },
          { title: "Sisi Museum (공식)", url: "https://www.sisimuseum-hofburg.at/" }
        ]
      },
      hofreitschule: {
        paras: [
          { id: "g-hofreitschule-1", text: "스페인 승마학교는 1565년 기록에 처음 나오는, 이런 학교 가운데 가장 오래된 곳이에요. 공연장인 하얀 겨울 승마장은 1729–1735년 요제프 에마누엘 피셔 폰 에를라흐가 지었어요." },
          { id: "g-hofreitschule-2", text: "하얀 리피차너도 태어날 땐 갈색이나 검은색이고, 6–10살쯤 되어야 하얘진대요." }
        ],
        sources: [
          { title: "Spanish Riding School (Wikipedia)", url: "https://en.wikipedia.org/wiki/Spanish_Riding_School" },
          { title: "Lipizzan (Wikipedia)", url: "https://en.wikipedia.org/wiki/Lipizzan" }
        ]
      },
      michaelerplatz: {
        paras: [
          { id: "g-michaelerplatz-1", text: "광장 가운데 유리 너머 유적은 로마 군단 기지 빈도보나 바깥 마을의 집터예요. 맞은편의 장식 없는 건물은 아돌프 로스의 로스하우스로, 1912년 완공 무렵 큰 논란이 됐어요." },
          { id: "g-michaelerplatz-2", text: "옆 미하엘 성당에서는 1791년 12월 10일 모차르트 추모 미사 때 〈레퀴엠〉 일부가 처음 연주됐어요." }
        ],
        sources: [
          { title: "Michaelerplatz (Wikipedia)", url: "https://en.wikipedia.org/wiki/Michaelerplatz" },
          { title: "Looshaus (Wikipedia)", url: "https://en.wikipedia.org/wiki/Looshaus" },
          { title: "Michaelerkirche (Wikipedia)", url: "https://de.wikipedia.org/wiki/Michaelerkirche_(Wien)" }
        ]
      },
      demel: {
        paras: [
          { id: "g-demel-1", text: "콜마르크트에는 18세기에 젊은 하이든이 살았고, 쇼팽도 1830–1831년 이 거리에 머물렀어요. 14번지 데멜은 1786년에 문을 연 황실 납품 제과점으로, 어제 카이저슈마렌을 먹은 곳이에요." }
        ],
        sources: [
          { title: "Kohlmarkt (Wikipedia)", url: "https://en.wikipedia.org/wiki/Kohlmarkt" },
          { title: "Demel (Wikipedia)", url: "https://en.wikipedia.org/wiki/Demel" }
        ]
      },
      graben: {
        paras: [
          { id: "g-graben-1", text: "그라벤은 '도랑'이라는 뜻으로, 로마 시대 성벽 앞 도랑 자리에서 시작된 거리예요. 가운데 페스트 기둥은 1679년 흑사병 때 레오폴트 1세가 한 서원으로 세워져 1693년에 봉헌됐어요. 기둥 아래 무릎 꿇은 황제도 찾아보세요." }
        ],
        sources: [
          { title: "Graben, Vienna (Wikipedia)", url: "https://en.wikipedia.org/wiki/Graben,_Vienna" },
          { title: "Pestsäule (Wien) (Wikipedia)", url: "https://de.wikipedia.org/wiki/Pests%C3%A4ule_(Wien)" }
        ]
      },
      peterskirche: {
        paras: [
          { id: "g-peterskirche-1", text: "성 페터 성당은 1733년에 봉헌된, 비엔나 바로크에서 처음으로 돔을 올린 성당이에요. 돔 천장의 〈성모 대관〉은 로트마이어가 그렸어요. 미사 중이면 뒤쪽에서 조용히 봐요." }
        ],
        sources: [{ title: "Peterskirche, Vienna (Wikipedia)", url: "https://en.wikipedia.org/wiki/Peterskirche,_Vienna" }]
      },
      stephansdom: {
        paras: [
          { id: "g-stephansdom-1", text: "슈테판 대성당 자리에는 1147년에 첫 성당이 봉헌됐고, 높이 136 m 남탑은 1433년에 완성됐어요. 지붕은 유약 바른 기와 약 23만 장으로 덮여 있고, 남쪽 면에 쌍두독수리 무늬가 있어요." },
          { id: "g-stephansdom-2", text: "모차르트는 1782년 8월 4일 이곳에서 콘스탄체와 결혼했어요. 일요일 관광 관람은 13:00–16:30이에요." }
        ],
        sources: [
          { title: "St. Stephen's Cathedral, Vienna (Wikipedia)", url: "https://en.wikipedia.org/wiki/St._Stephen%27s_Cathedral,_Vienna" },
          { title: "Stephansdom 관람 시간 (공식)", url: "https://www.stephanskirche.at/" }
        ]
      },
      bitzinger: {
        paras: [
          { id: "g-bitzinger-1", text: "오페라 극장 뒤 비칭어 소시지 가판이에요. 비엔나 소시지 가판 문화는 2024년 오스트리아 무형문화유산 목록에 올랐어요. 치즈가 든 케제크라이너 하나 나눠 먹고 트램 타러 가요." }
        ],
        sources: [{ title: "Bitzinger Würstelstand (공식)", url: "https://bitzinger.wien/de/wuerstelstand/" }]
      },
      "tram-oper": {
        paras: [
          { id: "g-tram-oper-1", text: "여기서 트램 D, Absberggasse 방면을 타요. 네 번째 정류장 Schloss Belvedere에서 내리면 돼요." }
        ],
        sources: [{ title: "Wiener Linien 트램 D 시간표", url: "https://www.wienerlinien.at/" }]
      },
      belvedere: {
        paras: [
          { id: "g-belvedere-1", text: "벨베데레는 오스만 전쟁의 영웅 오이겐 공의 여름 궁전으로, 요한 루카스 폰 힐데브란트가 설계했어요. 손님을 맞던 상궁은 1723년에 완성됐어요. 정원 쪽에서 돌아보면 비엔나 시내가 내려다보여요." }
        ],
        sources: [
          { title: "Belvedere, Vienna (Wikipedia)", url: "https://en.wikipedia.org/wiki/Belvedere,_Vienna" },
          { title: "Upper Belvedere (공식)", url: "https://www.belvedere.at/en/visit/upper-belvedere" }
        ]
      },
      plachutta: {
        paras: [
          { id: "g-plachutta-1", text: "타펠슈피츠는 소고기를 채소와 함께 푹 삶은 비엔나 전통 요리예요. 국물을 수프로 먼저 마시고, 골수를 빵에 바른 뒤, 고기를 사과홀스래디시와 차이브 소스에 곁들여 먹어요." }
        ],
        sources: []
      }
    },
    artworksFor: "belvedere",
    artworksNote: "층은 박물관 표기 Ebene 0/1/2(한국식 1/2/3층)예요. 전시 배치는 바뀔 수 있으니 입구 안내도를 먼저 확인해요. 〈키스〉 방이 가장 붐비니 먼저 가도 좋아요. 현장 오디오 가이드 기기 대여 €5(약 7,400원).",
    artworks: [
      { id: "a-marmorsaal", title: "대리석 홀 · 국가조약", artist: "천장화 카를로 카를로네", year: "1721–1723", where: "Ebene 1 · 중앙",
        photo: "assets/img/art-marmorsaal.webp",
        credit: { author: "C.Stadler/Bwag", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Wien_-_Oberes_Belvedere,_Marmorsaal.JPG", title: "Wien - Oberes Belvedere, Marmorsaal" },
        paras: [{ id: "a-marmorsaal-1", text: "1955년 5월 15일 이 홀에서 오스트리아 국가조약이 서명됐어요. 피글 외무장관이 발코니에서 조약서를 들어 보이던 곳이에요." }] },
      { id: "a-messerschmidt", title: "성격 두상", artist: "프란츠 크사버 메서슈미트", year: "1770–1783", where: "Ebene 1 · 바로크",
        photo: "assets/img/art-messerschmidt.webp",
        credit: { author: "Bahnfrend (사진) · 작품 Franz Xaver Messerschmidt", license: "CC BY-SA 4.0 (작품은 퍼블릭 도메인)", url: "https://commons.wikimedia.org/wiki/File:Character_heads,_%C3%96sterreichische_Galerie_Belvedere,_2019_(01).jpg", title: "Character heads, Österreichische Galerie Belvedere, 2019 (01)" },
        paras: [{ id: "a-messerschmidt-1", text: "얼굴을 잔뜩 찡그린 두상들이에요. 제목은 작가가 죽은 뒤에 붙었으니, 마음 가는 대로 표정을 읽어 봐요." }] },
      { id: "a-napoleon", title: "그랑 생베르나르 고개를 넘는 나폴레옹", artist: "자크루이 다비드", year: "1801–1805 연작 중 하나", where: "Ebene 1 · 신고전주의",
        photo: "assets/img/art-napoleon.webp",
        credit: { author: "Jacques-Louis David · Google Art Project", license: "Public domain (PD-Art)", url: "https://commons.wikimedia.org/wiki/File:Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg", title: "Napoleon at the Great St. Bernard - Jacques-Louis David - Google Cultural Institute" },
        paras: [{ id: "a-napoleon-1", text: "다섯 점 연작 중 하나로, 1834년부터 벨베데레에 있어요. 실제로는 맑은 날 노새를 타고 넘었지만, 나폴레옹은 '사나운 말 위의 침착한 모습'을 원했대요." }] },
      { id: "a-waldmueller", title: "성체축일 아침", artist: "페르디난트 게오르크 발트뮐러", year: "1857", where: "Ebene 1 · 비더마이어",
        photo: "assets/img/art-waldmueller.webp",
        credit: { author: "Ferdinand Georg Waldmüller", license: "Public domain (PD-Art)", url: "https://commons.wikimedia.org/wiki/File:Ferdinand_Georg_Waldm%C3%BCller_-_Am_Fronleichnamsmorgen_(1857).jpg", title: "Ferdinand Georg Waldmüller - Am Fronleichnamsmorgen (1857)" },
        paras: [{ id: "a-waldmueller-1", text: "축제날 아침의 환한 햇살 속에 가난한 사람들의 모습도 함께 담았어요." }] },
      { id: "a-judith", title: "유디트 I", artist: "구스타프 클림트", year: "1901", where: "Ebene 1 · 빈 1900",
        photo: "assets/img/art-judith.webp",
        credit: { author: "Gustav Klimt", license: "Public domain (PD-Art)", url: "https://commons.wikimedia.org/wiki/File:Gustav_Klimt_039.jpg", title: "Gustav Klimt 039" },
        paras: [{ id: "a-judith-1", text: "클림트 그림에서 금이 처음으로 주인공처럼 쓰인 작품이에요." }] },
      { id: "a-kiss", title: "키스", artist: "구스타프 클림트", year: "1907–1908", where: "Ebene 1 · 빈 1900",
        photo: "assets/img/art-kiss.webp",
        credit: { author: "Gustav Klimt · Google Art Project", license: "Public domain (PD-Art)", url: "https://commons.wikimedia.org/wiki/File:The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg", title: "The Kiss - Gustav Klimt - Google Cultural Institute" },
        paras: [{ id: "a-kiss-1", text: "1908년 쿤스트샤우에 '연인'이라는 제목으로 걸렸고, 아직 완성 전에 국가가 사들였어요. 180 cm 정사각형 캔버스에 금박과 은, 백금을 썼어요." }] },
      { id: "a-vangogh", title: "오베르의 평원", artist: "빈센트 반 고흐", year: "1890", where: "Ebene 1 · 빈 1900",
        photo: "assets/img/art-vangogh.webp",
        credit: { author: "Vincent van Gogh · Google Art Project", license: "Public domain (PD-Art)", url: "https://commons.wikimedia.org/wiki/File:The_Plain_of_Auvers_-_Vincent_van_Gogh_-_Google_Cultural_Institute.jpg", title: "The Plain of Auvers - Vincent van Gogh - Google Cultural Institute" },
        paras: [{ id: "a-vangogh-1", text: "반 고흐가 생애 마지막 여름에 오베르에서 그린 넓은 들판이에요." }] },
      { id: "a-tod-maedchen", title: "죽음과 소녀", artist: "에곤 실레", year: "1915", where: "Ebene 2 · 모더니즘",
        photo: "assets/img/art-tod-maedchen.webp",
        credit: { author: "Egon Schiele", license: "Public domain (PD-Art)", url: "https://commons.wikimedia.org/wiki/File:Egon_Schiele_-_Der_Tod_und_das_M%C3%A4dchen.jpg", title: "Egon Schiele - Der Tod und das Mädchen" },
        paras: [{ id: "a-tod-maedchen-1", text: "실레가 에디트와 결혼하고 군에 징집되던 1915년에 그렸어요. 오래 곁에 있던 발리와의 이별을 담았다고 흔히 해석해요." }] },
      { id: "a-familie", title: "가족(웅크린 한 쌍)", artist: "에곤 실레", year: "1918", where: "Ebene 2 · 모더니즘",
        photo: "assets/img/art-familie.webp",
        credit: { author: "Egon Schiele", license: "Public domain (PD-Art)", url: "https://commons.wikimedia.org/wiki/File:Egon_Schiele_-_Die_Familie_(1918).jpg", title: "Egon Schiele - Die Familie (1918)" },
        paras: [{ id: "a-familie-1", text: "1918년, 실레가 스물여덟에 스페인 독감으로 세상을 떠나기 직전 그린 그림이에요. '가족'이라는 제목은 나중에 붙어서 모델이 실레 가족이라고 단정할 수는 없어요." }] },
      { id: "a-znaim", title: "츠나임 제단", artist: "빈 공방", year: "1440–1450 무렵", where: "Ebene 0 · 중세",
        photo: "assets/img/art-znaim.webp",
        credit: { author: "C.Stadler/Bwag", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Wien_-_Oberes_Belvedere,_Znaimer_Altar.JPG", title: "Wien - Oberes Belvedere, Znaimer Altar" },
        paras: [{ id: "a-znaim-1", text: "높이 약 5 m의 날개 제단으로, 금박 조각과 채색이 거의 그대로 남아 있어요." }] }
    ],
    artworkSources: [
      { title: "Upper Belvedere 가이드 (enfilade.guide)", url: "https://enfilade.guide/en/vienna/belvedere" },
      { title: "Belvedere 상설전 층별 구성 (공식 보도자료)", url: "https://www.belvedere.at/sites/default/files/jart-files/PM-Schausammlung-NEU-en.pdf" },
      { title: "The Kiss (Wikipedia)", url: "https://en.wikipedia.org/wiki/The_Kiss_(Klimt)" },
      { title: "Napoleon Crossing the Alps (Wikipedia)", url: "https://en.wikipedia.org/wiki/Napoleon_Crossing_the_Alps" },
      { title: "Death and the Maiden (Schiele) (Wikipedia)", url: "https://en.wikipedia.org/wiki/Death_and_the_Maiden_(Schiele)" },
      { title: "Austrian State Treaty (Wikipedia)", url: "https://en.wikipedia.org/wiki/Austrian_State_Treaty" }
    ],
    legs: [
      {
        "id": "l-opernpassage-staatsoper",
        "from": "opernpassage",
        "to": "staatsoper",
        "mode": "walk",
        "min": 1,
        "text": "'Oper' 출구로 올라가면 바로 오페라 극장 앞이에요.",
        "m": 78,
        "path": [
          [48.20237, 16.3696],
          [48.20235, 16.36966],
          [48.20251, 16.36951],
          [48.20259, 16.36923],
          [48.20269, 16.36917],
          [48.20274, 16.36897]
        ]
      },
      {
        "id": "l-staatsoper-cafe-sacher",
        "from": "staatsoper",
        "to": "cafe-sacher",
        "mode": "walk",
        "min": 3,
        "text": "극장 옆 Opernring을 따라가다 Philharmonikerstraße로 들어가면 극장 뒤편 맞은편이 카페 자허예요.",
        "m": 237,
        "path": [
          [48.20274, 16.36897],
          [48.20282, 16.36856],
          [48.20278, 16.36843],
          [48.20283, 16.36823],
          [48.20289, 16.36822],
          [48.20322, 16.3684],
          [48.20326, 16.36853],
          [48.20392, 16.36885],
          [48.20383, 16.36941]
        ]
      },
      {
        "id": "l-cafe-sacher-albertina",
        "from": "cafe-sacher",
        "to": "albertina",
        "mode": "walk",
        "min": 2,
        "text": "Albertinaplatz를 건너 Augustinerstraße 쪽 계단·에스컬레이터로 테라스에 올라가요.",
        "m": 162,
        "path": [
          [48.20383, 16.36941],
          [48.20405, 16.36885],
          [48.20405, 16.36873],
          [48.20438, 16.36885],
          [48.20478, 16.36864],
          [48.20473, 16.36846],
          [48.2047, 16.36848]
        ]
      },
      {
        "id": "l-albertina-hofburg",
        "from": "albertina",
        "to": "hofburg",
        "mode": "walk",
        "min": 7,
        "text": "Augustinerstraße를 따라 아우구스티너 성당을 지나 요제프 광장으로 가요. 광장 안쪽 통로로 스위스 궁정을 지나면 In der Burg 광장이에요.",
        "m": 496,
        "path": [
          [48.2047, 16.36848],
          [48.20473, 16.36846],
          [48.20478, 16.36864],
          [48.20516, 16.3684],
          [48.2054, 16.36808],
          [48.20604, 16.36779],
          [48.20607, 16.3677],
          [48.2062, 16.36757],
          [48.20638, 16.36752],
          [48.20618, 16.36711],
          [48.2065, 16.36676],
          [48.20652, 16.36646],
          [48.20684, 16.36609],
          [48.20696, 16.36562],
          [48.20711, 16.36539],
          [48.20699, 16.36524],
          [48.20707, 16.36512],
          [48.20727, 16.36544]
        ]
      },
      {
        "id": "l-hofburg-hofreitschule",
        "from": "hofburg",
        "to": "hofreitschule",
        "mode": "walk",
        "min": 2,
        "text": "In der Burg에서 미하엘러 문 쪽 돔 아래 원형 홀로 들어가요. 승마학교 입구가 여기 있어요.",
        "m": 110,
        "path": [
          [48.20727, 16.36544],
          [48.20782, 16.36631],
          [48.2077, 16.36629],
          [48.20766, 16.36622]
        ]
      },
      {
        "id": "l-hofreitschule-michaelerplatz",
        "from": "hofreitschule",
        "to": "michaelerplatz",
        "mode": "walk",
        "min": 1,
        "text": "돔 아래를 지나 밖으로 나오면 미하엘러 광장이에요.",
        "m": 71,
        "path": [
          [48.20766, 16.36622],
          [48.2077, 16.36629],
          [48.20782, 16.36631],
          [48.20777, 16.36649],
          [48.20779, 16.36668],
          [48.20797, 16.36656]
        ]
      },
      {
        "id": "l-michaelerplatz-demel",
        "from": "michaelerplatz",
        "to": "demel",
        "mode": "walk",
        "min": 2,
        "text": "광장에서 곧게 뻗은 Kohlmarkt로 들어가 14번지 데멜까지 걸어요.",
        "m": 114,
        "path": [
          [48.20797, 16.36656],
          [48.20818, 16.36641],
          [48.2082, 16.36653],
          [48.20815, 16.36675],
          [48.20855, 16.3673]
        ]
      },
      {
        "id": "l-demel-graben",
        "from": "demel",
        "to": "graben",
        "mode": "walk",
        "min": 4,
        "text": "Kohlmarkt 끝(약 130 m)에서 오른쪽 Graben으로 약 120 m 가면 페스트 기둥이에요.",
        "m": 259,
        "path": [
          [48.20855, 16.3673],
          [48.20942, 16.3685],
          [48.20867, 16.36968],
          [48.20873, 16.3697]
        ]
      },
      {
        "id": "l-graben-peterskirche",
        "from": "graben",
        "to": "peterskirche",
        "mode": "walk",
        "min": 2,
        "text": "페스트 기둥 옆 골목 Petersplatz로 몇 걸음 들어가면 성 페터 성당이에요.",
        "m": 108,
        "path": [
          [48.20873, 16.3697],
          [48.20882, 16.36977],
          [48.20876, 16.36986],
          [48.20916, 16.37041],
          [48.20932, 16.37017]
        ]
      },
      {
        "id": "l-peterskirche-stephansdom",
        "from": "peterskirche",
        "to": "stephansdom",
        "mode": "walk",
        "min": 3,
        "text": "Goldschmiedgasse를 따라가면 Stephansplatz가 나와요. 정문인 '거인의 문'은 서쪽 면이에요.",
        "m": 213,
        "path": [
          [48.20932, 16.37017],
          [48.20899, 16.37073],
          [48.20898, 16.37083],
          [48.20889, 16.37088],
          [48.20844, 16.37181],
          [48.20838, 16.37208],
          [48.20862, 16.37227]
        ]
      },
      {
        "id": "l-stephansdom-bitzinger",
        "from": "stephansdom",
        "to": "bitzinger",
        "mode": "walk",
        "min": 9,
        "text": "Kärntner Straße를 따라 내려가다 Kupferschmiedgasse로 오른쪽, Neuer Markt와 Tegetthoffstraße를 지나 Albertinaplatz로 가요.",
        "m": 632,
        "path": [
          [48.20862, 16.37227],
          [48.20838, 16.37208],
          [48.20836, 16.37215],
          [48.20795, 16.37185],
          [48.20674, 16.37155],
          [48.20679, 16.37092],
          [48.2063, 16.37075],
          [48.20628, 16.37063],
          [48.20621, 16.37054],
          [48.20595, 16.37051],
          [48.20576, 16.37042],
          [48.20528, 16.3698],
          [48.20447, 16.36913],
          [48.20439, 16.36897],
          [48.20414, 16.36885],
          [48.20405, 16.36885],
          [48.20402, 16.36891]
        ]
      },
      {
        "id": "l-bitzinger-tram-oper",
        "from": "bitzinger",
        "to": "tram-oper",
        "mode": "walk",
        "min": 5,
        "text": "오페라 뒤 Herbert-von-Karajan-Platz를 지나 Kärntner Ring의 'Oper, Karlsplatz' 트램 정류장으로 가요.",
        "m": 331,
        "path": [
          [48.20402, 16.36891],
          [48.20385, 16.36932],
          [48.20364, 16.3702],
          [48.2036, 16.37009],
          [48.2026, 16.36955],
          [48.20246, 16.36985],
          [48.20217, 16.36968],
          [48.2021, 16.36972],
          [48.20207, 16.36994],
          [48.20211, 16.36996],
          [48.20213, 16.36988]
        ]
      },
      {
        "id": "l-tram-oper-belvedere",
        "from": "tram-oper",
        "to": "belvedere",
        "mode": "tram",
        "min": 12,
        "text": "트램 D(Absberggasse 방면)로 4정거장, 시간표상 약 9분이에요(Schwarzenbergplatz → Gußhausstraße → Plößlgasse → Schloss Belvedere). 내려서 상궁 입구(Prinz-Eugen-Straße 27)까지 약 200 m 걸어요.",
        "m": 204,
        "path": [
          [48.19174, 16.37932],
          [48.19122, 16.37967],
          [48.19125, 16.37983],
          [48.19146, 16.37979],
          [48.19167, 16.38003],
          [48.19175, 16.38087],
          [48.19169, 16.38088]
        ],
        "tram": [
          [48.20213, 16.36988],
          [48.20211, 16.36996],
          [48.20203, 16.36992],
          [48.20122, 16.37357],
          [48.20129, 16.374],
          [48.20137, 16.37405],
          [48.20139, 16.37417],
          [48.20133, 16.37405],
          [48.19927, 16.37519],
          [48.19812, 16.37483],
          [48.1979, 16.37491],
          [48.19774, 16.37503],
          [48.19777, 16.37529],
          [48.19752, 16.37538],
          [48.19463, 16.37716],
          [48.19302, 16.37852],
          [48.19184, 16.37932],
          [48.19174, 16.37932]
        ],
        "tramM": 1565
      },
      {
        "id": "l-belvedere-adina-vie",
        "from": "belvedere",
        "to": "adina-vie",
        "mode": "walk",
        "min": 11,
        "text": "상궁 앞 Prinz-Eugen-Straße를 따라 남쪽으로 내려가 Gürtel을 건너고, Am Belvedere를 지나 Karl-Popper-Straße 숙소로 가요.",
        "m": 829,
        "path": [
          [48.19169, 16.38088],
          [48.19175, 16.38087],
          [48.19167, 16.38003],
          [48.19146, 16.37979],
          [48.19125, 16.37983],
          [48.19117, 16.37947],
          [48.18844, 16.38102],
          [48.18841, 16.38094],
          [48.18804, 16.38097],
          [48.18786, 16.38106],
          [48.18786, 16.38112],
          [48.18732, 16.38136],
          [48.1873, 16.3812],
          [48.18713, 16.38087],
          [48.18691, 16.38002],
          [48.18688, 16.37978],
          [48.18617, 16.38019]
        ]
      },
      {
        "id": "l-adina-vie-plachutta",
        "from": "adina-vie",
        "to": "plachutta",
        "mode": "transit",
        "min": 25,
        "text": "Hauptbahnhof에서 U1 Leopoldau 방면 Stephansplatz 하차, Wollzeile 쪽으로 걸어서 약 8분이에요. 또는 Stephansplatz에서 U3로 한 정거장 Stubentor."
      }
    ]
  }
};
