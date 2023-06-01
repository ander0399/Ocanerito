const express = require('express');
const Stripe = require('stripe');
const router = express.Router();


const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

router.post('/', async (req, res) =>{

    try {
        const { id, amount} = req.body

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Reserva en El Ocañerito",
        payment_method: id,
        confirm: true
    })

    //console.log(payment)
    //console.log("pagadoo")
        res.status(200).send({message: "Successfull payment"})
        
    } catch (error) {
        res.json({message: error.raw.message})
    }
})

module.exports = router
