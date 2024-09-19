function handleLogout() {
    // Remove logged-in user's email from localStorage
    localStorage.removeItem('loggedInUserEmail');
   
    // Redirect to the login page
    window.location.href = 'index.html'; 
}

// Attach event listener to the logout button
window.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
