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
// Pehle check karo ki hum us page par hain jismein FAQ hai
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) { // Check if question exists
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
        }
    });
}

/* === Load Latest Blog Posts (for index.html) === */
const postsContainer = document.getElementById('latest-posts-container');

// Check karo ki 'blogPosts' (blog_data.js se) load hua hai ya nahi
// aur 'postsContainer' page par hai ya nahi
if (postsContainer && typeof blogPosts !== 'undefined' && blogPosts.length > 0) {
    
    // Default text ko Hatao
    postsContainer.innerHTML = ""; 

    // Sirf 3 latest posts lo
    const latestPosts = blogPosts.slice(0, 3);

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

    // Resize par columns update karne ke liye (Optional but good)
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
