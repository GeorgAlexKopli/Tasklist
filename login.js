document.getElementById('loginForm').addEventListener('submit', async event => {
    event.preventDefault();
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';

    try {
        const user = await apiRequest('/users/get-token', {
            method: 'POST',
            body: JSON.stringify({
                username: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        });
        sessionStorage.setItem('access_token', user.access_token);
        window.location.href = 'tasklist.html';
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
});

document.getElementById('registerBtn').addEventListener('click', () => {
    window.location.href = 'registration.html';
});
