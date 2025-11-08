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
// === CONTACT FORM SCRIPT (Starts) ===
// Pehle check karo ki hum contact page par hain ya nahi
// (Yeh 'contactForm' aur 'formStatus' element ko dhoondh kar karega)

const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

// *** YEH SABSE IMPORTANT LINE HAI ***
// Agar dono element page par maujood hain, tabhi 'submit' listener add karo
if (contactForm && formStatus) {

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        formStatus.innerHTML = 'Sending...';
        formStatus.style.color = '#cbd5e1'; 
        formStatus.style.backgroundColor = '#334155';
        formStatus.style.display = 'block';
        submitButton.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = "Thanks! Your message has been sent.";
                formStatus.style.color = '#10b981'; 
                formStatus.style.backgroundColor = '#10b98130'; 
                contactForm.reset();
            } else {
                throw new Error('Form submission failed.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            formStatus.innerHTML = "Oops! Something went wrong. Please try again.";
            formStatus.style.color = '#f87171'; 
            formStatus.style.backgroundColor = '#f8717130'; 
        } finally {
            submitButton.disabled = false;
        }
    });

} // 'if' block yahan khatam hota hai

// === CONTACT FORM SCRIPT (Ends) ===
