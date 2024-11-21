document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-container form');
    const registerForm = document.querySelector('#register-container form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const storedUser = localStorage.getItem(username);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.password === password) {
                alert('Login bem-sucedido!');
                window.location.href = 'index.html';
                // Redirecionar ou realizar outras ações após o login
            } else {
                alert('Senha incorreta!');
            }
        } else {
            alert('Usuário não encontrado!');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

        if (localStorage.getItem(username)) {
            alert('Usuário já existe!');
        } else {
            const user = {
                username: username,
                email: email,
                password: password
            };
            localStorage.setItem(username, JSON.stringify(user));
            alert('Registro bem-sucedido!');
            toggleForms();
        }
    });
});

function toggleForms() {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    if (loginContainer.style.display === 'none') {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    }
}