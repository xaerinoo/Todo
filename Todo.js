// ➊ 투두 목록
// ⭐ 날짜 ⭐
let currentDate = new Date();   // 현재 날짜 (실시간)
const calendar = document.getElementById('calendar');
const yesterdayBtn = document.getElementById('yesterday-btn');
const tomorrowBtn = document.getElementById('tomorrow-btn');
const todoContainer = document.getElementById('todo-container');

// 날짜 포맷을 지정하는 함수: formatDate()
function formatDate(date) {
    return date.toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'});
}

// 날짜를 화면에 업데이트하는 함수: updateDate()
function updateDate() {
    calendar.textContent = formatDate(currentDate);
}

// 페이지 로드 후 실행 (DOM 준비 완료 후)
document.addEventListener('DOMContentLoaded', function() {
    // 날짜 설정
    updateDate();

    // 날짜 변경 버튼: yesterdayBtn, tomorrowBtn
    yesterdayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDate();
        showTodo();  // 날짜 변경 시 할 일 목록 다시 그리기
    });
    tomorrowBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDate();
        showTodo();  // 날짜 변경 시 할 일 목록 다시 그리기
    });

    showTodo();
});

// ⭐ 카테고리, 할 일 ⭐
let todo = {};  // 데이터를 저장할 곳 (처음에는 비어 있음)

// 현재 날짜의 할 일 데이터를 가져오는 함수: getCurrentTodo()
function getCurrentTodo() {
    let dateKey = formatDate(currentDate);
    if (!todo[dateKey]) {
        todo[dateKey] = {}; // 날짜별로 새 객체 생성
    }
    return todo[dateKey];
}

