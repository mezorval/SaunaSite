# Quick Start Guide - Nordic Heat Mobile Saunas

Get your website up and running in 5 minutes!

## 🚀 Instant Preview (No Setup Required)

1. **Open the website:**
   - Double-click `index.html` in your file browser
   - OR right-click → "Open with" → Choose your web browser

2. **That's it!** The website is fully functional with:
   - ✅ Responsive navigation with mobile menu
   - ✅ Interactive FAQ accordion
   - ✅ Booking calendar (demo mode)
   - ✅ Contact and booking forms
   - ✅ All sections and content

## 📂 What's Included

```
Sauna Site/
│
├── index.html                 # Main website (complete & ready)
├── styles.css                 # All styling (modern & responsive)
├── script.js                  # Interactivity (fully functional)
│
├── README.md                  # Comprehensive documentation
├── INTEGRATION-GUIDE.md       # Detailed integration instructions
├── QUICK-START.md            # This file
│
├── email-templates.html       # 4 professional email templates
├── config.example.js          # Configuration reference
├── .env.example              # Environment variables reference
└── .gitignore                # Git ignore file
```

## 🎨 First Customizations (5 minutes)

### 1. Update Business Information

**In `index.html`, search for and replace:**

```html
<!-- Line ~10: Update page title -->
<title>Nordic Heat Mobile Saunas - Premium Sauna Hire UK | Wellness Delivered</title>

<!-- Line ~40: Update logo/business name -->
<div class="logo">
    <i class="fas fa-spa"></i>
    <span>Nordic Heat</span>  <!-- Change this -->
</div>

<!-- Footer contact info (near end of file) -->
<a href="tel:+441234567890">01234 567 890</a>
<a href="mailto:hello@nordicheat.co.uk">hello@nordicheat.co.uk</a>
```

### 2. Update Colors (Optional)

**In `styles.css`, lines 9-23:**

```css
:root {
    --primary-color: #2d5f4f;      /* Change to your brand color */
    --secondary-color: #c29356;    /* Change accent color */
    /* ... */
}
```

### 3. Add Your Logo

1. Save your logo as `logo.png` in the same folder
2. In `index.html`, replace the logo section:

```html
<div class="logo">
    <img src="logo.png" alt="Your Business Name" style="height: 40px;">
    <span>Your Business Name</span>
</div>
```

## 📱 Test on Mobile

1. **Option A - With Chrome DevTools:**
   - Press F12 → Click device icon (top left)
   - Choose "iPhone 12 Pro" or "Galaxy S20"
   - Test the mobile menu, forms, and scrolling

2. **Option B - On Your Phone:**
   - Put your files in Dropbox/Google Drive
   - Open the HTML file on your phone
   - OR use a local server (see below)

## 🌐 Put It Online (10 minutes)

### Easiest Method: Netlify Drop

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire folder onto the page
3. Your site is live! ✨
4. You get a URL like: `your-site-name.netlify.app`
5. Later, add your own domain in settings

### Alternative: GitHub Pages

