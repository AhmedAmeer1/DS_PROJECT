const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')



const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {
console.log("inside payement router")

            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {

        
            const {cardNumber, name, cvv,cardExpire} = req.body;
             
            const userID= req.user.id;
            
          
            const payment = new Payments({cardNumber, name, cvv,cardExpire, userID})
        

            // Save mongodb
            await payment.save()
            res.send({msg:"you have made the payment successfull"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl
