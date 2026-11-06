document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('access_token');
    window.location.href = 'index.html';
});
