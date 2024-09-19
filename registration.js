document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting

    // Collect the form data
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const password = document.getElementById('password').value;

    // Retrieve existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('User already registered. Please log in.');
        return;
    }

    // Create a new user object
    const user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    };

    // Add new user to the array
    users.push(user);

    // Save updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Simulate successful registration
    alert('Registration successful! Redirecting to login page...');

    // Redirect to index.html (the login page) after successful registration
    window.location.href = 'index.html';
});
