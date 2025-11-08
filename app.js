/* --- Wait for the document to be ready --- */
document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation Toggle (v3 - Scroll Lock Fix) --- */
    const navSlide = () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav-links');
        let scrollPosition = 0; // Ye scroll position save karega

        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                
                // Check karo ki menu khul raha hai ya band ho raha hai
                const isMenuOpen = nav.classList.contains('nav-active');

                if (isMenuOpen) {
                    // === MENU AB BAND HO RAHA HAI ===
                    document.body.classList.remove('body-no-scroll');
                    document.body.style.top = ''; // Inline style hatao
                    window.scrollTo(0, scrollPosition); // Wapas wahin scroll karo jahan user tha
                
                } else {
                    // === MENU AB KHUL RAHA HAI ===
                    scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Save karo user kahan par hai
                    document.body.style.top = `-${scrollPosition}px`; // Page ko upar 'pull' karke freeze karo
                    document.body.classList.add('body-no-scroll');
                }
                
                // Aakhir mein menu aur icon ko toggle karo
                nav.classList.toggle('nav-active');
                hamburger.classList.toggle('toggle');
            });
        }
    } // End of navSlide

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
    } // End of loadLatestPosts

    /* --- FAQ Accordion Logic --- */
    const initFaq = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) { // Safety check
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            }
        });
    } // End of initFaq

    // --- Call all functions ---
    navSlide();
    loadLatestPosts();
    initFaq(); // FAQ logic ko bhi call karo

});
