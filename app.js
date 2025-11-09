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
// ===
/* === MOBILE NAV (Aapke paas pehle se hai) === */
const navSlide = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });
}
navSlide(); // Yeh line bhi pehle se hogi

/* === YAHAN SE NAYA CODE ADD KAREIN === */


/* === FAQ Accordion === */
// Pehle check karo ki hum us page par hain jismein FAQ hai
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Doosre sabhi open answers ko band karo
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Is item ko toggle karo
            item.classList.toggle('active');
        });
    });
}

/* === Load Latest Blog Posts (for index.html) === */
// Pehle check karo ki 'latest-posts-container' page par hai ya nahi
const postsContainer = document.getElementById('latest-posts-container');

// Check karo ki 'blogPosts' (blog_data.js se) load hua hai ya nahi
if (postsContainer && typeof blogPosts !== 'undefined') {
    
    // Sirf 3 latest posts lo (slice(0, 3))
    const latestPosts = blogPosts.slice(0, 3);

    latestPosts.forEach(post => {
        // Blog post card ka HTML banao (yeh blog.html ke style se match karega)
        const postCard = document.createElement('div');
        postCard.className = 'blog-post-card';
        
        postCard.innerHTML = `
            <div class="blog-card-image">
                <a href="${post.link}"><img src="${post.image}" alt="${post.title}"></a>
            </div>
            <div class="blog-card-content">
                <div class="blog-card-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <h3><a href="${post.link}" class="read-more-btn" style="text-decoration: none; color: white;">${post.title}</a></h3>
                <p>${post.description}</p>
                <a href="${post.link}" class="read-more-btn">Read More &rarr;</a>
            </div>
        `;
        
        postsContainer.appendChild(postCard);
    });
    
    // CSS ko grid layout mein convert karo
    postsContainer.style.display = 'grid';
    postsContainer.style.gap = '30px';
    
    // Media query ke hisaab se columns set karo
    if (window.innerWidth >= 1024) {
        postsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else if (window.innerWidth >= 768) {
        postsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
        postsContainer.style.gridTemplateColumns = '1fr';
    }
}
