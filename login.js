document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Find the user with matching credentials
    const user = users.find(u => u.email === email && u.password === password);

    // Simple validation
    if (user) {
        // Save the logged-in user's email in localStorage
        localStorage.setItem('loggedInUserEmail', user.email);

        // Redirect to tasklist.html if credentials are correct
        window.location.href = 'tasklist.html';
    } else {
        // Show error message if credentials are incorrect
        document.getElementById('errorMessage').style.display = 'block';
    }
});

// Navigate to registration.html when the Register button is clicked
document.getElementById('registerBtn').addEventListener('click', function() {
    window.location.href = 'registration.html';
});
