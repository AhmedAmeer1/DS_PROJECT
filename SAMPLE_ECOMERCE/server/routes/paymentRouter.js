const router = require('express').Router()
const auth = require('../middleware/auth')
const Payments = require('../models/paymentModel')




// inserting payment details to the payment Document
router.post('/add',auth, async(req, res) =>{
    try {
        const {cardNumber, name, cvv,cardExpire} = req.body;
             
        const userID= req.user.id;
        

        if(cardNumber.length != 16) 
        return res.status(400).json({msg: "card number must be 16 digit."})

        if(cvv.length != 3) 
        return res.status(400).json({msg: "cvv must be 3 digit."})

      
        const payment = new Payments({cardNumber, name, cvv,cardExpire, userID})
    
            // Save mongodb
            await payment.save()
            res.send({msg:"you have made the payment successfull"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
          }
});



// retreiving payment details from  payment Document
router.get('/get',auth, async(req, res) =>{

    try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})








module.exports = router
