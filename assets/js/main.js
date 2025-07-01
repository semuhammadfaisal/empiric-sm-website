// =========================
// Carousel Functionality
// =========================
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".clients-carousel");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  let scrollAmount = 0;

  if (carousel && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      scrollAmount += carousel.offsetWidth / 3;
      if (scrollAmount >= carousel.scrollWidth - carousel.offsetWidth) {
        scrollAmount = 0; // Reset to start
      }
      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    prevBtn.addEventListener("click", () => {
      scrollAmount -= carousel.offsetWidth / 3;
      if (scrollAmount < 0) {
        scrollAmount = carousel.scrollWidth - carousel.offsetWidth; // Go to the end
      }
      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  }
}); 

/* Animation for navbar on scroll */
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =========================
// Enhanced Navbar Mobile Toggle + Overlay
// =========================
document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  let navbarOverlay = document.querySelector(".navbar-overlay");

  // Create overlay if not present
  if (!navbarOverlay) {
    navbarOverlay = document.createElement("div");
    navbarOverlay.className = "navbar-overlay";
    navbarOverlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(navbarOverlay);
  }

  function openMenu() {
    navbarToggler.setAttribute("aria-expanded", "true");
    navbarCollapse.classList.add("show");
    navbarOverlay.classList.add("show");
    navbarOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("navbar-open");
    
    // Focus management
    const firstLink = navbarCollapse.querySelector(".nav-link");
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
    
    // Trap focus within menu
    trapFocus(navbarCollapse);
  }
  
  function closeMenu() {
    navbarToggler.setAttribute("aria-expanded", "false");
    navbarCollapse.classList.remove("show");
    navbarOverlay.classList.remove("show");
    navbarOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("navbar-open");
    
    // Return focus to toggler
    navbarToggler.focus();
    
    // Remove focus trap
    removeFocusTrap();
  }

  // Focus trap function
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
  }

  function removeFocusTrap() {
    // Remove event listeners when menu closes
    const focusableElements = navbarCollapse.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    focusableElements.forEach(element => {
      element.removeEventListener('keydown', arguments.callee);
    });
  }

  if (navbarToggler && navbarCollapse) {
    // Toggle menu on button click
    navbarToggler.addEventListener("click", function (e) {
      e.preventDefault();
      const expanded = navbarToggler.getAttribute("aria-expanded") === "true";
      if (!expanded) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Close menu when a link is clicked (for better UX)
    navbarCollapse.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });

    // Close menu when overlay is clicked
    navbarOverlay.addEventListener("click", closeMenu);

    // Handle touch events for better mobile experience
    let touchStartY = 0;
    let touchEndY = 0;

    navbarCollapse.addEventListener('touchstart', function(e) {
      touchStartY = e.changedTouches[0].screenY;
    });

    navbarCollapse.addEventListener('touchend', function(e) {
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const swipeDistance = touchStartY - touchEndY;
      
      // Swipe up to close menu
      if (swipeDistance > swipeThreshold) {
        closeMenu();
      }
    }
  }

  // Close menu on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Remove any existing close buttons to prevent duplicates
  navbarCollapse.querySelectorAll('.navbar-close-btn').forEach(btn => btn.remove());
  
  // Add close button to mobile menu
  let closeBtn = document.createElement('button');
  closeBtn.className = 'navbar-close-btn';
  closeBtn.setAttribute('aria-label', 'Close navigation menu');
  closeBtn.setAttribute('type', 'button');
  closeBtn.innerHTML = '&times;';
  navbarCollapse.insertBefore(closeBtn, navbarCollapse.firstChild);
  
  closeBtn.addEventListener('click', closeMenu);
  closeBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeMenu();
    }
  });

  // Enhanced accessibility for mobile menu
  if (navbarCollapse) {
    navbarCollapse.setAttribute('role', 'navigation');
    navbarCollapse.setAttribute('aria-label', 'Main navigation');
    
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      link.setAttribute('tabindex', '0');
      link.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  }
});

// Counting Animation Script
document.addEventListener('DOMContentLoaded', function() {
  const statsCard = document.querySelector('.stats-card');
  
  if (statsCard) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsCard);
  }
  
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 2000; // 2 seconds
    const interval = 50; // ms
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const steps = duration / interval;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        counter.textContent = Math.floor(current);
      }, interval);
    });
  }
});

// Optional JavaScript for enhanced control
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.projects-track');
  const slides = document.querySelectorAll('.project-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentIndex = 0;
  
  // Manual navigation
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });
  
  function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    track.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
  }
  
  // Auto-slide fallback if prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    track.style.animation = 'none';
    // Show arrows by default
    [prevBtn, nextBtn].forEach(btn => btn.style.opacity = '1');
  }
});

// Testimonials Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.feedback-track');
  const cards = document.querySelectorAll('.feedback-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth;
  const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  
  // Initialize dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });
  
  // Update carousel position
  function updateCarousel() {
    const newPosition = -currentIndex * cardWidth;
    track.style.transform = `translateX(${newPosition}px)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Navigation handlers
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % (cards.length - visibleCards + 1);
    updateCarousel();
  });
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + (cards.length - visibleCards + 1)) % (cards.length - visibleCards + 1);
    updateCarousel();
  });
  
  // Auto-rotate every 5 seconds
  let autoSlide = setInterval(() => {
    nextBtn.click();
  }, 5000);
  
  // Pause on hover
  const carousel = document.querySelector('.clients-carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => nextBtn.click(), 5000);
  });
  
  // Responsive adjustments
  window.addEventListener('resize', () => {
    const newVisibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    if (newVisibleCards !== visibleCards) {
      currentIndex = 0;
      updateCarousel();
    }
  });
});