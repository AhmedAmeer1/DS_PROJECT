const userModel = require('../models/usersModel');


const userController ={

    register : async  (req,res)=>{
        try {
            
                const {name,email,password}=req.body;
                console.log("ggggggg"+name)

                const user = await userModel.findOne({email})
                if(user) return res.send({msg: "The email already exists."})

                
                const newUser = new userModel({name,email,password})
                console.log("aaaaaaa"+name)

                await newUser.save();
                res.send({msg:"user saved in the database"})

        } catch (error) {
            return res.send(500).json({msg: error.message})
        }

    }



}

module.exports=userController