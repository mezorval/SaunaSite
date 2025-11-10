// ============================================
// ROAMING HEAT MOBILE SAUNAS - JAVASCRIPT
// Interactive Features & Form Handling
// ============================================

// ============================================
// NAVIGATION & MOBILE MENU
// ============================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = targetElement.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveNavLink();
});

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================
// BOOKING CALENDAR
// ============================================

function generateCalendar() {
    const calendarContainer = document.getElementById('bookingCalendar');
    if (!calendarContainer) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Generate next 3 months
    let calendarHTML = '';
    
    for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
        const displayDate = new Date(currentYear, currentMonth + monthOffset, 1);
        const month = displayDate.getMonth();
        const year = displayDate.getFullYear();
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Month header
        calendarHTML += `
            <div class="calendar-month" style="grid-column: 1 / -1; font-weight: 700; font-size: 1.125rem; color: var(--primary-color); margin-top: ${monthOffset > 0 ? '2rem' : '0'}; margin-bottom: 1rem;">
                ${displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
        `;
        
        // Day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            calendarHTML += `<div class="calendar-day-header" style="font-weight: 600; text-align: center; padding: 0.5rem; color: var(--text-secondary);">${day}</div>`;
        });
        
        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }
        
        // Simulate some booked dates (for demo purposes)
        const bookedDates = generateRandomBookedDates(year, month);
        
        // Generate days
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const isPast = currentDate < today && currentDate.toDateString() !== today.toDateString();
            const isBooked = bookedDates.includes(day);
            
            let dayClass = 'calendar-day';
            if (isPast) {
                dayClass += ' past';
                calendarHTML += `<div class="${dayClass}" style="opacity: 0.3; cursor: not-allowed;">${day}</div>`;
            } else if (isBooked) {
                dayClass += ' booked';
                calendarHTML += `<div class="${dayClass}" data-date="${year}-${month + 1}-${day}">${day}</div>`;
            } else {
                dayClass += ' available';
                calendarHTML += `<div class="${dayClass}" data-date="${year}-${month + 1}-${day}">${day}</div>`;
            }
        }
    }
    
    calendarContainer.innerHTML = calendarHTML;
    
    // Add click handlers to available dates
    const availableDays = calendarContainer.querySelectorAll('.calendar-day.available');
    availableDays.forEach(day => {
        day.addEventListener('click', () => {
            const date = day.getAttribute('data-date');
            selectCalendarDate(date, day);
        });
    });
}

function generateRandomBookedDates(year, month) {
    // Generate 3-5 random booked dates per month for demo
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const bookedCount = Math.floor(Math.random() * 3) + 3;
    const bookedDates = [];
    
    for (let i = 0; i < bookedCount; i++) {
        const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
        if (!bookedDates.includes(randomDay)) {
            bookedDates.push(randomDay);
        }
    }
    
    return bookedDates;
}

function selectCalendarDate(date, dayElement) {
    // Remove previous selections
    document.querySelectorAll('.calendar-day.selected').forEach(day => {
        day.classList.remove('selected');
        if (day.classList.contains('available')) {
            // Keep available styling
        }
    });
    
    // Add selection
    dayElement.classList.add('selected');
    
    // Update form date field
    const startDateField = document.getElementById('startDate');
    if (startDateField) {
        startDateField.value = date;
    }
    
    console.log('Selected date:', date);
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', generateCalendar);

// ============================================
// BOOKING FORM HANDLING
// ============================================

const bookingForm = document.getElementById('bookingForm');
const packageSelect = document.getElementById('package');

if (bookingForm) {
    // Update summary when package changes
    packageSelect.addEventListener('change', updateBookingSummary);
    
    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!validateBookingForm(data)) {
            return;
        }
        
        // Show success message (in real implementation, this would submit to backend)
        showSuccessMessage('Booking Request Submitted!', 
            'Thank you for your booking request. We\'ll send you a confirmation email with payment details within 4 hours.');
        
        console.log('Booking data:', data);
        
        // Reset form
        bookingForm.reset();
        updateBookingSummary();
    });
}

function updateBookingSummary() {
    const packageValue = packageSelect.value;
    const summaryPackage = document.getElementById('summaryPackage');
    const summaryDeposit = document.getElementById('summaryDeposit');
    
    const packages = {
        evening: { name: 'Evening Escape', price: 149 },
        fullday: { name: 'Full Day Wellness', price: 249 },
        weekend: { name: 'Weekend Retreat', price: 449 },
        custom: { name: 'Event/Custom', price: 0 }
    };
    
    if (packageValue && packages[packageValue]) {
        const pkg = packages[packageValue];
        summaryPackage.textContent = pkg.name;
        
        if (pkg.price > 0) {
            const deposit = Math.round(pkg.price * 0.3);
            summaryDeposit.textContent = `£${deposit}`;
        } else {
            summaryDeposit.textContent = 'To be confirmed';
        }
    } else {
        summaryPackage.textContent = '-';
        summaryDeposit.textContent = '-';
    }
}

