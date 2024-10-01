const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Subscription = require('../../models/Subscription');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint to create a checkout session
router.post('/create-checkout-session', async (req, res) => {
    const { tier, userId, guildId } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${tier} Subscription`,
                        },
                        unit_amount: tier === 'Gold' ? 1000 : tier === 'Silver' ? 500 : 250, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}&guildId=${guildId}&tier=${tier}`,
            cancel_url: 'http://localhost:3000/cancel',
            metadata: {
                userId: userId,
                guildId: guildId,
                tier: tier,
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