1. Create a GitHub account (if you don't have one)
2. Create a new repository called `sauna-website`
3. Upload all files
4. Go to Settings → Pages → Enable GitHub Pages
5. Your site is live at: `yourusername.github.io/sauna-website`

## 🔧 Local Development Server (Recommended)

Using a local server prevents CORS issues and provides better testing.

### Method 1: Python (Easiest)

```bash
# If you have Python installed
python -m http.server 8000

# Then open: http://localhost:8000
```

### Method 2: Node.js

```bash
# If you have Node.js installed
npx serve

# Then open the URL shown in terminal
```

### Method 3: VS Code

1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

## 📧 Enable Contact Form (15 minutes)

### Quick Setup with Netlify Forms (FREE)

1. Deploy to Netlify (see above)
2. In `index.html`, add to your contact form:
   ```html
   <form name="contact" method="POST" data-netlify="true">
       <input type="hidden" name="form-name" value="contact">
       <!-- rest of your form fields -->
   </form>
   ```
3. Redeploy
4. Form submissions appear in Netlify dashboard
5. Set up email notifications in Netlify settings

### Alternative: FormSpree (FREE for 50 submissions/month)

1. Go to [formspree.io](https://formspree.io)
2. Create free account
3. Get your form endpoint
4. Update form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 💳 Accept Bookings (30 minutes)

### Simplest: Calendly + Stripe Payment Links

1. **Setup Calendly (FREE):**
   - Create account at [calendly.com](https://calendly.com)
   - Create "Sauna Consultation" event type
   - Add custom questions (package, address, etc.)

2. **Create Stripe Payment Links:**
   - Sign up at [stripe.com](https://stripe.com)
   - Go to Payment Links
   - Create links for each package (£149, £249, £449)

3. **Embed Calendly:**
   ```html
   <!-- In booking section of index.html -->
   <div class="calendly-inline-widget" 
        data-url="https://calendly.com/your-link"
        style="min-width:320px;height:700px;">
   </div>
   <script src="https://assets.calendly.com/assets/external/widget.js"></script>
   ```

4. **Add payment links to confirmation emails**

## 🖼️ Add Your Photos

### Replace Placeholder Images:

1. Create an `images/` folder in your project
2. Add your photos:
   ```
   images/
   ├── hero-sauna.jpg
   ├── sauna-interior.jpg
   ├── sauna-exterior.jpg
   ├── gallery-1.jpg
   └── gallery-2.jpg
   ```

3. In `index.html`, find placeholder divs and replace with:
   ```html
   <!-- Example: Hero section -->
   <div class="hero-background">
       <img src="images/hero-sauna.jpg" alt="Barrel sauna in nature">
   </div>
   
   <!-- Example: Gallery -->
   <div class="gallery-item">
       <img src="images/gallery-1.jpg" alt="Sauna exterior">
   </div>
   ```

### Image Optimization:

- Resize images to appropriate dimensions:
  - Hero: 1920x1080px
  - Gallery: 800x600px
- Use JPG format for photos (smaller file size)
- Compress images at [tinypng.com](https://tinypng.com)

## 📊 Add Google Analytics (5 minutes)

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `index.html` before `</head>`:

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

## 🎯 Next Steps (After Launch)

### Week 1:
- [ ] Test all forms and links
- [ ] Get feedback from 3-5 people
- [ ] Take professional photos
- [ ] Set up Google My Business
- [ ] Create social media accounts

### Week 2:
- [ ] Add real customer testimonials
- [ ] Update gallery with real photos
- [ ] Setup email automation
- [ ] Create content calendar
- [ ] Plan SEO strategy

### Month 1:
- [ ] Collect first reviews
- [ ] Analyze analytics data
- [ ] Optimize based on user behavior
- [ ] Start content marketing
- [ ] Consider paid advertising

## ❓ Common Questions

**Q: Do I need coding knowledge?**
A: No! The website works as-is. Basic HTML editing is helpful for customization.

**Q: What if something breaks?**
A: Keep a backup of the original files. Check the browser console (F12) for errors.

**Q: Can I use WordPress instead?**
A: Yes, but this is faster, cheaper (free hosting), and more secure.

**Q: How do I add a blog?**
A: See the Future Extensibility section in README.md for blog integration options.

**Q: Is it GDPR compliant?**
A: Add a Privacy Policy and Cookie banner. See templates at [termly.io](https://termly.io).

**Q: How do I accept payments?**
A: See "Accept Bookings" section above or INTEGRATION-GUIDE.md for detailed options.

## 🆘 Need Help?

1. **Check the documentation:**
   - README.md - Full documentation
   - INTEGRATION-GUIDE.md - Advanced integrations

2. **Browser console:**
   - Press F12 to see any JavaScript errors
   - Look for red error messages

3. **Test in different browsers:**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers

4. **Common fixes:**
   - Clear browser cache: Ctrl+Shift+Delete
   - Check file paths are correct
   - Ensure JavaScript is enabled
   - Check internet connection (for CDN resources)

## 🎉 You're Ready!

Your website is professional, modern, and ready to start taking bookings. Focus on:

1. ✅ Getting real photos
2. ✅ Setting up a simple booking flow
3. ✅ Promoting your business
4. ✅ Providing excellent service

The website is designed to grow with your business. Start simple, collect feedback, and iterate!

---

**Questions?** All documentation is in the README.md file.

**Good luck with your mobile sauna business!** 🔥🧖‍♀️

