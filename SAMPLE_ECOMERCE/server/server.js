require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
//const path = require('path')
const nodemailer = require('nodemailer');






const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






// connect to the mongodb
const uri ="mongodb+srv://ahmed:ahmed@cluster0.t9ube.mongodb.net/DsProject?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err =>{
    if(err) throw err;
    console.log('Conneced to MoDB')
})

  



// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/image', require('./routes/ImageUpload'))
app.use('/product', require('./routes/productRouter'))
app.use('/payment', require('./routes/paymentRouter'))


 
app.listen(port, () => {
    console.log(`Server is   running  on .....: ${port}`);
});
