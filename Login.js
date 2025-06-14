// ⭐ 화면 전환(로그인 → 투두) + 로그인 기능 ⭐
document.addEventListener('DOMContentLoaded', ()  => {
    const loginButton = document.getElementById('login-btn');

    if (loginButton) {
        loginButton.addEventListener('click', function() {
            event.preventDefault(); // alert 창이 뜨더라도 작성했던 폼 내용이 리셋되지 않도록 방지

            const loginPage = document.getElementById('login-page');
            const todoPage = document.getElementById('todo-page');

            const name = document.getElementById('write-name').value.trim();
            const email = document.getElementById('write-email').value.trim();
            const password = document.getElementById('write-password').value.trim();
            const checkBox = document.getElementById('please-check');

            if (!name || !email || !password) {
                alert('📢 이름, 이메일, 비밀번호를 모두 입력했는지 확인해주세요!');
                return;
            }

            if (!checkBox.checked) {
                alert('📢 개인정보 수집·이용 동의에 체크해 주세요!');
                return;
            }

            // 버튼 클릭 효과: 로그인 버튼 클릭 시 로그인 페이지에서 투두 페이지로 페이지 전환
            // 버튼 클릭 애니메이션: css에서 작성한 'pulse' 사용
            // 화면 전환 애니메이션: css에서 작성한 'fade-out', 'fade-in' 사용
            loginButton.classList.add('pulse');
            setTimeout(() => {
                loginButton.classList.remove('pulse');
                // 화면 전환
                loginPage.classList.add('fade-out');
                setTimeout(() => {
                    loginPage.style.display = 'none';
                    todoPage.style.display = 'flex';
                    todoPage.classList.add('fade-in');
                }, 500);
            }, 400);
        });
    }
});