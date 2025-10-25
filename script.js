// ===========================
// Smooth Scroll & Navigation
// ===========================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const elementsToAnimate = document.querySelectorAll('.section, .feature-card, .interaction-item, .use-case');

elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
});

// ===========================
// Video Playback Control
// ===========================

const heroVideo = document.querySelector('.hero-video');

// Ensure video plays on load (for autoplay issues on some browsers)
if (heroVideo) {
    heroVideo.play().catch(error => {
        console.log('Video autoplay prevented:', error);
        // Fallback: try to play on user interaction
        document.addEventListener('click', () => {
            heroVideo.play();
        }, { once: true });
    });

    // Optimize video performance
    window.addEventListener('blur', () => {
        heroVideo.pause();
    });

    window.addEventListener('focus', () => {
        if (window.scrollY < window.innerHeight) {
            heroVideo.play();
        }
    });
}

// ===========================
// Active Navigation Link Highlighting
// ===========================

const sections = document.querySelectorAll('.section, #hero');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNavigation() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// Parallax Effect on Hero
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ===========================
// Loading Animation
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1.2s ease-out';
    }
});

// ===========================
// Feature Card Stagger Animation
// ===========================

const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

const interactionItems = document.querySelectorAll('.interaction-item');
interactionItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ===========================
// Mobile Menu Toggle (for future implementation)
// ===========================

// Placeholder for mobile menu functionality
// Can be implemented with hamburger menu if needed

console.log('🐠 Cuddlefish website loaded successfully!');
