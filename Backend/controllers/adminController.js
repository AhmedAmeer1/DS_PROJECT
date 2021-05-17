
const userModel = require('../models/usersModel');


const adminController = {

    getUserDetail : async (req,res)=>{
        try {
           const users= await userModel.find().then(user => res.json(user));
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },



    deleteUser : async (req,res) =>{
        try {

            console.log(req.params.id)
           
              console.log(await  userModel.findByIdAndDelete(req.params.id))     
            
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }

    }, 
    getUser: async (req, res) =>{
        try {
            console.log("is is..."+req.params.id)
            const user = await userModel.findById(req.params.id)
           
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser :async (req,res)=>{

        try {
            
        } catch (error) {
            
        }
    }


}

module.exports = adminController