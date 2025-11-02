# Integration Guide - Nordic Heat Mobile Saunas

This guide provides detailed instructions for integrating real booking functionality, payment processing, and email automation into your Nordic Heat website.

## 📋 Table of Contents

1. [Quick Start Integration](#quick-start-integration)
2. [Booking System Setup](#booking-system-setup)
3. [Payment Integration](#payment-integration)
4. [Email Automation](#email-automation)
5. [Calendar Sync](#calendar-sync)
6. [Analytics & Tracking](#analytics--tracking)
7. [Going Live Checklist](#going-live-checklist)

---

## Quick Start Integration

### Option 1: No-Code Solution (Recommended for beginners)

**Time to setup: 2-3 hours**

**Stack:**
- **Forms:** Netlify Forms (free)
- **Booking:** Calendly (free tier)
- **Payments:** Stripe Payment Links
- **Email:** SendGrid (free tier)

**Steps:**

1. **Deploy to Netlify:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy
   ```

2. **Enable Netlify Forms:**
   Add to your contact form:
   ```html
   <form name="contact" method="POST" data-netlify="true">
       <input type="hidden" name="form-name" value="contact">
       <!-- rest of form -->
   </form>
   ```

3. **Embed Calendly:**
   Replace the booking form section with:
   ```html
   <div class="calendly-inline-widget" 
        data-url="https://calendly.com/your-name/sauna-booking" 
        style="min-width:320px;height:700px;">
   </div>
   <script src="https://assets.calendly.com/assets/external/widget.js"></script>
   ```

4. **Setup Stripe Payment Links:**
   - Create products in Stripe Dashboard
   - Generate payment links for each package
   - Add to booking confirmation emails

**Total Cost: £0-10/month**

---

### Option 2: Professional Solution (Recommended for scaling)

**Time to setup: 1-2 weeks**

**Stack:**
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Payments:** Stripe API
- **Email:** SendGrid API
- **Hosting:** Heroku or Digital Ocean

---

## Booking System Setup

### Solution A: Calendly Integration

**Free Tier Includes:**
- Calendar sync (Google, Outlook)
- Automated emails
- Basic customization
- 1 event type

**Setup:**

1. **Create Calendly Account:**
   - Go to [calendly.com](https://calendly.com)
   - Create free account
   - Connect your Google Calendar

2. **Create Event Type:**
   - Name: "Sauna Booking Consultation"
   - Duration: 15 minutes
   - Location: Phone call
   - Availability: Set your hours

3. **Customize Questions:**
   Add these custom questions:
   - Preferred package (dropdown)
   - Event date (date picker)
   - Delivery address (text)
   - Number of guests (number)
   - Special requests (textarea)

4. **Embed on Website:**
   ```html
   <!-- Replace booking section -->
   <section class="booking section-padding" id="booking">
       <div class="container">
           <h2>Book Your Consultation</h2>
           <div class="calendly-inline-widget" 
                data-url="https://calendly.com/your-link"
                style="min-width:320px;height:700px;">
           </div>
       </div>
   </section>
   <script src="https://assets.calendly.com/assets/external/widget.js"></script>
   ```

**Limitations:**
- Requires consultation call (not instant booking)
- Limited customization on free tier
- Calendly branding

---

### Solution B: Acuity Scheduling

**Cost: From $20/month**

**Better for:**
- Direct online payments
- Multiple calendars
- Custom branding
- Advanced features

**Features:**
- Accept deposits via Stripe/Square
- Automated reminders
- Gift certificates
- Coupons and packages
- Client portal

**Setup:**

1. Sign up at [acuityscheduling.com](https://acuityscheduling.com)
2. Create appointment types for each package
3. Set pricing and durations
4. Enable Stripe integration
5. Embed on your site:

```html
<iframe src="https://app.acuityscheduling.com/schedule.php?owner=YOUR_ID" 
        width="100%" 
        height="800" 
        frameBorder="0">
</iframe>
```

---

### Solution C: Custom Booking System

**For full control and no monthly fees (except hosting)**

**Tech Stack:**
```
Frontend: HTML/CSS/JS (already built)
Backend: Node.js + Express
Database: PostgreSQL
Payments: Stripe
Email: SendGrid
Hosting: Heroku/Railway/Render
```

**File Structure:**
```
project/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server/
│   ├── server.js
│   ├── routes/
│   │   ├── bookings.js
│   │   ├── payments.js
│   │   └── availability.js
│   ├── models/
│   │   └── Booking.js
│   └── utils/
│       ├── email.js
│       └── calendar.js
├── package.json
└── .env
```

**Backend Setup:**

1. **Initialize Project:**
```bash
npm init -y
npm install express pg stripe nodemailer dotenv cors
```

2. **Create server.js:**
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.post('/api/bookings', async (req, res) => {
    const { package, startDate, endDate, name, email, address } = req.body;
    
    // Check availability
    const isAvailable = await checkAvailability(startDate, endDate);
    
    if (!isAvailable) {
        return res.status(400).json({ error: 'Dates not available' });
    }
    
    // Create booking
    const booking = await createBooking(req.body);
    
    // Send confirmation email
    await sendBookingConfirmation(email, booking);
    
    res.json({ success: true, bookingId: booking.id });
});

app.get('/api/availability', async (req, res) => {
    const { month, year } = req.query;
    const bookedDates = await getBookedDates(month, year);
    res.json({ bookedDates });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

3. **Database Schema (PostgreSQL):**
```sql
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    package VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    delivery_address TEXT NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    guests INTEGER,
    special_requests TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    total_price DECIMAL(10, 2),
    deposit_paid BOOLEAN DEFAULT false,
    balance_paid BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dates ON bookings(start_date, end_date);
CREATE INDEX idx_status ON bookings(status);
```

4. **Update Frontend (script.js):**
```javascript
async function submitBooking(formData) {
    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Show success and redirect to payment
            window.location.href = `/payment?booking=${data.bookingId}`;
        } else {
            showErrorMessage(data.error);
        }
    } catch (error) {
        showErrorMessage('Booking failed. Please try again.');
    }
}
```

---

## Payment Integration

### Stripe Setup (Recommended)

**Why Stripe:**
- Industry standard
- Excellent documentation
- PCI compliant (you don't handle card data)
- 1.5% + 20p per transaction (UK)
- Supports deposits and subscriptions

**Setup Steps:**

1. **Create Stripe Account:**
   - Sign up at [stripe.com](https://stripe.com)
   - Complete business verification
   - Get API keys (Publishable & Secret)

2. **Install Stripe.js:**
```html
<!-- Add to index.html before </body> -->
<script src="https://js.stripe.com/v3/"></script>
```

3. **Create Payment Page (payment.html):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Payment - Nordic Heat</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container payment-page">
        <h1>Complete Your Booking</h1>
        
        <div class="booking-summary">
            <h3>Booking Details</h3>
            <p id="bookingDetails"></p>
            <div class="price-breakdown">
                <div class="price-item">
                    <span>Package Total:</span>
                    <strong id="totalPrice"></strong>
                </div>
                <div class="price-item">
                    <span>Deposit (30%):</span>
                    <strong id="depositAmount"></strong>
                </div>
            </div>
        </div>
        
        <form id="payment-form">
            <div id="card-element"></div>
            <div id="card-errors"></div>
            <button type="submit" class="btn btn-primary">
                Pay Deposit
            </button>
        </form>
    </div>
    
    <script src="payment.js"></script>
</body>
</html>
```

4. **Create payment.js:**
```javascript
const stripe = Stripe('YOUR_PUBLISHABLE_KEY');
const elements = stripe.elements();

// Create card element
const cardElement = elements.create('card', {
    style: {
        base: {
            fontSize: '16px',
            color: '#2a2a2a',
            fontFamily: 'Inter, sans-serif'
        }
    }
});
cardElement.mount('#card-element');

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get booking ID from URL
    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get('booking');
    
    // Create payment intent on server
    const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId })
    });
    
    const { clientSecret } = await response.json();
    
    // Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: cardElement
            }
        }
    );
    
    if (error) {
        document.getElementById('card-errors').textContent = error.message;
    } else {
        // Payment successful
        window.location.href = `/confirmation?booking=${bookingId}`;
    }
});
```

5. **Backend Payment Route:**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
    const { bookingId } = req.body;
    
    // Get booking details
    const booking = await getBooking(bookingId);
    const depositAmount = Math.round(booking.totalPrice * 0.3 * 100); // in pence
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: depositAmount,
        currency: 'gbp',
        metadata: { bookingId: bookingId }
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
});

// Webhook to handle successful payments
app.post('/webhook/stripe', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;
        
        // Update booking
        await updateBooking(bookingId, { depositPaid: true, status: 'confirmed' });
        
        // Send confirmation email
        const booking = await getBooking(bookingId);
        await sendPaymentConfirmation(booking);
    }
    
    res.json({ received: true });
});
```

---

## Email Automation

### SendGrid Setup

**Free Tier: 100 emails/day**

1. **Sign up at [sendgrid.com](https://sendgrid.com)**

2. **Install SDK:**
```bash
npm install @sendgrid/mail
```

3. **Create Email Templates:**

**Template 1: Booking Confirmation**
```
Subject: Booking Confirmation - Nordic Heat Sauna

Hi {{customerName}},

Thank you for your booking request!

BOOKING DETAILS:
Package: {{packageName}}
Dates: {{startDate}} to {{endDate}}
Guests: {{guestCount}}
Delivery Address: {{address}}

NEXT STEPS:
1. Complete your deposit payment: {{paymentLink}}
2. We'll send final confirmation within 4 hours
3. You'll receive delivery details 7 days before your booking

Questions? Reply to this email or call 01234 567 890

Best regards,
Nordic Heat Team
```

**Template 2: Payment Confirmation**
```
Subject: Payment Received - Your Sauna is Confirmed!

Hi {{customerName}},

Great news! Your deposit has been received and your booking is confirmed.

BOOKING REFERENCE: {{bookingId}}
Package: {{packageName}}
Dates: {{startDate}} to {{endDate}}

BALANCE DUE: £{{balance}}
Due Date: {{balanceDueDate}}

WHAT TO PREPARE:
✓ Level outdoor space (3m x 2m minimum)
✓ Clear access for delivery
✓ Towels and water for guests
✓ 2m clearance from buildings

We'll call you 7 days before to confirm delivery time.

Looking forward to bringing wellness to your door!

Nordic Heat Team
```

4. **Email Utility (server/utils/email.js):**
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendBookingConfirmation(booking) {
    const msg = {
        to: booking.customerEmail,
        from: 'hello@nordicheat.co.uk',
        subject: 'Booking Confirmation - Nordic Heat Sauna',
        templateId: 'd-xxxxx', // Your template ID
        dynamic_template_data: {
            customerName: booking.customerName,
            packageName: booking.package,
            startDate: formatDate(booking.startDate),
            endDate: formatDate(booking.endDate),
            guestCount: booking.guests,
            address: booking.deliveryAddress,
            paymentLink: `https://nordicheat.co.uk/payment?booking=${booking.id}`
        }
    };
    
    await sgMail.send(msg);
}

