// Function to get JWT token from local storage
const getToken = () => {
    return localStorage.getItem('jwt');
};

document.addEventListener('DOMContentLoaded', () => {
    // Buttons for managing posts, courses, and users
    const manageButtons = document.querySelectorAll('.manage-button');
    // Secondary buttons for specific actions
    const optionButtons = document.querySelectorAll('.option-button');
    // Forms
    const forms = {
        'create-post-form': document.getElementById('create-post-form'),
        'update-post-form': document.getElementById('update-post-form'),
        'delete-post-form': document.getElementById('delete-post-form'),
        'create-course-form': document.getElementById('create-course-form'),
        'update-course-form': document.getElementById('update-course-form'),
        'delete-course-form': document.getElementById('delete-course-form'),
        'get-users-form': document.getElementById('get-users-form'),
        'delete-user-form': document.getElementById('delete-user-form'),
    };

    // Function to hide all forms
    const hideAllForms = () => {
        Object.values(forms).forEach(form => form.style.display = 'none');
        document.getElementById('users-table').style.display = 'none'; // Hide users table
    };

    // Event listeners for manage buttons
    manageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            document.querySelectorAll('.options').forEach(option => {
                option.style.display = option.id === target ? 'block' : 'none';
            });
            hideAllForms(); // Hide all forms when a manage button is clicked
        });
    });

    // Event listeners for option buttons
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideAllForms(); // Hide all forms before showing the selected one
            const target = button.getAttribute('data-target');
            if (forms[target]) {
                forms[target].style.display = 'block';
            }
            if (target === 'get-users-form') {
                document.getElementById('users-table').style.display = 'table';
            }
        });
    });

    // Function calls to ensure the specific thing is shown below
    manageButtons.forEach(button => button.click());

    // Create Post
    const createPostForm = document.getElementById('create-post-form');
    if (createPostForm) {
        createPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = getToken(); // Get the JWT token
            const formData = new FormData(createPostForm);

            console.log(formData); // debugging
            // Convert local datetime to UTC ISO 8601 format with Z 
            const localDate = new Date(formData.get('publishtime'));
            const isoTimestamp = localDate.toISOString();

            const postData = {
                title: formData.get('title'),
                content: formData.get('content'),
                publish_time: isoTimestamp
            };

            fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xauth': `jwt=${token}; Path=/; Secure; HttpOnly;`
                },
                body: JSON.stringify(postData),
                credentials: 'include' // Include cookies in request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Post created successfully!');
                    createPostForm.reset();
                })
                .catch(error => {
                    console.error('Error creating post:', error.message);
                });
        });
    }

    // Update Post
    const updatePostForm = document.getElementById('update-post-form');
    if (updatePostForm) {
        updatePostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = getToken(); // Get the JWT token
            const formData = new FormData(updatePostForm);
            const postId = formData.get('id');
            const postData = {
                title: formData.get('title'),
                content: formData.get('content'),
                publish_time: new Date().toISOString()
            };

            fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'xauth': `jwt=${token}; Path=/; Secure; HttpOnly;`
                },
                body: JSON.stringify(postData),
                credentials: 'include' // Include cookies in request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Post updated successfully!');
                    updatePostForm.reset();
                })
                .catch(error => {
                    console.error('Error updating post:', error.message);
                });
        });
    }

    // Delete Post
    const deletePostForm = document.getElementById('delete-post-form');
    if (deletePostForm) {
        deletePostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = getToken(); // Get the JWT token
            const formData = new FormData(deletePostForm);
            const postId = formData.get('id');

            fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'xauth': `jwt=${token}; Path=/; Secure; HttpOnly;`
                },
                credentials: 'include' // Include cookies in request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Post deleted successfully!');
                    deletePostForm.reset();
                })
                .catch(error => {
                    console.error('Error deleting post:', error.message);
                });
        });
    }

    // Create Course
    const createCourseForm = document.getElementById('create-course-form');
    if (createCourseForm) {
        createCourseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = getToken(); // Get the JWT token
            const formData = new FormData(createCourseForm);
            const courseData = {
                name: formData.get('name'),
                description: formData.get('description'),
                price: formData.get('price'),
                discount: formData.get('discount')
            };

            fetch('http://localhost:3000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xauth': `jwt=${token}; Path=/; Secure; HttpOnly;`
                },
                body: JSON.stringify(courseData),
                credentials: 'include' // Include cookies in request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Course created successfully!');
                    createCourseForm.reset();
                })
                .catch(error => {
                    console.error('Error creating course:', error.message);
                });
        });
    }

    // Update Course
    const updateCourseForm = document.getElementById('update-course-form');
    if (updateCourseForm) {
        updateCourseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = getToken(); // Get the JWT token
            const formData = new FormData(updateCourseForm);
            const courseId = formData.get('id');
            const courseData = {
                name: formData.get('name'),
                description: formData.get('description'),
                price: formData.get('price'),
                discount: formData.get('discount')
            };

            fetch(`http://localhost:3000/api/courses/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'xauth': `jwt=${token}; Path=/; Secure; HttpOnly;`
                },
                body: JSON.stringify(courseData),
                credentials: 'include' // Include cookies in request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Course updated successfully!');
                    updateCourseForm.reset();
                })
                .catch(error => {
                    console.error('Error updating course:', error.message);
                });
        });
    }

    // Delete Course
    const deleteCourseForm = document.getElementById('delete-course-form');
    if (deleteCourseForm) {
        deleteCourseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = getToken(); // Get the JWT token
            const formData = new FormData(deleteCourseForm);
            const courseId = formData.get('id');

            fetch(`http://localhost:3000/api/courses/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'xauth': `jwt=${token}; Path=/; Secure; HttpOnly;`
                },
                credentials: 'include' // Include cookies in request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Course deleted successfully!');
                    deleteCourseForm.reset();
                })
                .catch(error => {
                    console.error('Error deleting course:', error.message);
                });
        });
    }

    // Get All Users
    const getUsersForm = document.getElementById('get-users-form');
    if (getUsersForm) {
        getUsersForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = getToken(); // Get the JWT token

            fetch('http://localhost:3000/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'xauth': `jwt=${token}; Path=/; Secure; HttpOnly;`
                },
                credentials: 'include' // Include cookies in request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(users => {
                    const usersTable = document.getElementById('users-table');
                    const usersTableBody = usersTable.querySelector('tbody');
                    usersTableBody.innerHTML = ''; // Clear existing rows

                    // Populate the table with user data
                    users.forEach(user => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.admin}</td>
                `;
                        usersTableBody.appendChild(row);
                    });

                    usersTable.style.display = 'table'; // Show the table
                })
                .catch(error => {
                    console.error('Error fetching users:', error.message);
                });
        });
    }

    // Delete User
    const deleteUserForm = document.getElementById('delete-user-form');
    if (deleteUserForm) {
        deleteUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = getToken(); // Get the JWT token
            const formData = new FormData(deleteUserForm);
            const userId = formData.get('id');

            fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'xauth': `jwt=${token}; Path=/; Secure; HttpOnly;`
                },
                credentials: 'include' // Include cookies in request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('User deleted successfully!');
                    deleteUserForm.reset();
                })
                .catch(error => {
                    console.error('Error deleting user:', error.message);
                });
        });
    }
});