// 할 일 목록을 화면에 그리는 함수: showTodo()
function showTodo() {
    todoContainer.innerHTML = '';   // 기존 내용 지우기

    // 카테고리 추가 버튼: addCategoryBtn
    let addCategoryBtn = document.createElement('button');
    addCategoryBtn.textContent = '카테고리 ⊕';
    addCategoryBtn.className = 'add-category-btn';

    addCategoryBtn.addEventListener('click', function() {        
        let newCategory = prompt('✏️ 새로운 카테고리 이름을 입력하세요.');
        if (newCategory && typeof newCategory === 'string' && newCategory.trim() !== '') {
            let currentTodos = getCurrentTodo();
            if (!currentTodos[newCategory]) {
                currentTodos[newCategory] = []; // 새 카테고리에 빈 목록 추가
            } else {
                alert('이미 있는 카테고리');
                return;                
            }
            showTodo();
        } else {
            alert('⚠️ 유효하지 않은 카테고리 이름입니다.')
        }
    });
    todoContainer.appendChild(addCategoryBtn);

    // 각 카테고리와 할 일 표시
    let currentTodos = getCurrentTodo();
    for (let category in currentTodos) {
        let categoryBox = document.createElement('div');
        categoryBox.className = 'todo-div';

        // 카테고리 제목, 버튼 포함
        let cateHeader = document.createElement('div');
        cateHeader.style.display = 'flex';
        cateHeader.style.alignItems = 'center';

        let cateTitle = document.createElement('h3');
        cateTitle.textContent = category;

        // 카테고리 수정 버튼: editCateBtn
        let editCateBtn = document.createElement('button');
        editCateBtn.textContent = '수정';
        editCateBtn.addEventListener('click', function() {
            let newCategory = prompt('✏️ 카테고리를 어떻게 수정할까요?', category);
            if (newCategory && newCategory.trim() !== '' && newCategory !== category) {
                let taskItem = currentTodos[category];
                delete currentTodos[category];  // 카테고리 삭제
                currentTodos[newCategory] = taskItem;   // 수정된 이름의 카테고리로 이동
                showTodo();
            } else if (newCategory === category) {
                alert('⚠️ 같은 이름으로 변경할 수 없습니다!');
            }
        });
        // 카테고리 삭제 버튼: deleteCateBtn
        let deleteCateBtn = document.createElement('button');
        deleteCateBtn.textContent = '삭제';
        deleteCateBtn.addEventListener('click', function() {
            if (confirm('🗑️ 이 카테고리와 카테고리 내 모든 할 일을 삭제할까요?')) {
                delete currentTodos[category];  // 카테고리 삭제
                showTodo();
            }
        });

        // 할 일 추가 버튼: addTaskBtn
        let addTaskBtn = document.createElement('button');
        addTaskBtn.className = 'add-task-btn';
        addTaskBtn.textContent = '할 일 ⊕';
        addTaskBtn.addEventListener('click', function() {
        let newTodo = prompt('✏️ 새로운 할 일을 추가하세요.');
            if (newTodo) {
                currentTodos[category].push({text: newTodo, completed: false});   // 할 일 추가
                showTodo(); // 목록 다시 그리기
            }
        });

        cateHeader.appendChild(cateTitle);
        cateHeader.appendChild(editCateBtn);
        cateHeader.appendChild(deleteCateBtn);
        cateHeader.appendChild(addTaskBtn);
        categoryBox.appendChild(cateHeader);

        // 할 일 목록 만들기
        let taskList = document.createElement('ul');
        for (let i = 0; i < currentTodos[category].length; i++) {
            let task = currentTodos[category][i];
            if (!task || typeof task !== 'object') {
                task = {text: currentTodos[category][i], completed:false};  // 초기화
                currentTodos[category][i] = task;
            }

            let taskItem = document.createElement('li');
            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = category + '-' + i;   // 고유한 ID 만들기
            checkBox.checked = task.completed;

            let label = document.createElement('label');
            label.htmlFor = checkBox.id;
            label.textContent = task.text;
            if (task.completed) {
                label.classList.add('completed');
            }

            // 체크박스 클릭 시 (할 일 완료 시) 줄 긋기: css
            checkBox.addEventListener('change', function() {
                task.completed = checkBox.checked;
                if (checkBox.checked) {
                    label.classList.add('completed');
                } else {
                    label.classList.remove('completed');
                }
                updateCrystals(); // 크리스탈 UI 갱신
            });

            // 할 일 수정 버튼: editTaskBtn
            let editTaskBtn = document.createElement('button');
            editTaskBtn.textContent = '수정';
            editTaskBtn.addEventListener('click', function() {
                let newTodo = prompt('✏️ 할 일을 어떻게 수정할까요?', currentTodos[category][i]);
                if (newTodo) {
                    currentTodos[category][i] = newTodo;
                    showTodo(); // 목록 다시 그리기
                }
            });
            // 할 일 삭제 버튼: deleteTaskBtn
            let deleteTaskBtn = document.createElement('button');
            deleteTaskBtn.textContent = '삭제';
            deleteTaskBtn.addEventListener('click', function() {
                if (confirm('🗑️ 이 할 일을 삭제할까요?')) {
                    currentTodos[category].splice(i, 1);    // 해당 항목 삭제
                    showTodo(); // 목록 다시 그리기
                }
            });

            taskItem.appendChild(checkBox);
            taskItem.appendChild(label);
            taskItem.appendChild(editTaskBtn);
            taskItem.appendChild(deleteTaskBtn);
            taskList.appendChild(taskItem);
        }

        categoryBox.appendChild(taskList);

        todoContainer.appendChild(categoryBox);
    }
    updateCrystals();
}

// ➋ 크리스탈 북 (구슬 컬렉션)
const ideaContainer = document.getElementById('idea-container');

// 감정 크리스탈 데이터 초기화
let crystalBook = {
    emotions: {
        '차분': {color: '#78C3C9', image: '/Todo/assets/차분.png', collected: 0},
        '행복': {color: '#FCE7AE', image: '/Todo/assets/행복.png', collected: 0},
        '열정': {color: '#F9BEB0', image: '/Todo/assets/열정.png', collected: 0},
        '슬픔': {color: '#79CCEC', image: '/Todo/assets/슬픔.png', collected: 0},
        '실망': {color: '#868377', image: '/Todo/assets/실망.png', collected: 0},
        '짜증': {color: '#E8A8B8', image: '/Todo/assets/짜증.png', collected: 0},
        '분노': {color: '#C09BBC', image: '/Todo/assets/분노.png', collected: 0}
    },
    collectedCount: 0,
    collectionOrder: []    // 수집 순서를 저장할 배열
};

