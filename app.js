document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation Toggle --- */
    const navSlide = () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav-links');

        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                hamburger.classList.toggle('toggle');
// --- BUG FIX: YEH NAYI LINE ADD KAREIN ---
document.documentElement.classList.toggle('body-no-scroll'); // For <html>
document.body.classList.toggle('body-no-scroll');        
            });
        }
    }
//... baaki code


    /* --- Load Latest Blog Posts --- */
    const loadLatestPosts = () => {
        const postsContainer = document.getElementById('latest-posts-container');

        if (!postsContainer) {
            return; // Hum homepage par nahi hain
        }

        if (typeof allBlogPosts === 'undefined' || allBlogPosts.length === 0) {
            postsContainer.innerHTML = '<p style="text-align:center;">(No blog posts found.)</p>';
            return;
        }

        // UPDATE: Latest post waala fix
        // .slice() -> copy banata hai
        // .reverse() -> copy ko ulta karta hai (taaki naye post pehle aaye)
        // .slice(0, 3) -> ulte list se pehle 3 uthata hai
        const latestPosts = allBlogPosts.slice().reverse().slice(0, 3);

        latestPosts.forEach(post => {
            const postHTML = `
                <div class="blog-post-card">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <a href="${post.link}" class="read-more-btn">Read More →</a>
                </div>
            `;
            postsContainer.insertAdjacentHTML('beforeend', postHTML);
        });
    }

    // --- Call all functions ---
    navSlide();
    loadLatestPosts();

});
/* --- START: NAYA FAQ Accordion Logic --- */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Toggle the 'active' class on the clicked item
        item.classList.toggle('active');
    });
});
/* --- END: NAYA FAQ Accordion Logic --- */
