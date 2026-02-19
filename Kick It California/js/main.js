/**
 * Kick It California - Main JavaScript
 * Modern interactions, animations, and functionality
 */

(function() {
  'use strict';

  // ============================================
  // Smooth Scroll
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateOnScroll.observe(el);
  });

  // ============================================
  // Parallax Scroll Effect
  // ============================================
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-section');
    
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
          const speed = el.dataset.parallaxSpeed || 0.5;
          const yPos = -(scrolled * speed);
          el.style.backgroundPositionY = yPos + 'px';
        });
      });
    }
  }

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      });
    }
  }

  // ============================================
  // Form Validation
  // ============================================
  function initFormValidation() {
    const forms = document.querySelectorAll('.validate-form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        let isValid = true;
        const inputs = form.querySelectorAll('[required]');
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'This field is required');
          } else {
            input.classList.remove('error');
            removeError(input);
          }
          
          // Email validation
          if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              isValid = false;
              input.classList.add('error');
              showError(input, 'Please enter a valid email address');
            }
          }
        });
        
        if (!isValid) {
          e.preventDefault();
        }
      });
      
      // Remove error on input
      form.querySelectorAll('[required]').forEach(input => {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          removeError(input);
        });
      });
    });
  }

  function showError(input, message) {
    removeError(input);
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    input.parentElement.appendChild(error);
  }

  function removeError(input) {
    const error = input.parentElement.querySelector('.error-message');
    if (error) {
      error.remove();
    }
  }

  // ============================================
  // Card Hover Effects
  // ============================================
  function initCardEffects() {
    const cards = document.querySelectorAll('.card-interactive');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // ============================================
  // Lazy Loading Images
  // ============================================
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // Scroll Progress Indicator
  // ============================================
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
      });
    }
  }

  // ============================================
  // Accordion Functionality
  // ============================================
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-item');
    
    accordions.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      
      if (header && content) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all accordions
          accordions.forEach(acc => {
            acc.classList.remove('active');
            const accContent = acc.querySelector('.accordion-content');
            if (accContent) accContent.style.maxHeight = null;
          });
          
          // Open clicked accordion if it wasn't active
          if (!isActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // ============================================
  // Back to Top Button
  // ============================================
  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });
      
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // ============================================
  // Journey Section Animations
  // ============================================
  function initJourneyAnimations() {
    // Scroll-triggered card animations
    const journeyCards = document.querySelectorAll('.journey-card');
    
    if (journeyCards.length === 0) return;
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 150); // Stagger animation by 150ms
          
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    journeyCards.forEach(card => {
      cardObserver.observe(card);
    });
    
    // Animate counter numbers
    animateCounters();
  }

  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetCount = parseInt(target.dataset.count);
          const duration = 2000; // 2 seconds
          const increment = targetCount / (duration / 16); // 60fps
          let currentCount = 0;
          
          const updateCounter = () => {
            currentCount += increment;
            
            if (currentCount < targetCount) {
              target.textContent = Math.floor(currentCount);
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = targetCount;
            }
          };
          
          updateCounter();
          counterObserver.unobserve(target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // ============================================
  // Initialize All
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initMobileNav();
    initFormValidation();
    initCardEffects();
    initLazyLoad();
    initScrollProgress();
    initAccordions();
    initBackToTop();
    initJourneyAnimations();
    
    console.log('Kick It California - All scripts initialized');
  });

})();

