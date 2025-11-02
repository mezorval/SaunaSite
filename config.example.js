// ============================================
// NORDIC HEAT MOBILE SAUNAS - CONFIGURATION
// ============================================

// Copy this file to config.js and update with your actual values
// NEVER commit config.js to version control!

module.exports = {
    // Business Information
    business: {
        name: 'Nordic Heat Mobile Saunas',
        email: 'hello@nordicheat.co.uk',
        phone: '+44 1234 567890',
        address: {
            line1: 'Your Business Address',
            city: 'Oxfordshire',
            postcode: 'OX1 1AA',
            country: 'UK'
        },
        website: 'https://nordicheat.co.uk',
        baseLocation: {
            lat: 51.7520,
            lng: -1.2577
        }
    },

    // Pricing Configuration
    pricing: {
        packages: {
            evening: {
                name: 'Evening Escape',
                duration: 4, // hours
                price: 149,
                woodAmount: 4, // kg
                features: [
                    'Delivery & collection',
                    'Full setup & safety briefing',
                    'Wood fuel included (4kg)',
                    'Seats up to 6 people',
                    'Safety equipment provided',
                    '24/7 support hotline'
                ]
            },
            fullday: {
                name: 'Full Day Wellness',
                duration: 12,
                price: 249,
                woodAmount: 12,
                features: [
                    'Everything in Evening Escape',
                    'Extended 12-hour hire',
                    'Extra wood fuel (12kg total)',
                    'Premium sauna accessories kit',
                    'Aromatherapy oils included',
                    'Digital thermometer',
                    'Free rescheduling (7 days notice)'
                ]
            },
            weekend: {
                name: 'Weekend Retreat',
                duration: 48,
                price: 449,
                woodAmount: -1, // unlimited
                features: [
                    'Everything in Full Day',
                    'Full weekend (Fri-Sun)',
                    'Unlimited wood fuel',
                    'Premium towels & robes (6 sets)',
                    'Luxury sauna bucket & ladle',
                    'Bluetooth speaker',
                    'Free rescheduling anytime'
                ]
            }
        },
        
        // Delivery charges based on distance
        delivery: {
            freeRadius: 15, // miles
            standardRadius: 30,
            standardCharge: 25,
            // Calculate custom charges for distances beyond standardRadius
            calculateCharge: (distance) => {
                if (distance <= 15) return 0;
                if (distance <= 30) return 25;
                return 25 + ((distance - 30) * 2); // £2 per mile beyond 30
            }
        },
        
        // Deposit and payment terms
        payment: {
            depositPercentage: 30, // 30% deposit required
            balanceDueDays: 7, // Balance due 7 days before hire
            currency: 'GBP'
        },
        
        // Cancellation policy
        cancellation: {
            fullRefund: 14, // Full refund if cancelled 14+ days before
            partialRefund: 7, // 50% refund if cancelled 7-14 days before
            partialRefundPercentage: 50,
            noRefund: 7 // No refund if cancelled within 7 days
        }
    },

    // Stripe Payment Integration
    stripe: {
        publishableKey: 'pk_test_YOUR_PUBLISHABLE_KEY', // Get from Stripe Dashboard
        secretKey: process.env.STRIPE_SECRET_KEY, // Store in .env file
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        // Stripe configuration
        currency: 'gbp',
        paymentMethods: ['card'],
        captureMethod: 'automatic'
    },

    // Email Service (SendGrid)
    email: {
        provider: 'sendgrid',
        apiKey: process.env.SENDGRID_API_KEY,
        from: {
            email: 'hello@nordicheat.co.uk',
            name: 'Nordic Heat Mobile Saunas'
        },
        // Email templates
        templates: {
            bookingConfirmation: 'd-xxxxxxxxxxxxx',
            paymentConfirmation: 'd-yyyyyyyyyyyyy',
            preDeliveryReminder: 'd-zzzzzzzzzzzzz',
            postHireFollowup: 'd-aaaaaaaaaaaaa',
            cancellationConfirmation: 'd-bbbbbbbbbbbbb'
        },
        // Email scheduling
        reminders: {
            preDelivery: 7, // Send reminder 7 days before delivery
            postHire: 2, // Send follow-up 2 days after collection
            balanceDue: 10 // Send balance reminder 10 days before hire
        }
    },

    // Google Calendar Integration
    calendar: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: 'http://localhost:3000/oauth2callback',
        calendarId: 'primary', // or specific calendar ID
        timeZone: 'Europe/London'
    },

    // Database Configuration
    database: {
        // PostgreSQL
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'nordicheat',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: process.env.NODE_ENV === 'production',
        // Connection pool
        pool: {
            min: 2,
            max: 10
        }
    },

    // Server Configuration
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        corsOrigin: process.env.CORS_ORIGIN || '*',
        environment: process.env.NODE_ENV || 'development'
    },

    // Analytics
    analytics: {
        googleAnalyticsId: 'G-XXXXXXXXXX', // Get from Google Analytics
        facebookPixelId: '', // Optional
        enableTracking: true
    },

    // Social Media Links
    social: {
        facebook: 'https://facebook.com/nordicheat',
        instagram: 'https://instagram.com/nordicheat',
        twitter: 'https://twitter.com/nordicheat',
        pinterest: 'https://pinterest.com/nordicheat'
    },

    // Business Rules
    businessRules: {
        // Minimum booking notice (hours)
        minBookingNotice: 48,
        
        // Maximum advance booking (days)
        maxAdvanceBooking: 365,
        
        // Minimum hire duration (hours)
        minHireDuration: 4,
        
        // Maximum capacity
        maxCapacity: 6,
        
        // Blocked dates (maintenance, holidays, etc.)
        blockedDates: [
            // '2025-12-25', // Christmas Day
            // '2025-12-26', // Boxing Day
        ],
        
        // Operating days (0 = Sunday, 6 = Saturday)
        operatingDays: [0, 1, 2, 3, 4, 5, 6], // All days
        
        // Operating hours
        operatingHours: {
            start: 8, // 8 AM
            end: 20   // 8 PM
        },
        
        // Sauna specifications
        sauna: {
            heatingTime: 45, // minutes to reach optimal temp
            optimalTemp: 80, // Celsius
            maxTemp: 90,
            capacity: 6,
            dimensions: {
                length: 3, // meters
                width: 2,
                height: 2
            },
            clearanceRequired: 2, // meters from buildings
            accessWidth: 3 // meters needed for delivery
        }
    },

    // Feature Flags
    features: {
        enableOnlinePayment: true,
        enableInstantBooking: true,
        enableGiftVouchers: false,
        enableBlogPosts: false,
        enableReviews: true,
        enableLiveChat: false,
        enableMultipleUnits: false, // Set to true when you have multiple saunas
        enableAddOns: false, // Cold plunge, accessories, etc.
    },

    // Add-ons (when feature is enabled)
    addOns: {
        coldPlunge: {
            name: 'Cold Plunge Pool',
            price: 99,
            description: 'Complete the Nordic experience with ice-cold immersion'
        },
        premiumTowels: {
            name: 'Premium Towels & Robes',
            price: 29,
            description: 'Luxury towel and robe set for 6 people'
        },
        aromatherapy: {
            name: 'Aromatherapy Kit',
            price: 19,
            description: 'Essential oils and sauna scents'
        }
    },

    // Notifications
    notifications: {
        // Admin notification email
        adminEmail: 'bookings@nordicheat.co.uk',
        
        // SMS notifications (requires Twilio)
        sms: {
            enabled: false,
            provider: 'twilio',
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN,
            fromNumber: process.env.TWILIO_PHONE_NUMBER
        },
        
        // Slack notifications (optional)
        slack: {
            enabled: false,
            webhookUrl: process.env.SLACK_WEBHOOK_URL
        }
    },

    // Error Tracking (Sentry, LogRocket, etc.)
    errorTracking: {
        enabled: false,
        provider: 'sentry',
        dsn: process.env.SENTRY_DSN
    },

    // Rate Limiting (for API protection)
    rateLimiting: {
        enabled: true,
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    },

    // Security
    security: {
        // JWT configuration (if using JWT auth for admin panel)
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: '7d',
        
        // Session configuration
        sessionSecret: process.env.SESSION_SECRET,
        sessionMaxAge: 24 * 60 * 60 * 1000, // 24 hours
        
        // CORS
        corsOptions: {
            origin: process.env.CORS_ORIGIN || '*',
            credentials: true
        }
    },

    // Logging
    logging: {
        level: process.env.LOG_LEVEL || 'info', // error, warn, info, debug
        format: 'json', // json or text
        destination: 'console' // console, file, or both
    }
};

