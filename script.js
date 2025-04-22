// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Experience Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission with FormSubmit
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Create status message element
    const formStatus = document.createElement('div');
    formStatus.id = 'formStatus';
    contactForm.appendChild(formStatus);
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        
        // Change button state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = '';
        
        try {
            // Using FormSubmit service
            const response = await fetch('https://formsubmit.co/ajax/c485376ee1151b944165ab15c212c58a', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (response.ok && result.success === "true") {
                // Success message
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.className = 'success';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            // Error message
            formStatus.textContent = 'Error: ' + error.message;
            formStatus.className = 'error';
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'inline-block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Add animation to timeline items when they come into view
const timelineItems = document.querySelectorAll('.timeline-item');

function animateTimelineItems() {
    timelineItems.forEach(item => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial state
        item.style.opacity = '0';
        if (item.classList.contains('timeline-item:nth-child(odd)') || 
            !item.classList.contains('timeline-item:nth-child(even)')) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        observer.observe(item);
    });
}

// Add animation to education cards when they come into view
const educationCards = document.querySelectorAll('.education-card');

function animateEducationCards() {
    educationCards.forEach(card => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        observer.observe(card);
    });
}

// Call all animation functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    animateTimelineItems();
    animateEducationCards();
});