function validateBookingForm(data) {
    // Check required fields
    if (!data.package || !data.startDate || !data.endDate || !data.name || 
        !data.email || !data.phone || !data.address || !data.postcode) {
        showErrorMessage('Please fill in all required fields');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('Please enter a valid email address');
        return false;
    }
    
    // Validate dates
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (startDate < today) {
        showErrorMessage('Start date cannot be in the past');
        return false;
    }
    
    if (endDate < startDate) {
        showErrorMessage('End date must be after start date');
        return false;
    }
    
    // Check terms acceptance
    if (!data.terms) {
        showErrorMessage('Please accept the Terms & Conditions');
        return false;
    }
    
    return true;
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showErrorMessage('Please fill in all required fields');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showErrorMessage('Please enter a valid email address');
            return;
        }
        
        // Show success message
        showSuccessMessage('Message Sent!', 
            'Thank you for contacting us. We\'ll get back to you within 4 hours.');
        
        console.log('Contact form data:', data);
        
        // Reset form
        contactForm.reset();
    });
}

// ============================================
// NOTIFICATION MESSAGES
// ============================================

function showSuccessMessage(title, message) {
    showNotification(title, message, 'success');
}

function showErrorMessage(message) {
    showNotification('Error', message, 'error');
}

function showNotification(title, message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <strong>${title}</strong>
            </div>
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#2d5f4f' : '#c94d4d'};
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .notification-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.125rem;
    }
    
    .notification-header i {
        color: #2d5f4f;
    }
    
    .notification-error .notification-header i {
        color: #c94d4d;
    }
    
    .notification p {
        margin: 0;
        color: #5a5a5a;
    }
    
    .notification-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        cursor: pointer;
        color: #8a8a8a;
        font-size: 1.125rem;
        padding: 0.25rem;
        transition: color 0.2s;
    }
    
    .notification-close:hover {
        color: #2a2a2a;
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// LAZY LOADING IMAGES (for when real images are added)
// ============================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ANIMATE ON SCROLL (Simple fade-in effect)
// ============================================

function animateOnScroll() {
    const elements = document.querySelectorAll('.step-card, .pricing-card, .gallery-item, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Roaming Heat Mobile Saunas - Website Loaded');
    
    // Initialize features
    handleNavbarScroll();
    updateActiveNavLink();
    lazyLoadImages();
    animateOnScroll();
    
    // Set min date for booking form to today
    const startDateField = document.getElementById('startDate');
    const endDateField = document.getElementById('endDate');
    const today = new Date().toISOString().split('T')[0];
    
    if (startDateField) {
        startDateField.min = today;
        
        // Auto-update end date when start date changes
        startDateField.addEventListener('change', () => {
            endDateField.min = startDateField.value;
            if (endDateField.value && endDateField.value < startDateField.value) {
                endDateField.value = startDateField.value;
            }
        });
    }
    
    // Gallery lightbox effect (simple implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // In a real implementation, this would open a lightbox
            console.log('Gallery item clicked - would open lightbox');
        });
    });
});

// ============================================
// BOOKING INTEGRATION SUGGESTIONS
// ============================================