// 크리스탈을 화면에 렌더링하는 함수: updateCrystals
function updateCrystals() {
    ideaContainer.innerHTML = '<h2>My Crystal Selection</h2>';

    // 크리스탈 선택 버튼 (할 일 완료 시 활성화) : selectCrysBtn
    let selectCrysBtn = document.createElement('button');
    selectCrysBtn.textContent = '💎 오늘의 감정 💎';
    selectCrysBtn.className = 'select-crystal-btn';
    
    selectCrysBtn.disabled = !allDone();
    selectCrysBtn.addEventListener('click', selectCrystal);
    ideaContainer.appendChild(selectCrysBtn);

    // 크리스탈 수집 목록
    // 어항 컨테이너
    let crystalTank = document.createElement('div');
    crystalTank.className = 'crystal-tank';
    ideaContainer.appendChild(crystalTank);

    crystalBook.collectionOrder.forEach((emotion, index) => {
        let collectedCrystal = document.createElement('div');
        collectedCrystal.className = 'crystal-bubble';
        collectedCrystal.style.backgroundImage = `url(${crystalBook.emotions[emotion].image})`;
        crystalTank.appendChild(collectedCrystal);  // 시간 순서대로 추가
    });
}

// 할 일 완료 여부 확인 함수: allDone()
function allDone() {
    let currentTodos = getCurrentTodo();
    // 카테고리가 하나 이상 있어야 함
    if (Object.keys(currentTodos).length === 0) return false;
    // 각 카테고리 내 할 일이 하나 이상이고!! 모두 완료되었는지 확인
    for (let category in currentTodos) {
        for (let category in currentTodos) {
            /* 할 일이 하나도 없어도 카테고리만 있으면
            크리스탈 선택 버튼이 활성화되는 것을 막기 위해
            할 일이 없는 카테고리면 false를 반환 */
            if (currentTodos[category].length === 0) return false;

            for (let task of currentTodos[category]) {
            if (!task.completed) return false;  // 완료되지 않은 할 일이 있으면 false 반환
            }
        }
        return true;    // 모든 조건 만족 시 true
    }
    return Object.keys(currentTodos).length > 0;    // 카테고리가 있어야 함
}

// 크리스탈 선택 모달을 띄울 함수: selectCrystal()
function selectCrystal() {
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    let modalContent = document.createElement('div');
    modalContent.style.position = 'relative';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.width = '450px';
    modalContent.style.textAlign = 'center';

    let message = document.createElement('p');
    message.textContent = '짝짝짝!👏🏻 수고했어요. 오늘 당신의 감정은 무엇인가요? ✨';

    let options = Object.keys(crystalBook.emotions)
    .map(emotion => {
        let btn = document.createElement('button');
        btn.textContent = emotion;
        btn.style.margin = '5px';
        btn.style.padding = '5px 10px';
        btn.style.backgroundColor = crystalBook.emotions[emotion].color;
        
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', () => {
            collectCrystal(emotion);
            document.body.removeChild(modal);   // 모달 닫기
        });
        return btn;
    });

    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'X';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '12px';
    closeBtn.style.padding = '0';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => document.body.removeChild(modal));

    modalContent.appendChild(message);
    options.forEach(option => modalContent.appendChild(option));
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// 크리스탈 수집 함수: collectCrystal
function collectCrystal (emotion) {
    crystalBook.emotions[emotion].collected += 1;
    crystalBook.collectedCount += 1;
    crystalBook.collectionOrder.push(emotion);  // 수집 순서 기록
    updateCrystals();
    alert(`${emotion} 크리스탈을 획득했습니다! ✨`);
}