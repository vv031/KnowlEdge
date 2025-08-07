// Function to start countdown
function startCountdown() {
    const countdownElements = document.querySelectorAll('.countdown');

    countdownElements.forEach(element => {
        const publishTime = new Date(element.getAttribute('data-time'));

        function updateCountdown() {
            const now = new Date();
            const timeDiff = publishTime - now;

            if (timeDiff <= 0) {
                element.innerHTML = 'Available now!';
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            setTimeout(updateCountdown, 1000);
        }

        updateCountdown();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwt');
    const navList = document.querySelector('nav ul');

    // Remove existing login/logout links
    const loginLink = document.querySelector('nav ul li a[href="login.html"]');
    const logoutLink = document.querySelector('nav ul li a[href="logout.html"]');
    if (loginLink) loginLink.parentElement.remove();
    if (logoutLink) logoutLink.parentElement.remove();

    // Create new login/logout link elements
    const loginItem = document.createElement('li');
    const logoutItem = document.createElement('li');
    loginItem.innerHTML = '<a href="login.html">Login</a>';
    logoutItem.innerHTML = '<a href="logout.html">Logout</a>';

    if (token) {
        console.log('Token exists, adding logout link'); // Debugging
        navList.appendChild(logoutItem);
    } else {
        console.log('Token does not exist, adding login link'); // Debugging
        navList.appendChild(loginItem);
    }

    const postList = document.getElementById('post-list');
    const upcomingPostList = document.getElementById('upcoming-post-list');
    const upcomingPostsSection = document.getElementById('upcoming-posts-section');
    const courseList = document.getElementById('course-list');

    const maxItemsToShow = 3; // Maximum items to show initially

    // Fetch posts from the API
    fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(posts => {
            const now = new Date();
            let upcomingPostsExist = false;

            const upcomingPosts = posts
                .filter(post => new Date(post.publish_time) > now)
                .sort((a, b) => new Date(a.publish_time) - new Date(b.publish_time)); // Sort in ascending order

            const publishedPosts = posts
                .filter(post => new Date(post.publish_time) <= now)
                .sort((a, b) => new Date(b.publish_time) - new Date(a.publish_time)); // Sort in descending order


            if (upcomingPostList != null && upcomingPosts.length > 0) {
                upcomingPostsExist = true;
                upcomingPosts.slice(0, maxItemsToShow).forEach(post => {
                    const li = document.createElement('li');
                    li.classList.add('post-item');

                    const localPublishTime = new Date(post.publish_time).toLocaleString(); // Convert to local time
                    li.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>Publishing in: <span class="countdown" data-time="${new Date(post.publish_time).toISOString()}"></span></p>
                        <p>Local Publish Time: ${localPublishTime}</p>
                    `;

                    upcomingPostList.appendChild(li);
                });
            }

            if (upcomingPostsExist) {
                upcomingPostsSection.style.display = 'block';
                startCountdown();
            }

            publishedPosts.slice(0, maxItemsToShow).forEach(post => {
                const li = document.createElement('li');
                li.classList.add('post-item');

                const contentPreview = post.content.substring(0, 100) + '...';
                const publishTime = new Date(post.publish_time).toLocaleDateString();

                li.innerHTML = `
                    <a href="posts.html?id=${post.id}">${post.title}</a>
                    <p>${contentPreview}</p>
                    <p class="publish-time">Posted on: ${publishTime}</p>
                `;

                postList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });

    // Fetch courses from the API
    fetch('http://localhost:3000/api/courses')
        .then(response => response.json())
        .then(courses => {
            courses.slice(0, maxItemsToShow).forEach(course => {
                const li = document.createElement('li');
                li.classList.add('course-item');

                const discountPercentage = parseFloat(course.discount).toFixed(2);
                li.innerHTML = `
                    <div class="course-discount">${discountPercentage}% OFF</div>
                    <a href="courses.html?id=${course.id}">
                        <h3>${course.name}</h3>
                        <p>${course.description}</p>
                        <p>Price: ₹${(course.price - (course.price * (course.discount / 100))).toFixed(2)} <span class="original-price">₹${course.price}</span></p>
                    </a>
                `;

                courseList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
});