/*
 * BOOKING SYSTEM INTEGRATION OPTIONS:
 * 
 * 1. STRIPE PAYMENT INTEGRATION:
 *    - Use Stripe Elements for secure card payments
 *    - Create payment intents for deposits
 *    - Webhook handlers for payment confirmation
 * 
 * 2. CALENDAR SYNC OPTIONS:
 *    - Google Calendar API integration
 *    - iCal feed generation
 *    - Two-way sync with management system
 * 
 * 3. EMAIL AUTOMATION:
 *    - SendGrid or Mailgun for transactional emails
 *    - Automated confirmation emails
 *    - Reminder emails 7 days before hire
 *    - Follow-up review requests
 * 
 * 4. BOOKING MANAGEMENT:
 *    - Backend API endpoints needed:
 *      POST /api/bookings - Create new booking
 *      GET /api/availability - Check date availability
 *      POST /api/payment - Process deposit payment
 *      GET /api/bookings/:id - Get booking details
 *      PUT /api/bookings/:id - Update booking
 *      DELETE /api/bookings/:id - Cancel booking
 * 
 * 5. RECOMMENDED TOOLS:
 *    - Calendly API for basic scheduling
 *    - Acuity Scheduling for advanced features
 *    - Booqable for rental equipment management
 *    - TidyCal for budget-friendly option
 *    - Simply Book Me for service businesses
 * 
 * 6. WEBHOOK EXAMPLE (Node.js/Express):
 * 
 *    app.post('/webhook/booking', async (req, res) => {
 *        const booking = req.body;
 *        
 *        // Validate booking
 *        const isAvailable = await checkAvailability(booking.startDate, booking.endDate);
 *        
 *        if (isAvailable) {
 *            // Create booking
 *            await createBooking(booking);
 *            
 *            // Send confirmation email
 *            await sendConfirmationEmail(booking.email, booking);
 *            
 *            // Update calendar
 *            await blockCalendarDates(booking.startDate, booking.endDate);
 *            
 *            res.json({ success: true, bookingId: booking.id });
 *        } else {
 *            res.status(400).json({ error: 'Dates not available' });
 *        }
 *    });
 * 
 * 7. FRONTEND INTEGRATION:
 *    Replace the form submission handler above with actual API calls:
 * 
 *    async function submitBooking(data) {
 *        const response = await fetch('/api/bookings', {
 *            method: 'POST',
 *            headers: { 'Content-Type': 'application/json' },
 *            body: JSON.stringify(data)
 *        });
 *        
 *        if (response.ok) {
 *            const result = await response.json();
 *            // Redirect to payment
 *            window.location.href = `/payment/${result.bookingId}`;
 *        }
 *    }
 */

// ============================================
// ANALYTICS & TRACKING
// ============================================

// Google Analytics tracking (add your GA tracking ID)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log('Event tracked:', category, action, label);
}

// Track booking attempts
if (bookingForm) {
    bookingForm.addEventListener('submit', () => {
        trackEvent('Booking', 'Submit', 'Booking Form');
    });
}

// Track package selections
if (packageSelect) {
    packageSelect.addEventListener('change', (e) => {
        trackEvent('Booking', 'Package Selected', e.target.value);
    });
}

// Track contact form submissions
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        trackEvent('Contact', 'Submit', 'Contact Form');
    });
}

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const text = e.target.textContent.trim();
        trackEvent('CTA', 'Click', text);
    });
});

// ============================================
// LOGO STEAM EFFECTS
// ============================================

const logoText = document.getElementById('logoText');
const letters = document.querySelectorAll('.logo-text .letter');

if (logoText) {
    let isHovering = false;
    
    logoText.addEventListener('mouseenter', () => {
        isHovering = true;
        letters.forEach((letter, index) => {
            letter.style.animation = 'none';
            // Force reflow
            void letter.offsetWidth;
            letter.style.animation = `letter-steam 1.2s ease-out forwards`;
            letter.style.animationDelay = `${index * 0.05}s`;
        });
    });
    
    logoText.addEventListener('mouseleave', () => {
        isHovering = false;
        letters.forEach((letter) => {
            letter.style.animation = 'none';
            // Force reflow
            void letter.offsetWidth;
            letter.style.animation = `letter-reset 0.5s ease-out forwards`;
        });
    });
}

// Enhanced steam effect for logo image - add multiple steam particles
const logoImageWrapper = document.querySelector('.logo-image-wrapper');
if (logoImageWrapper) {
    // Create additional steam particles dynamically
    for (let i = 0; i < 3; i++) {
        const steamParticle = document.createElement('div');
        steamParticle.className = 'steam-particle';
        steamParticle.style.cssText = `
            position: absolute;
            top: 50%;
            left: ${45 + i * 5}%;
            transform: translate(-50%, -50%);
            width: ${25 + i * 5}px;
            height: ${25 + i * 5}px;
            background: radial-gradient(circle, rgba(100, 100, 100, 0.85) 0%, rgba(130, 130, 130, 0.65) 25%, rgba(160, 160, 160, 0.45) 50%, rgba(180, 180, 180, 0.25) 70%, transparent 85%);
            border-radius: 50%;
            filter: blur(9px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        logoImageWrapper.querySelector('.steam-effect')?.appendChild(steamParticle);
    }
    
    logoImageWrapper.addEventListener('mouseenter', () => {
        const particles = logoImageWrapper.querySelectorAll('.steam-particle');
        particles.forEach((particle, index) => {
            particle.style.opacity = '1';
            particle.style.animation = `steam-rise 1.5s ease-out infinite`;
            particle.style.animationDelay = `${index * 0.2}s`;
        });
    });
    
    logoImageWrapper.addEventListener('mouseleave', () => {
        const particles = logoImageWrapper.querySelectorAll('.steam-particle');
        particles.forEach((particle) => {
            particle.style.opacity = '0';
            particle.style.animation = 'none';
        });
    });
}

