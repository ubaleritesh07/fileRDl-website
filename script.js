// ========================================
// RDL GENUINE PARTS - ENHANCED JAVASCRIPT
// ========================================

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Mobile Dropdown Toggle
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if (dropdownToggle && window.innerWidth <= 968) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let ticking = false;

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// ========================================
// HERO SLIDER - AUTO SLIDE EVERY 5 SECONDS
// ========================================
let currentSlide = 0;
let slideInterval;
let isTransitioning = false;

const slideData = [
    {
        title: 'RDL GENUINE PARTS',
        subtitle: 'Premium Quality Motorcycle Components',
        image: '/images/companyphoto/5th.jpg'
    },
    {
        title: 'NON-FADING EXCELLENCE',
        subtitle: '14 Years of Manufacturing Premium Parts',
        image: '/images/marketyard/2nd.jpg'
    },
    {
        title: 'HIGHLY DURABLE PRODUCTS',
        subtitle: 'State-of-the-Art Manufacturing Facility',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&h=1080&fit=crop'
    },
    {
        title: '500+ DEALER NETWORK',
        subtitle: 'Trusted Across India - Join Us Today',
        image: '/images/companyphoto/1st.JPG'
    }
];

function createSlides() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    // Clear existing content
    sliderContainer.innerHTML = '';

    // Create slides
    slideData.forEach((data, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `url('${data.image}')`;
        if (index === 0) slide.classList.add('active');

        slide.innerHTML = `
            <div class="slide-content">
                <h1>${data.title}</h1>
                <p>${data.subtitle}</p>
                <a href="products.html" class="cta-button">Explore Products</a>
            </div>
        `;

        sliderContainer.appendChild(slide);
    });

    // Create dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    slideData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    sliderContainer.appendChild(dotsContainer);
}

function showSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const allSlides = document.querySelectorAll('.slide');
    const allDots = document.querySelectorAll('.dot');

    // Remove active from all
    allSlides.forEach(slide => slide.classList.remove('active'));
    allDots.forEach(dot => dot.classList.remove('active'));

    // Add active to current
    if (allSlides[index]) {
        allSlides[index].classList.add('active');
    }
    if (allDots[index]) {
        allDots[index].classList.add('active');
    }

    // Allow next transition after animation completes
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

function nextSlide() {
    const allSlides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % allSlides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    if (isTransitioning) return;
    currentSlide = index;
    showSlide(currentSlide);
    // Reset the interval to prevent immediate slide change
    stopSlider();
    startSlider();
}

function startSlider() {
    // Clear any existing interval first
    stopSlider();
    // Start new interval
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Initialize slider when DOM is ready
function initSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    createSlides();
    startSlider();

    // Optional: Pause on hover (remove these lines if you want continuous running even on hover)
    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);
}

// Start slider when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}

// Restart slider if page becomes visible again (when switching tabs)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            startSlider();
        }
    }
});
// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ANIMATED COUNTER FOR STATS
// ========================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// ========================================
// INITIALIZE ANIMATIONS ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const elementsToAnimate = document.querySelectorAll(
        '.showcase-item, .category-card, .benefit-card, .stat-item, .product-card, .gallery-item, .testimonial-card'
    );
    
    elementsToAnimate.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Observe stat numbers for counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
});

// ========================================
// PARALLAX EFFECT (SMOOTH)
// ========================================
let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.slide.active .slide-content');
    
    parallaxElements.forEach(element => {
        if (scrolled < window.innerHeight) {
            element.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
            element.style.opacity = 1 - (scrolled / 800);
        }
    });
    
    parallaxTicking = false;
}

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
}, { passive: true });

// ========================================
// PRODUCT INQUIRY BUTTONS
// ========================================
document.querySelectorAll('.inquire-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        sessionStorage.setItem('inquiryProduct', productName);
        window.location.href = 'contact.html';
    });
});

// Auto-fill product name in contact form
window.addEventListener('DOMContentLoaded', () => {
    const inquiryProduct = sessionStorage.getItem('inquiryProduct');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    if (inquiryProduct && subjectField && messageField) {
        subjectField.value = 'product';
        messageField.value = `I am interested in: ${inquiryProduct}\n\n`;
        sessionStorage.removeItem('inquiryProduct');
        
        // Scroll to form
        messageField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// ========================================
// GALLERY FILTER
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach((item, index) => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                setTimeout(() => {
                    item.style.display = 'block';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                }, index * 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');

if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            if (lightbox) {
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}



// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});

// ========================================
// DEBOUNCE FUNCTION
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    const dropdown = document.querySelector('.dropdown');
    if (window.innerWidth > 968 && dropdown) {
        dropdown.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// ========================================
// PREVENT CONTEXT MENU ON IMAGES
// ========================================
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

