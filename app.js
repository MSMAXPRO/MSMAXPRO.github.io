/* === MOBILE NAV (Aapke paas pehle se hai) === */
const navSlide = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');

    if (hamburger && nav) { // Check added to prevent errors on pages without hamburger
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }
}
navSlide(); // Run the function

/* === FAQ Accordion === */
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) { // Check if question exists
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });
}

/* === Load Latest Blog Posts (for index.html) === */
const postsContainer = document.getElementById('latest-posts-container');

if (postsContainer && typeof blogPosts !== 'undefined' && blogPosts.length > 0) {
    
    postsContainer.innerHTML = ""; 

    const latestPosts = blogPosts.slice(-3).reverse();

    latestPosts.forEach(post => {
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
    
    postsContainer.style.display = 'grid';
    postsContainer.style.gap = '30px';
    
    if (window.innerWidth >= 1024) {
        postsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else if (window.innerWidth >= 768) {
        postsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
        postsContainer.style.gridTemplateColumns = '1fr';
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            postsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else if (window.innerWidth >= 768) {
            postsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            postsContainer.style.gridTemplateColumns = '1fr';
        }
    });
}


/* === NAYA: PRO-TIP TRANSLATOR === */
const translateBtn = document.querySelector('.pro-tip-translate-btn');

if (translateBtn) {
    translateBtn.addEventListener('click', () => {
        // 1. Parent banner ko dhoondo
        const banner = translateBtn.closest('.pro-tip-banner');
        if (!banner) return;

        // 2. Button ka current language state check karo
        const currentLang = translateBtn.dataset.langCurrent;

        if (currentLang === 'hi') {
            // --- English mein badlo ---
            
            // Text ko badlo
            banner.querySelector('[data-lang="hi"]').style.display = 'none';
            banner.querySelector('[data-lang="en"]').style.display = 'block';
            
            // Button ko badlo
            translateBtn.textContent = 'Translate in Hindi';
            translateBtn.dataset.langCurrent = 'en';

        } else {
            // --- Hinglish/Hindi mein badlo ---

            // Text ko badlo
            banner.querySelector('[data-lang="hi"]').style.display = 'block';
            banner.querySelector('[data-lang="en"]').style.display = 'none';

            // Button ko badlo
            translateBtn.textContent = 'Translate in English';
            translateBtn.dataset.langCurrent = 'hi';
        }
    });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('Service Worker registered', reg))
    .catch((err) => console.log('Service Worker not registered', err));
}

