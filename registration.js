document.getElementById('registerForm').addEventListener('submit', async event => {
    event.preventDefault();

    try {
        await apiRequest('/users', {
            method: 'POST',
            body: JSON.stringify({
                username: document.getElementById('email').value,
                firstname: document.getElementById('firstName').value,
                lastname: document.getElementById('lastName').value,
                newPassword: document.getElementById('password').value
            })
        });
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message);
    }
});
