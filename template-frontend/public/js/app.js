document.addEventListener('DOMContentLoaded', checkAuthStatus);

function checkAuthStatus() {
    fetch('http://localhost:3000/auth/status', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.authenticated) {
            showWelcomeMessage(data.user.name);
        } else {
            showLoginButton();
        }
    })
    .catch(error => console.error('Error:', error));
}

function showWelcomeMessage(name) {
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('welcome-message').style.display = 'block';
    document.getElementById('user-name').textContent = name;
}

function showLoginButton() {
    document.getElementById('login-button').style.display = 'block';
    document.getElementById('welcome-message').style.display = 'none';
}

function logout() {
    fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(() => {
        showLoginButton();
    })
    .catch(error => console.error('Error:', error));
}
