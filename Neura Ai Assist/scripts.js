// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    });
  });

  // Solutions page tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show active tab content
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.getAttribute('id') === tabId) {
            content.classList.add('active');
          }
        });
      });
    });
  }

  // Pricing toggle functionality
  const pricingToggle = document.getElementById('pricing-toggle');
  const monthlyPrices = document.querySelectorAll('.price.monthly');
  const annualPrices = document.querySelectorAll('.price.annually');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', function() {
      if (this.checked) {
        // Show annual prices
        monthlyPrices.forEach(price => price.classList.add('hidden'));
        annualPrices.forEach(price => price.classList.remove('hidden'));
      } else {
        // Show monthly prices
        monthlyPrices.forEach(price => price.classList.remove('hidden'));
        annualPrices.forEach(price => price.classList.add('hidden'));
      }
    });
  }

  // Form validation and submission
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#dc2626';
        } else {
          field.style.borderColor = '';
        }
      });

      if (isValid) {
        // In a real application, you would send the form data to a server here
        // For this example, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      }
    });
  }

  // Animate elements on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.industry-card, .testimonial-card, .service-card, .solution-card, .pricing-card');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  const animatedElements = document.querySelectorAll('.industry-card, .testimonial-card, .service-card, .solution-card, .pricing-card');
  animatedElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // Floating card animations
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach(card => {
    card.style.animationDelay = card.getAttribute('data-delay') || '0s';
  });
});
