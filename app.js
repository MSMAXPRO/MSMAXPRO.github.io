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
            // We select all links inside the nav
            const navLinks = document.querySelectorAll('.nav-links li');
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    // Reset animation if it's already there
                    link.style.animation = '';
                } else {
                    // Add animation
                    // This creates the staggering fade-in effect
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Hamburger Icon Animation
            hamburger.classList.toggle('toggle');
        });
    }
}

// Call the function to set up the event listener
navSlide();

/* Note: The @keyframes for 'navLinkFade' are not in this file.
They are in the original <style> tag.
We need to make sure they are in our final 'style.css'.
...
Checking the CSS above... yes, the keyframes are missing.
*/