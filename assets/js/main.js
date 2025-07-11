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

document.addEventListener('DOMContentLoaded', function() {
  // Navbar Elements
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.navbar-mobile');
  const closeBtn = document.querySelector('.mobile-close');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const contactBtns = document.querySelectorAll('.btn-primary');
  
  // Toggle Mobile Menu
  function toggleMobileMenu() {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
    
      // Create overlay if it doesn't exist
  let overlay = document.querySelector('.navbar-overlay');
  
  // Privacy Page Navigation Functionality
  if (window.location.pathname.includes('privacy.html')) {
    const navLinks = document.querySelectorAll('.privacy-nav-link');
    const sections = document.querySelectorAll('.privacy-content-block');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 100; // Account for navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
      const scrollPosition = window.scrollY + 150; // Offset for better detection
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLinks[index].classList.add('active');
        }
      });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial active state
    updateActiveNav();
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Observe privacy sections for animations
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'navbar-overlay';
      document.body.appendChild(overlay);
    }
    overlay.classList.toggle('open');
    
    // Focus management
    if (!isExpanded) {
      setTimeout(() => {
        closeBtn.focus();
      }, 100);
    }
  }
  
  // Close Mobile Menu
  function closeMobileMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    
    const overlay = document.querySelector('.navbar-overlay');
    if (overlay) overlay.classList.remove('open');
    
    toggleBtn.focus();
  }
  
  // Event Listeners
  toggleBtn.addEventListener('click', toggleMobileMenu);
  closeBtn.addEventListener('click', closeMobileMenu);
  
  // Close menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  });
  
  contactBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  });
  
  // Close menu when clicking on overlay
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('navbar-overlay')) {
      closeMobileMenu();
    }
  });
  
  // Close menu with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });
  
  // Add scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Initialize scroll state
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  }
});

// FAQ Section Functionality (Works on all pages with .faq-item)
// FAQ Section Functionality (Home Page Only)
document.addEventListener('DOMContentLoaded', function() {
  // Only run this on home.html
  if (!window.location.pathname.endsWith('home.html') && !window.location.pathname.endsWith('/')) return;
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const toggle = item.querySelector('.faq-toggle');
    if (!question) return;
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      // Close all other FAQ items in the same container
      const parent = item.closest('.faq-grid, .faq-list, .faq-container, .faq-section');
      const allItems = parent ? parent.querySelectorAll('.faq-item') : faqItems;
      allItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherToggle = otherItem.querySelector('.faq-toggle');
          if (otherToggle) {
            otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
          }
        }
      });
      // Toggle current item
      item.classList.toggle('active');
      // Update toggle icon
      if (toggle) {
        if (item.classList.contains('active')) {
          toggle.innerHTML = '<i class="fas fa-minus"></i>';
        } else {
          toggle.innerHTML = '<i class="fas fa-plus"></i>';
        }
      }
    });
  });
});

// Contact Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        // Show success message
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 2000);
    });
  }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Privacy page functionality
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.privacy-nav-link');
  const contentBlocks = document.querySelectorAll('.privacy-content-block');
  
  if (navLinks.length === 0 || contentBlocks.length === 0) {
    return; // Not on privacy page
  }
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Active navigation highlighting
  function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;
    
    contentBlocks.forEach((block, index) => {
      const blockTop = block.offsetTop;
      const blockBottom = blockTop + block.offsetHeight;
      
      if (scrollPosition >= blockTop && scrollPosition < blockBottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLinks[index]) {
          navLinks[index].classList.add('active');
        }
      }
    });
  }
  
  // Scroll-triggered animations
  function animateOnScroll() {
    contentBlocks.forEach(block => {
      const blockTop = block.getBoundingClientRect().top;
      const blockVisible = 150;
      
      if (blockTop < window.innerHeight - blockVisible) {
        block.style.opacity = '1';
        block.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Event listeners
  window.addEventListener('scroll', () => {
    updateActiveNav();
    animateOnScroll();
  });
  
  // Initial call
  updateActiveNav();
  animateOnScroll();
  
  // Initialize animations on page load
  setTimeout(() => {
    animateOnScroll();
  }, 100);
});