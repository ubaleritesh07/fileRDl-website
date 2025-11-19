// ========================================
// RDL GENUINE PARTS - ENHANCED JAVASCRIPT
// ========================================

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// Mobile Dropdown Toggle
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdown = document.querySelector(".dropdown");

if (dropdownToggle && window.innerWidth <= 968) {
  dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("active");
  });
}

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let ticking = false;

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  },
  { passive: true }
);
// ========================================
// HERO SLIDER - (HTML slides already in DOM) - Robust autoplay version
// ========================================
let currentSlide = 0;
let slideInterval = null;
let isTransitioning = false;

let slides = [];
let dots = [];
let sliderContainer = null;
let dotsContainer = null;
const TRANSITION_MS = 1000; // must match your CSS transition duration
const INTERVAL_MS = 5000;

function collectElementsOnce() {
  sliderContainer = document.querySelector(".slider-container");
  if (!sliderContainer) return false;

  // Collect slides from DOM (assumes you already wrote them in HTML)
  slides = Array.from(sliderContainer.querySelectorAll(".slide"));

  // Try to find a dots container anywhere on the page first,
  // otherwise create it inside the slider container
  dotsContainer = document.querySelector(".slider-dots") || null;
  if (!dotsContainer) {
    dotsContainer = document.createElement("div");
    dotsContainer.className = "slider-dots";
    sliderContainer.appendChild(dotsContainer);
  }

  // Ensure dots count matches slides
  if (dotsContainer.children.length !== slides.length) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "dot";
      if (i === 0) d.classList.add("active");
      dotsContainer.appendChild(d);
    });
  }

  dots = Array.from(dotsContainer.querySelectorAll(".dot"));
  return slides.length > 0;
}

function ensureInitialActive() {
  if (!slides.length) return;
  // If no .active present, mark first slide active
  if (!slides.some((s) => s.classList.contains("active"))) {
    slides.forEach((s, i) => s.classList.toggle("active", i === 0));
  }
  // sync currentSlide with whichever slide is active
  const activeIndex = slides.findIndex((s) => s.classList.contains("active"));
  currentSlide = activeIndex >= 0 ? activeIndex : 0;

  // ensure dots reflect active slide
  dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
}

function showSlide(index) {
  if (isTransitioning) return;
  if (!slides.length) return;

  isTransitioning = true;
  // normalize index
  index = ((index % slides.length) + slides.length) % slides.length;
  currentSlide = index;

  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));

  // allow next transition after CSS transition completes
  setTimeout(() => {
    isTransitioning = false;
  }, TRANSITION_MS);
}

function nextSlide() {
  if (!slides.length) return;
  showSlide((currentSlide + 1) % slides.length);
}

function goToSlide(index) {
  if (isTransitioning) return;
  showSlide(index);
  restartSlider();
}

function startSlider() {
  stopSlider();
  if (!slides.length) return;
  // small guard: if slider already running do nothing
  if (slideInterval) return;
  slideInterval = setInterval(nextSlide, INTERVAL_MS);
  // optional: trigger first automatic advance after the interval time:
  // (comment out the next line if you want the first slide to stay until the first interval fires)
  // setTimeout(nextSlide, INTERVAL_MS);
  console.log("Slider started (autoplay).");
}

function stopSlider() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
    console.log("Slider stopped.");
  }
}

function restartSlider() {
  stopSlider();
  startSlider();
}

function attachDotHandlers() {
  // Remove any previous listeners by cloning nodes to be safe
  dots.forEach((dot, idx) => {
    const clone = dot.cloneNode(true);
    dot.parentNode.replaceChild(clone, dot);
    clone.addEventListener("click", () => goToSlide(idx));
  });
  // refresh dots reference after cloning
  dots = Array.from(dotsContainer.querySelectorAll(".dot"));
}

function initSlider() {
  const ok = collectElementsOnce();
  if (!ok) {
    console.warn("No slider-container or slides found in DOM.");
    return;
  }

  ensureInitialActive();
  attachDotHandlers();
  startSlider();

  // Pause on hover (optional)
  sliderContainer.addEventListener("mouseenter", stopSlider);
  sliderContainer.addEventListener("mouseleave", startSlider);

  // Restart autoplay when tab becomes visible again
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) startSlider();
  });
}

// Initialize when DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSlider);
} else {
  initSlider();
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
      element.textContent = target + "+";
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
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");

      // Trigger counter animation for stats
      if (entry.target.classList.contains("stat-number")) {
        const target = parseInt(entry.target.getAttribute("data-count"));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// ========================================
// INITIALIZE ANIMATIONS ON PAGE LOAD
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to elements
  const elementsToAnimate = document.querySelectorAll(
    ".showcase-item, .category-card, .benefit-card, .stat-item, .product-card, .gallery-item, .testimonial-card"
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

  // Observe stat numbers for counter animation
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });
});

// ========================================
// PARALLAX EFFECT (SMOOTH)
// ========================================
let parallaxTicking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".slide.active .slide-content"
  );

  parallaxElements.forEach((element) => {
    if (scrolled < window.innerHeight) {
      element.style.transform = `translate(-50%, calc(-50% + ${
        scrolled * 0.3
      }px))`;
      element.style.opacity = 1 - scrolled / 800;
    }
  });

  parallaxTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  },
  { passive: true }
);

// ========================================
// PRODUCT INQUIRY BUTTONS
// ========================================
document.querySelectorAll(".inquire-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;

    sessionStorage.setItem("inquiryProduct", productName);
    window.location.href = "contact.html";
  });
});

// Auto-fill product name in contact form
window.addEventListener("DOMContentLoaded", () => {
  const inquiryProduct = sessionStorage.getItem("inquiryProduct");
  const subjectField = document.getElementById("subject");
  const messageField = document.getElementById("message");

  if (inquiryProduct && subjectField && messageField) {
    subjectField.value = "product";
    messageField.value = `I am interested in: ${inquiryProduct}\n\n`;
    sessionStorage.removeItem("inquiryProduct");

    // Scroll to form
    messageField.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

// ========================================
// GALLERY FILTER
// ========================================
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach((item, index) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        setTimeout(() => {
          item.style.display = "block";
          requestAnimationFrame(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          });
        }, index * 50);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightboxClose");

if (galleryItems.length > 0) {
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (lightbox) {
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  requestAnimationFrame(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
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
  const dropdown = document.querySelector(".dropdown");
  if (window.innerWidth > 968 && dropdown) {
    dropdown.classList.remove("active");
  }
}, 250);

window.addEventListener("resize", handleResize);

// ========================================
// PREVENT CONTEXT MENU ON IMAGES
// ========================================
document.addEventListener("contextmenu", (e) => {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});
