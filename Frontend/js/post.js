document.addEventListener('DOMContentLoaded', () => {
    const postContent = document.getElementById('post-content');
    const allPostList = document.getElementById('all-post-list');
    const upcomingPostList = document.getElementById('upcoming-post-list');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        // Fetch the full post content for a single post
        fetch(`http://localhost:3000/api/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                postContent.innerHTML = `
                    <div class="single-post-container">
                        <h2>${post.title}</h2>
                        <p class="post-time">Posted on: ${new Date(post.publish_time).toLocaleDateString()}</p>
                        <div>${post.content}</div>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error fetching post:', error);
                postContent.innerHTML = '<p>Error loading post content.</p>';
            });
    } else if (allPostList) {
        // Fetch all published posts
        fetch('http://localhost:3000/api/posts')
            .then(response => response.json())
            .then(posts => {
                const now = new Date();
                const listItems = Array.from(allPostList.children);

                // Combine fetched posts with the existing list items
                const combinedPosts = listItems.map(item => {
                    const post = {
                        id: item.querySelector('a').getAttribute('href').split('=')[1],
                        title: item.querySelector('a').textContent,
                        content: item.querySelector('p').textContent.replace('...', ''),
                        publish_time: new Date(item.querySelector('.publish-time').getAttribute('data-time'))
                    };
                    return post;
                }).concat(posts.map(post => {
                    post.publish_time = new Date(post.publish_time);
                    return post;
                }));

                // Filter and sort the combined list
                const publishedPosts = combinedPosts
                    .filter(post => post.publish_time <= now)
                    .sort((a, b) => b.publish_time - a.publish_time); // Sort by publish time in descending order

                allPostList.innerHTML = ''; // Clear the existing list

                publishedPosts.forEach(post => {
                    const localPublishTime = post.publish_time.toLocaleString(); // Convert to local time
                    const contentPreview = post.content.substring(0, 100) + '...';
                    const li = document.createElement('li');
                    li.classList.add('post-item');

                    li.innerHTML = `
                        <a href="posts.html?id=${post.id}">${post.title}</a>
                        <p>${contentPreview}</p>
                        <p class="publish-time" data-time="${post.publish_time.toISOString()}">Posted on: ${localPublishTime}</p>
                    `;

                    allPostList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    } else if (upcomingPostList) {
        // Fetch upcoming posts
        fetch('http://localhost:3000/api/posts')
            .then(response => response.json())
            .then(posts => {
                const now = new Date();
                const listItems = Array.from(upcomingPostList.children);

                // Combine fetched posts with the existing list items
                const combinedPosts = listItems.map(item => {
                    const post = {
                        title: item.querySelector('h3').textContent,
                        publish_time: new Date(item.querySelector('.countdown').getAttribute('data-time'))
                    };
                    return post;
                }).concat(posts.map(post => {
                    post.publish_time = new Date(post.publish_time);
                    return post;
                }));

                // Filter and sort the combined list
                const upcomingPosts = combinedPosts
                    .filter(post => post.publish_time > now)
                    .sort((a, b) => a.publish_time - b.publish_time);

                upcomingPostList.innerHTML = ''; // Clear the existing list

                upcomingPosts.forEach(post => {
                    const localPublishTime = post.publish_time.toLocaleString();
                    const li = document.createElement('li');
                    li.classList.add('post-item');

                    li.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>Publishing in: <span class="countdown" data-time="${post.publish_time.toISOString()}"></span></p>
                        <p>Local Publish Time: ${localPublishTime}</p>
                    `;

                    upcomingPostList.appendChild(li);
                });

                startCountdown();
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    } else {
        postContent.innerHTML = '<p>No post ID provided.</p>';
    }
});

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
