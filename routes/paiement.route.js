const express=require('express');
const router = express.Router();
const stripe = require ('stripe');
const Stripe =
stripe('sk_test_51NXTzzKMK7IedookjrhqX8REDXAjDGHAKPFbfvCtx9B12xEG1t0X71X0E0jkZXYvxBvJsenvT30yVbY8VF9LoAkn004ZfB8kEe');

router.post('/', async (req, res) => { console.log(req.body)
    let status, error;
    const { token, amount } = req.body;
    
    
    
    try {
    await Stripe.charges.create({
    source: token.id,
    amount,
    currency: 'usd',
    });
    status = 'success';
    } catch (error) {
    console.log(error);
    status = 'Failure';
    }
    res.json({ error, status });
    });
    module.exports = router;