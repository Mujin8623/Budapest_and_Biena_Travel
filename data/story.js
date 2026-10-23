/* Tour-mode long narration ("story") for 3 stops + 2 Belvedere artworks (2026-11-29).
   Other stops/artworks fall back to the short text in data/guide.js.
   Spoken 해요체. Facts reused from data/guide.js; extra facts marked [+] in comments, each from the cited Wikipedia page.
   Paragraph ids: s-<stop>-<n> / sa-<artwork>-<n>. audio: null until the user's voice sample is ready. */
window.TRIP_STORY = {
  "2026-11-29": {
    stops: {
      staatsoper: {
        paras: [
          { id: "s-staatsoper-1", audio: null, text: "자, 고개를 들어 보세요. 지금 우리 앞에 있는 건물이 빈 국립 오페라 극장이에요." },
          { id: "s-staatsoper-2", audio: null, text: "옛 성벽을 허문 자리에 링슈트라세라는 큰 길이 생겼는데, 이 극장이 그 길에 처음 들어선 큰 건물이에요." },
          /* [+] 황제 부부 참석 — Vienna State Opera (Wikipedia) */
          { id: "s-staatsoper-3", audio: null, text: "1869년 5월 25일, 프란츠 요제프 황제와 엘리자베트 황후가 지켜보는 가운데 모차르트의 〈돈 조반니〉로 문을 열었어요." },
          /* [+] '가라앉은 보물 상자', 길 높이 1 m — Vienna State Opera (Wikipedia) */
          { id: "s-staatsoper-4", audio: null, text: "그런데 처음엔 평이 좋지 않았대요. 공사 도중 앞길이 1 m쯤 높아지는 바람에 '가라앉은 보물 상자' 같다는 놀림을 받았거든요." },
          { id: "s-staatsoper-5", audio: null, text: "설계한 두 건축가 판 데어 뉠과 지카르츠부르크는 안타깝게도 1868년에 세상을 떠나, 끝내 완공을 보지 못했어요." },
          /* [+] 앞부분(로비·계단·슈빈트 프레스코)은 남음 — Vienna State Opera (Wikipedia) */
          { id: "s-staatsoper-6", audio: null, text: "1945년 3월 12일 폭격으로 객석과 무대는 불탔지만, 미리 벽으로 막아 둔 앞부분은 살아남았어요. 모리츠 폰 슈빈트의 프레스코가 있는 로비와 큰 계단이 그때 그대로예요." },
          { id: "s-staatsoper-7", audio: null, text: "그리고 1955년 11월 5일, 베토벤의 〈피델리오〉로 다시 문을 열었어요. 같은 해 5월에는 오후에 갈 벨베데레에서 오스트리아 국가조약이 서명됐으니, 빈 사람들에겐 정말 특별한 한 해였죠." },
          { id: "s-staatsoper-8", audio: null, text: "오늘은 정면과 로지아만 보고 지나가요. 극장 옆길을 따라 뒤편으로 돌면 카페 자허예요." }
        ],
        sources: [{ title: "Vienna State Opera (Wikipedia)", url: "https://en.wikipedia.org/wiki/Vienna_State_Opera" }]
      },
      "cafe-sacher": {
        paras: [
          { id: "s-cafe-sacher-1", audio: null, text: "드디어 달콤한 시간이에요. 자리에 앉으셨으면, 토르테가 나오는 동안 이야기 하나 들려 드릴게요." },
          { id: "s-cafe-sacher-2", audio: null, text: "1832년, 메테르니히가 손님들을 위한 디저트를 주문했는데, 그걸 만든 사람이 열다섯이나 열여섯 살 견습생 프란츠 자허였다고 전해져요." },
          /* [+] 1840년대 프레스부르크 설 — Sachertorte (Wikipedia) */
          { id: "s-cafe-sacher-3", audio: null, text: "다만 이건 전해 오는 이야기예요. 자허 본인은 훗날 1840년대에 만들었다고 말한 적도 있어서, 정확한 기록은 없어요." },
          { id: "s-cafe-sacher-4", audio: null, text: "아들 에두아르트가 1876년 호텔 자허를 열면서 이 케이크를 메뉴에 올렸고, 그때부터 빈의 명물이 됐어요." },
          /* [+] 시트 두 겹 vs 한 겹, '데멜의 자허토르테' — Sachertorte (Wikipedia) */
          { id: "s-cafe-sacher-5", audio: null, text: "어제 갔던 데멜과는 '원조' 이름을 두고 긴 다툼이 있었어요. 시트를 두 겹으로 하느냐 한 겹으로 하느냐까지 따졌대요. 1963년에 끝났고, 그 뒤로 데멜은 '데멜의 자허토르테'라는 이름으로 팔아요." },
          { id: "s-cafe-sacher-6", audio: null, text: "한 입 잘라 보면 초콜릿 시트 사이로 살구잼이 보일 거예요. 이게 맛의 포인트예요." },
          { id: "s-cafe-sacher-7", audio: null, text: "꽤 달아요. 그래서 빈에서는 달지 않은 생크림, 슐라크를 곁들여 먹어요. 꼭 같이 드세요." },
          { id: "s-cafe-sacher-8", audio: null, text: "천천히 드시고, 다 드시면 광장 건너편 알베르티나 테라스로 올라가요." }
        ],
        sources: [{ title: "Sachertorte (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sachertorte" }]
      },
      stephansdom: {
        paras: [
          { id: "s-stephansdom-1", audio: null, text: "고개를 끝까지 젖혀 보세요. 저 뾰족한 탑이 높이 136 m 남탑이에요. 1433년에 완성됐어요." },
          /* [+] 콘라트 3세, 제2차 십자군 — St. Stephen's Cathedral (Wikipedia) */
          { id: "s-stephansdom-2", audio: null, text: "이 자리에 첫 성당이 봉헌된 건 1147년이에요. 제2차 십자군 원정을 떠나려던 콘라트 3세가 그 자리에 있었대요." },
          { id: "s-stephansdom-3", audio: null, text: "이제 지붕을 보세요. 유약 바른 기와 약 23만 장으로 덮여 있고, 남쪽 면에는 쌍두독수리 무늬가 있어요." },
          /* [+] 1945.4.12 화재로 지붕 붕괴 — St. Stephen's Cathedral (Wikipedia) */
          { id: "s-stephansdom-4", audio: null, text: "1945년 4월 12일, 전쟁 막바지에 근처 상점에서 난 불이 바람을 타고 옮겨붙어 지붕이 무너졌어요. 지금 보는 지붕은 전쟁 뒤에 다시 올린 거예요." },
          { id: "s-stephansdom-5", audio: null, text: "모차르트는 1782년 8월 4일 이곳에서 콘스탄체와 결혼했어요." },
          /* [+] 본당, 부악장 임명 — St. Stephen's Cathedral (Wikipedia) */
          { id: "s-stephansdom-6", audio: null, text: "근처 피가로 하우스에 살 때 여기가 그의 본당이었고, 세상을 떠나기 얼마 전에는 대성당 부악장으로 임명되기도 했어요." },
          { id: "s-stephansdom-7", audio: null, text: "일요일 관광 관람은 13:00–16:30이라 이제 들어가면 돼요. 입구 쪽 뒷부분은 무료예요." },
          { id: "s-stephansdom-8", audio: null, text: "안에서는 목소리를 낮추고, 천천히 한 바퀴 돌아봐요. 나오면 점심 먹으러 소시지 가판으로 가요." }
        ],
        sources: [
          { title: "St. Stephen's Cathedral, Vienna (Wikipedia)", url: "https://en.wikipedia.org/wiki/St._Stephen%27s_Cathedral,_Vienna" },
          { title: "Stephansdom 관람 시간 (공식)", url: "https://www.stephanskirche.at/" }
        ]
      }
    },
    artworks: {
      "a-kiss": {
        paras: [
          { id: "sa-kiss-1", audio: null, text: "이 방에서 사람이 제일 많이 모여 있는 그림, 클림트의 〈키스〉예요." },
          /* [+] 쿤스트샤우 = 황제 즉위 60주년 — The Kiss (Wikipedia) */
          { id: "sa-kiss-2", audio: null, text: "1908년 쿤스트샤우 전시에 '연인'이라는 제목으로 처음 걸렸어요. 프란츠 요제프 황제 즉위 60주년에 맞춰 열린 전시였어요." },
          { id: "sa-kiss-3", audio: null, text: "반응이 정말 좋아서, 아직 완성되기도 전에 국가가 사들였어요. 그래서 지금도 여기 있어요." },
          /* [+] 대학 천장화 스캔들 — The Kiss (Wikipedia) */
          { id: "sa-kiss-4", audio: null, text: "불과 몇 년 전 클림트는 빈 대학 천장화로 '외설'이라는 비난까지 받았는데, 이 그림으로 분위기가 확 바뀐 셈이에요." },
          /* [+] 1903년 라벤나 모자이크 — The Kiss (Wikipedia) */
          { id: "sa-kiss-5", audio: null, text: "180 cm 정사각형 캔버스에 금박과 은, 백금을 썼어요. 1903년 이탈리아 라벤나에서 본 비잔틴 모자이크에서 영감을 받았대요." },
          { id: "sa-kiss-6", audio: null, text: "가까이 가서 옷을 보세요. 남자 옷은 네모난 무늬, 여자 옷은 꽃무늬예요. 두 사람이 선 꽃밭은 여자의 발아래에서 뚝 끊겨요." },
          /* [+] 모델 설, 증거 없음 — The Kiss (Wikipedia) */
          { id: "sa-kiss-7", audio: null, text: "모델이 클림트와 에밀리 플뢰게라는 이야기도 있지만, 증거는 없어요. 누구라고 생각되세요?" }
        ],
        sources: [{ title: "The Kiss (Wikipedia)", url: "https://en.wikipedia.org/wiki/The_Kiss_(Klimt)" }]
      },
      "a-tod-maedchen": {
        paras: [
          /* [+] 150×180 cm, 원래 제목 — Death and the Maiden (Schiele) (Wikipedia) */
          { id: "sa-tod-maedchen-1", audio: null, text: "이번엔 에곤 실레의 〈죽음과 소녀〉예요. 가로 180 cm의 큰 그림이에요." },
          { id: "sa-tod-maedchen-2", audio: null, text: "실레는 처음에 이 그림을 '남자와 소녀', '얽힌 사람들'이라고 불렀대요." },
          { id: "sa-tod-maedchen-3", audio: null, text: "1915년, 실레는 에디트 하름스와 결혼했고, 곧 1차 세계대전에 징집됐어요." },
          /* [+] 1911년, 열일곱 살 발리 노이칠 — Egon Schiele (Wikipedia) */
          { id: "sa-tod-maedchen-4", audio: null, text: "그 전 1911년부터 곁에는 발리 노이칠이 있었어요. 열일곱 살에 실레를 만나 함께 살며 많은 그림의 모델이 되어 준 사람이에요." },
          { id: "sa-tod-maedchen-5", audio: null, text: "그래서 이 그림은 발리와의 이별을 담았다고 흔히 해석해요. 수도복 차림의 남자가 죽음, 그를 꼭 붙든 여자가 소녀예요." },
          { id: "sa-tod-maedchen-6", audio: null, text: "두 사람이 서로 매달린 손을 한번 보세요. 잡고 있는 걸까요, 놓으려는 걸까요." },
          { id: "sa-tod-maedchen-7", audio: null, text: "실레는 3년 뒤인 1918년, 스물여덟에 스페인 독감으로 세상을 떠났어요. 같은 층의 〈가족〉이 그 마지막 해의 그림이에요." }
        ],
        sources: [
          { title: "Death and the Maiden (Schiele) (Wikipedia)", url: "https://en.wikipedia.org/wiki/Death_and_the_Maiden_(Schiele)" },
          { title: "Egon Schiele (Wikipedia)", url: "https://en.wikipedia.org/wiki/Egon_Schiele" }
        ]
      }
    }
  }
};
