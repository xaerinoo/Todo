// 명언 배열
const quoteArray = [
    "하루에 3시간을 걸으면\n7년 후에 지구를 한바퀴 돌 수 있다.",
    "언제나 현재에 집중할 수 있다면 행복할 것이다.",
    "진정으로 웃으려면 고통을 참아야 하며,\n나아가 고통을 즐길 줄 알아야 한다.",
    "직업에서 행복을 찾아라.\n아니면 행복이 무엇인지 절대 모를 것이다.",
    "신은 용기있는 자를 결코 버리지 않는다.",
    "행복의 문이 하나 닫히면 다른 문이 열린다.\n그러나 우리는 종종 닫힌 문을 멍하니 바라보다가\n우리를 향해 열린 문을 보지 못하게 된다.",
    "피할 수 없으면 즐겨라.",
    "먼저 자신을 비웃어라.\n다른 사람이 당신을 비웃기 전에.",
    "먼저 핀 꽃은 먼저 진다.\n남보다 먼저 공을 세우려고\n조급히 서두를 것이 아니다.",
    "절대 어제를 후회하지 마라.\n인생은 오늘의 나 안에 있고\n내일은 스스로 만드는 것이다.",
    "어리석은 자는 멀리서 행복을 찾고,\n현명한 자는 자신의 발치에서\n행복을 키워간다.",
    "너무 소심하고 까다롭게\n자신의 행동을 고민하지 말라.\n모든 인생은 실험이다.\n더 많이 실험할수록 더 나아진다.",
    "한번의 실패와 영원한 실패를 혼동하지 마라.",
    "내일은 내일의 태양이 뜬다.",
    "오랫동안 꿈을 그리는 사람은\n마침내 그 꿈을 닮아 간다.",
    "좋은 성과를 얻으려면\n한 걸음 한 걸음이\n힘차고 충실하지 않으면 안 된다.",
    "성공의 비결은 단 한 가지,\n잘할 수 있는 일에\n광적으로 집중하는 것이다.",
    "자신감 있는 표정을 지으면 자신감이 생긴다.",
    "평생 살 것처럼 꿈을 꾸어라.\n그리고 내일 죽을 것처럼 오늘을 살아라.",
    "고통이 남기고 간 뒤를 보라!\n고난이 지나면 반드시 기쁨이 스며든다.",
    "꿈을 계속 간직하고 있으면\n반드시 실현할 때가 온다.",
    "마음만을 가지고 있어서는 안 된다.\n반드시 실천해야 한다.",
    "만약 우리가 할 수 있는 일을 모두 한다면\n우리들은 우리 자신에 깜짝 놀랄 것이다.",
    "겨울이 오면 봄이 멀지 않으리.",
    "인생에 뜻을 세우는데 있어 늦은 때라곤 없다.",
    "도중에 포기하지 말라.\n망설이지 말라.\n최후의 성공을 거둘 때까지 밀고 나가자.",
    "우리는 두려움의 홍수에 버티기 위해서\n끊임없이 용기의 둑을 쌓아야 한다.",
    "이미 끝나버린 일을 후회하기보다는\n하고 싶었던 일들을 하지 못한 것을 후회하라."
]

// 명언 줄바꿈
function quoteBreak(quote) {
    return quote.replace(/\n/g, '<br>');
}

// ⭐ 로그인 페이지: 자동 명언 업데이트 ⭐
const loginQuote = document.getElementById('quote-1');
let loginQuoteIndex = 0;

function updateLoginQuote() {
    if (loginQuote) {
        loginQuote.classList.add('fade-out');
        setTimeout(() => {
            loginQuote.innerHTML = quoteBreak(quoteArray[loginQuoteIndex]);
            loginQuote.classList.remove('fade-out');
            loginQuote.classList.add('fade-in');
            setTimeout(() => {
                loginQuote.classList.remove('fade-in');
            }, 500);
            loginQuoteIndex = (loginQuoteIndex + 1) % quoteArray.length;
        }, 500);
    }
}

if (loginQuote) {
    updateLoginQuote();
    setInterval(updateLoginQuote, 4000);    // 4초마다 갱신
}

// ⭐ 투두 페이지: 버튼으로 넘기는 명언 ⭐
const todoQuote = document.getElementById('quote-2');
let todoQuoteIndex = 0;

function flipTodoQuote() {
    if (todoQuote) {
        todoQuote.textContent = quoteArray[todoQuoteIndex];
    }
}

document.addEventListener('DOMContentLoaded', todoQuoteBtn);
function todoQuoteBtn() {
    const quoteContainer = document.querySelector('.quote-container');
    const quoteBanner = document.querySelector('.quote-banner');

    const beforeBtn = document.getElementById('prev-btn');
    const afterBtn = document.getElementById('next-btn');
    const closeBtn = document.getElementById('close-btn');

    // 명언 보기 버튼 추가
    const openBtn = document.createElement('button');
    openBtn.textContent = '명언 배너'
    openBtn.id = 'open-btn';
    openBtn.style.display = 'none'  // 처음에는 숨김
    quoteContainer.appendChild(openBtn);

    if (todoQuote && beforeBtn && afterBtn && closeBtn) {
        flipTodoQuote();

        beforeBtn.addEventListener('click', () => {
            todoQuoteIndex = (todoQuoteIndex - 1 + quoteArray.length) % quoteArray.length;
            flipTodoQuote();
        });

        afterBtn.addEventListener('click', () => {
            todoQuoteIndex = (todoQuoteIndex +1) % quoteArray.length;
            flipTodoQuote();
        });

        // 명언 배너 닫기 버튼 클릭 이벤트
        closeBtn.addEventListener('click', () => {
            if (quoteBanner) {
                quoteBanner.style.display = 'none';
                beforeBtn.style.display = 'none';
                afterBtn.style.display = 'none';
                closeBtn.style.display = 'none';
                openBtn.style.display = 'block';
            }
        });

        // 명언 배너 열기 버튼 클릭 이벤트
        openBtn.addEventListener('click', () => {
            if (quoteBanner && beforeBtn && afterBtn && closeBtn) {
                quoteBanner.style.display = 'flex';
                beforeBtn.style.display = 'block';
                afterBtn.style.display = 'block';
                closeBtn.style.display = 'block';
                openBtn.style.display = 'none';
            }
        });
    }
}