async function sendPaymentConfirmation(booking) {
    const balance = booking.totalPrice * 0.7;
    const balanceDueDate = new Date(booking.startDate);
    balanceDueDate.setDate(balanceDueDate.getDate() - 7);
    
    const msg = {
        to: booking.customerEmail,
        from: 'hello@nordicheat.co.uk',
        subject: 'Payment Received - Your Sauna is Confirmed!',
        templateId: 'd-yyyyy',
        dynamic_template_data: {
            customerName: booking.customerName,
            bookingId: booking.id,
            packageName: booking.package,
            startDate: formatDate(booking.startDate),
            endDate: formatDate(booking.endDate),
            balance: balance.toFixed(2),
            balanceDueDate: formatDate(balanceDueDate)
        }
    };
    
    await sgMail.send(msg);
}

module.exports = {
    sendBookingConfirmation,
    sendPaymentConfirmation
};
```

---

## Calendar Sync

### Google Calendar Integration

1. **Enable Google Calendar API:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create project
   - Enable Google Calendar API
   - Create credentials (OAuth 2.0)

2. **Install googleapis:**
```bash
npm install googleapis
```

3. **Calendar Utility:**
```javascript
const { google } = require('googleapis');

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function blockCalendarDates(startDate, endDate, bookingDetails) {
    const event = {
        summary: `Sauna Booking - ${bookingDetails.customerName}`,
        description: `Package: ${bookingDetails.package}\nPhone: ${bookingDetails.customerPhone}`,
        start: { date: startDate },
        end: { date: endDate },
        colorId: '10' // Green
    };
    
    await calendar.events.insert({
        calendarId: 'primary',
        resource: event
    });
}

