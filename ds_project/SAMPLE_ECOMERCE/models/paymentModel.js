const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
  
   

    cardNumber:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    cvv:{
        type: Number,
        required: true
    },
    cardExpire:{
        type: Number,
        required: true
    },
    
    
    userID:{
        type:String
        
    }
    
}, {
    timestamps: true
})


module.exports = mongoose.model("Payments", paymentSchema)