/* --- Wait for the document to be ready --- */
document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation Toggle --- */
    const navSlide = () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav-links');

        // Check if hamburger and nav exist on the page
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                // Toggle Nav
                nav.classList.toggle('nav-active');
                
                // Animate Links
                const navLinks = document.querySelectorAll('.nav-links li');
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });

                // Hamburger Icon Animation
                hamburger.classList.toggle('toggle');
            });
        }
    }

    /* === START NEW BLOG POSTS CODE === */

    /**
     * Loads the latest blog posts onto the homepage.
     */
    const loadLatestPosts = () => {
        // 1. Find the container on the homepage
        const postsContainer = document.getElementById('latest-posts-container');

        // 2. Check if we are on the homepage (if the container exists)
        //    Yeh important hai taaki code 'blog.html' jaise pages par error na de
        if (!postsContainer) {
            return; // Container nahi mila, matlab hum homepage par nahi hain. Exit.
        }

        // 3. Check if the blog_data.js file's data (allBlogPosts) exists
        if (typeof allBlogPosts === 'undefined' || allBlogPosts.length === 0) {
            postsContainer.innerHTML = '<p style="text-align:center;">(No blog posts found.)</p>';
            return;
        }

        // 4. Get the latest 3 posts (slice(0, 3) se 3 posts milenge)
        const latestPosts = allBlogPosts.slice(0, 3);

        // 5. Create HTML for each post and add it to the page
        latestPosts.forEach(post => {
            // Yeh HTML structure aapke blog.html ke card se match karti hai
            // (Humne "blog-section" class pehle hi HTML mein daal di thi)
            const postHTML = `
                <div class="blog-post-card">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <a href="${post.link}" class="read-more-btn">Read More →</a>
                </div>
            `;
            
            // Add the new HTML card inside the container
            postsContainer.insertAdjacentHTML('beforeend', postHTML);
        });
    }

    /* === END NEW BLOG POSTS CODE === */


    // --- Call all functions ---
    navSlide();
    loadLatestPosts();

});