async function getBookedDates(month, year) {
    const timeMin = new Date(year, month - 1, 1).toISOString();
    const timeMax = new Date(year, month, 0).toISOString();
    
    const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin,
        timeMax: timeMax,
        singleEvents: true
    });
    
    return response.data.items.map(event => event.start.date);
}
```

---

## Analytics & Tracking

### Google Analytics 4

1. **Create GA4 Property:**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create account
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add to index.html:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. **Track Events:**
```javascript
// Track booking starts
gtag('event', 'begin_checkout', {
    currency: 'GBP',
    value: packagePrice,
    items: [{
        item_name: packageName
    }]
});

// Track purchases
gtag('event', 'purchase', {
    transaction_id: bookingId,
    value: depositAmount,
    currency: 'GBP'
});
```

---

## Going Live Checklist

### Pre-Launch

- [ ] Replace all placeholder images with real photos
- [ ] Update contact information (phone, email, address)
- [ ] Set up business email (hello@nordicheat.co.uk)
- [ ] Configure SSL certificate (automatic with Netlify/Vercel)
- [ ] Test all forms on mobile and desktop
- [ ] Test booking flow end-to-end
- [ ] Set up payment processing (test mode first!)
- [ ] Create email templates
- [ ] Test email delivery
- [ ] Set up Google Analytics
- [ ] Create and submit sitemap
- [ ] Configure robots.txt
- [ ] Test page load speed
- [ ] Check mobile responsiveness
- [ ] Proofread all content
- [ ] Set up domain name
- [ ] Create social media accounts
- [ ] Test on multiple browsers

### Post-Launch

- [ ] Monitor analytics daily
- [ ] Respond to inquiries within 4 hours
- [ ] Update calendar availability
- [ ] Collect customer testimonials
- [ ] Take professional photos
- [ ] Start collecting reviews
- [ ] Set up Google My Business
- [ ] Create social media content
- [ ] Consider paid advertising
- [ ] Monitor and fix any bugs
- [ ] Regular backups
- [ ] Update content monthly

### Legal Requirements (UK)

- [ ] Terms & Conditions page
- [ ] Privacy Policy (GDPR compliant)
- [ ] Cookie Policy
- [ ] Business liability insurance
- [ ] Public liability insurance (£5m minimum)
- [ ] Health & safety documentation
- [ ] PAT testing for electrical equipment
- [ ] Business registration
- [ ] VAT registration (if revenue > £85k)

---

## Support & Resources

**Documentation:**
- [Stripe Docs](https://stripe.com/docs)
- [SendGrid Docs](https://docs.sendgrid.com)
- [Google Calendar API](https://developers.google.com/calendar)
- [Netlify Docs](https://docs.netlify.com)

**Community:**
- [Stack Overflow](https://stackoverflow.com)
- [Reddit r/webdev](https://reddit.com/r/webdev)
- [Dev.to](https://dev.to)

---

**Need help?** Check the main README.md for troubleshooting tips!

