// ===============================
// CEANAPSE WEBSITE - MAIN JAVASCRIPT
// ===============================
// Team Member Bio Dropdown
window.toggleBio = function(link) {
    const shortBio = link.previousElementSibling;
    const longBio = link.nextElementSibling;
    if (longBio.style.display === 'none') {
        longBio.style.display = 'block';
        link.textContent = 'Show less';
        if (shortBio) shortBio.style.display = 'none';
    } else {
        longBio.style.display = 'none';
        link.textContent = 'Learn more';
        if (shortBio) shortBio.style.display = 'block';
    }
};

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && hamburgerBtn) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickInsideBtn = hamburgerBtn.contains(event.target);

            if (!isClickInsideMenu && !isClickInsideBtn && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});


// Donation Checkout Form Logic (only on donation page)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donation-form');
    const amountInput = document.getElementById('donation-amount');
    const summaryAmount = document.getElementById('summary-amount');
    const summaryTotal = document.getElementById('summary-total');
    const recurringCheckbox = document.getElementById('recurring-donation');
    const recurringSection = document.getElementById('recurring-summary');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const submitBtn = document.getElementById('submit-btn');
    const btnLoader = document.getElementById('btn-loader');

    if (form && amountInput && summaryAmount && summaryTotal) {
        // Update summary when amount changes
        function updateSummary() {
            const amount = parseInt(amountInput.value) || 0;
            const formattedAmount = amount.toLocaleString('en-US');
            summaryAmount.textContent = `KES ${formattedAmount}`;
            summaryTotal.textContent = `KES ${formattedAmount}`;
        }

        // Quick amount buttons
        amountButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const amount = parseInt(btn.dataset.amount);
                amountInput.value = amount;
                amountButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateSummary();
                amountInput.focus();
            });
        });

        // Amount input change
        amountInput.addEventListener('input', () => {
            amountButtons.forEach(b => b.classList.remove('active'));
            updateSummary();
        });

        // Toggle recurring summary
        if (recurringCheckbox && recurringSection) {
            recurringCheckbox.addEventListener('change', () => {
                if (recurringCheckbox.checked) {
                    recurringSection.style.display = 'flex';
                } else {
                    recurringSection.style.display = 'none';
                }
            });
        }

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Reset error messages
            const emailError = document.getElementById('email-error');
            const amountError = document.getElementById('amount-error');
            const formErrors = document.getElementById('form-errors');
            if (emailError) emailError.textContent = '';
            if (amountError) amountError.textContent = '';
            if (formErrors) formErrors.style.display = 'none';

            // Validate form
            const email = document.getElementById('donor-email').value;
            const amount = parseInt(amountInput.value);

            let hasError = false;

            if (!email || !email.includes('@')) {
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                hasError = true;
            }

            if (!amount || amount < 100) {
                if (amountError) amountError.textContent = 'Please enter a donation amount of at least KES 100';
                hasError = true;
            }

            if (amount > 1000000) {
                if (amountError) amountError.textContent = 'Maximum donation amount is KES 1,000,000';
                hasError = true;
            }

            if (hasError) {
                return;
            }

            // Show loading state
            if (submitBtn) submitBtn.disabled = true;
            if (btnLoader) btnLoader.style.display = 'inline-block';

            // Collect form data
            const formData = {
                donor_email: email,
                amount: amount,
                recurring: recurringCheckbox ? recurringCheckbox.checked : false,
                anonymous: document.getElementById('anonymous-donation') ? document.getElementById('anonymous-donation').checked : false
            };

            console.log('[v0] Form submission - Payment data:', formData);

            // Simulate successful submission (remove in production)
            setTimeout(() => {
                alert('Thank you for your donation!\n\nAmount: KES ' + amount.toLocaleString() + 
                      '\nRecurring: ' + (formData.recurring ? 'Yes (Monthly)' : 'No') +
                      '\n\nThis is a demo. In production, you would be redirected to a payment gateway.');
                if (submitBtn) submitBtn.disabled = false;
                if (btnLoader) btnLoader.style.display = 'none';
            }, 1500);
        });

        // Initialize summary
        updateSummary();
    }
});

// Smooth Scroll for Internal Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();

                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll animation for elements
function revealOnScroll() {
    const elements = document.querySelectorAll('.kra-card, .team-card, .project-card, .value-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', revealOnScroll);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Counter animation for impact section (if present)
function animateCounters() {
    const counters = document.querySelectorAll('.impact-amount');

    counters.forEach(counter => {
        const value = counter.textContent.replace(/[^\d]/g, '');
        if (value) {
            const target = parseInt(value);
            let current = 0;
            const increment = target / 30;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = 'KES ' + Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = 'KES ' + target;
                }
            };

            // Trigger animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });

            observer.observe(counter);
        }
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// Form Validation (if forms are added)
function setupFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Add your form validation logic here
            const formData = new FormData(this);
            console.log('Form submitted with data:', Object.fromEntries(formData));

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    });
}

document.addEventListener('DOMContentLoaded', setupFormValidation);

// Active navigation link updater
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Donation button click handlers
document.addEventListener('DOMContentLoaded', function() {
    const donateButtons = document.querySelectorAll('.btn-primary');

    donateButtons.forEach(btn => {
        if (btn.textContent.includes('Donate') || btn.textContent.includes('Support')) {
            btn.addEventListener('click', function(e) {
                // Scroll to donation form
                const donationForm = document.getElementById('donate-form');
                if (donationForm) {
                    donationForm.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // If on a different page, navigate to donate page
                    window.location.href = 'donate.html#donate-form';
                }
            });
        }
    });
});

// Placeholder image generator for development
function generatePlaceholderImages() {
    const images = document.querySelectorAll('img[src$=".jpg"]');

    images.forEach(img => {
        // Check if image has failed to load
        img.addEventListener('error', function() {
            // Generate a placeholder color based on image alt text
            const colors = ['#0066cc', '#00a86b', '#ff6b35', '#004d99', '#008659'];
            const colorIndex = Math.floor(Math.random() * colors.length);
            const color = colors[colorIndex];

            // Create canvas placeholder
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Image Placeholder', canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = '14px Arial';
            ctx.fillText(this.alt || 'Add your image here', canvas.width / 2, canvas.height / 2 + 20);

            this.src = canvas.toDataURL();
            this.style.backgroundColor = color;
        });
    });
}

document.addEventListener('DOMContentLoaded', generatePlaceholderImages);

// Donation amount button interaction
document.addEventListener('DOMContentLoaded', function() {
    const donateNowBtn = document.querySelector('button[style*="width: 100%; margin-top: 1rem;"]');
    if (donateNowBtn) {
        donateNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Show alert with integration instruction
            alert('To enable donations, integrate this form with your payment processor (Stripe, PayPal, etc.). Update the button action to redirect to your payment gateway.');
        });
    }
});

// Log initialization
console.log('Ceanapse Website - JavaScript loaded successfully');
