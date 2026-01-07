/**
 * SABBIR HOSEN AKASH - PORTFOLIO CORE JS
 */

// --- 1. Typing Effect Logic ---
const textArray = ["Bangladeshi Musician", "Creative Writer", "Web Developer", "SEO Expert"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing-effect");
    if (!typingElement) return;

    const currentText = textArray[textIndex];
    const typingSpeed = isDeleting ? 70 : 150;

    if (!isDeleting && charIndex < currentText.length) {
        typingElement.textContent += currentText.charAt(charIndex);
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % textArray.length;
        }
        setTimeout(typeEffect, isDeleting ? 2000 : 500);
        return;
    }

    setTimeout(typeEffect, typingSpeed);
}

// --- 2. Silent AJAX Form Submission (No Redirect) ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // বাটন টেক্সট পরিবর্তন করা
        const submitBtn = contactForm.querySelector('.send-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.innerHTML = '<span style="color: var(--primary)">✓ Message sent successfully! I will contact you soon.</span>';
                contactForm.reset();
            } else {
                formStatus.innerHTML = '<span style="color: #ff4d4d">Submission failed. Please try again.</span>';
            }
        } catch (error) {
            formStatus.innerHTML = '<span style="color: #ff4d4d">Network error. Check your connection.</span>';
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// --- 3. Mobile Menu Logic ---
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// মেনু লিঙ্কে ক্লিক করলে অটো ক্লোজ হওয়া
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('active');
    });
});

// --- 4. Initialize AOS & Swiper & Particles ---
document.addEventListener("DOMContentLoaded", () => {
    
    // শুরু হবে টাইপিং ইফেক্ট
    setTimeout(typeEffect, 1000);

    // AOS (Scroll Animation)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Swiper Slider (Projects)
    const swiper = new Swiper('.project-slider', {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        }
    });

    // 3D Skill Bar Animation on Scroll
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.fill-3d');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.style.getPropertyValue('--width');
                    bar.style.width = width;
                });
            }
        });
    }, { threshold: 0.5 });

    if (skillSection) skillObserver.observe(skillSection);

    // Particles JS Config
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ff88" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00ff88", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
            },
            "retina_detect": true
        });
    }
});
