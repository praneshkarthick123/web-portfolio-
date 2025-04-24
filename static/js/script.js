document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.progress-bar');
    
    if (skillBars.length > 0) {
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (barPosition < screenPosition) {
                    const percentage = bar.getAttribute('data-percentage');
                    bar.style.width = percentage + '%';
                }
            });
        };
        
        // Initial check
        animateSkillBars();
        
        // Check on scroll
        window.addEventListener('scroll', animateSkillBars);
    }

    // Typing effect for hero section
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = ["AI Developer", "Python Developer", "Machine Learning Enthusiast"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of word
                isDeleting = true;
                setTimeout(type, 1500); // Wait before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500); // Wait before typing next word
            } else {
                // Speed for typing and deleting
                const typingSpeed = isDeleting ? 80 : 120;
                setTimeout(type, typingSpeed);
            }
        };
        
        // Start the typing effect
        setTimeout(type, 1000);
    }

    // Add fade-in animation to elements as they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .skill-card, .timeline-item, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial animation check
    animateOnScroll();
    
    // Animate elements on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Reset previous error states
            const errorElements = document.querySelectorAll('.error-text');
            errorElements.forEach(element => element.remove());
            
            // Validate name
            if (!nameInput.value.trim()) {
                addErrorTo(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                addErrorTo(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                addErrorTo(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                addErrorTo(messageInput, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For this example, we'll just show a success message
                contactForm.innerHTML = '<div class="success-message">Thank you for your message! I\'ll get back to you soon.</div>';
            }
        });
    }
    
    function addErrorTo(field, message) {
        const errorText = document.createElement('div');
        errorText.className = 'error-text';
        errorText.style.color = '#ff6b6b';
        errorText.style.fontSize = '0.8rem';
        errorText.style.marginTop = '0.5rem';
        errorText.textContent = message;
        
        field.parentNode.appendChild(errorText);
        field.style.borderColor = '#ff6b6b';
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});