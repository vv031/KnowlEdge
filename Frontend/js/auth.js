document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const loginData = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // debug
                    if (data.message === "Login successful") {
                        // Set the JWT as a cookie
                        // document.cookie = `jwt=${data.jwt}; Path=/; Secure; HttpOnly;`;

                        // set in local storage
                        localStorage.setItem('jwt', data.jwt);
                        localStorage.setItem('userID', data.userID);

                        alert('Login successful!');
                        window.location.href = 'index.html'; // Redirect to homepage
                    } else {
                        alert('Login failed. Please check your credentials.');
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                });
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const signupData = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "Signup successful") {
                        alert('Signup successful!');
                        window.location.href = 'login.html'; // Redirect to login page
                    } else {
                        alert('Signup failed. Please check your details.');
                    }
                })
                .catch(error => {
                    console.error('Error during signup:', error);
                });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('jwt');

            fetch('http://localhost:3000/api/users/logout', {
                method: 'POST',
                credentials: 'include' // Include cookies in request
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "Logout successful") {
                        alert('Logout successful!');
                        window.location.href = 'login.html'; // Redirect to login page
                    } else {
                        alert('Logout failed. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error during logout:', error);
                });
        });
    }
});
