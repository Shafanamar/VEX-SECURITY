const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    const { tier } = req.body;

    let price;
    if (tier === 'Bronze') price = 500; // $5.00
    else if (tier === 'Silver') price = 1000; // $10.00
    else if (tier === 'Gold') price = 2000; // $20.00

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
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session', error);
        res.status(500).send('Failed to create session');
    }
});

module.exports = router;

