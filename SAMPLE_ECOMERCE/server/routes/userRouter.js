const router = require('express').Router()

const auth = require('../middleware/auth')
const Users = require('../models/userModel')
const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




// inserting user details to the user Document
router.post('/register', async (req, res) =>{

    try {

        const {name,number,address,city ,email, password} = req.body;


        if(number.length != 10) 
        return res.status(400).json({msg: "phone  number must be 10 digit."})

        const user = await Users.findOne({email})
        if(user) return res.status(400).json({msg: "The email already exists."})

        if(password.length < 6) 
            return res.status(400).json({msg: "Password is at least 6 characters long."})

        // Password Encryption
        const passwordHash = await bcrypt.hash(password, 10)
       
        const newUser = new Users({
            name, number,address, city,email,password: passwordHash
        })

    
        await newUser.save()

        // Then create jsonwebtoken to authentication
        const accesstoken = createAccessToken({id: newUser._id})
        const refreshtoken = createRefreshToken({id: newUser._id})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })

        res.json({accesstoken})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

})









// login validation
router.post('/login', async (req, res) =>{
    try {
        const {email, password} = req.body;

        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({msg: "your email is incorrect"})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: " your password is incorrect."})

      
        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefreshToken({id: user._id})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })

        res.json({accesstoken})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }


})



router.get('/logout',async (req, res) =>{
    try {
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        return res.json({msg: "Logged out"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

})

 router.get('/refresh_token', async (req, res) =>{
    try {
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id})

            res.json({accesstoken})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

 })

 router.get('/infor', auth,  async (req, res) =>{

    try {
        const user = await Users.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({msg: "User does not exist."})

        res.json(user)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
 })



 //updating the cart details
  router.patch('/addcart', auth,async (req, res) =>{
    
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})



            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

  })



 // retreiving the customer details 
 router.get('/history',auth, async (req, res) =>{
    try {
        const history = await Users.find()
        res.json(history)
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
        
    }

 })



 const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}


module.exports = router