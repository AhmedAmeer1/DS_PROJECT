const File = require('../models/imageMidel');


const imageController ={

 

     obj :  (req,res) => {
      

       
      const {meta_data}=req.body;

         console.log("aaaaacaaa ---"+meta_data);
           console.log("Request ---", req.body);
           console.log("Request file ---", req.file);//Here you get file.
           const file = new File(meta_data);
           //file.meta_data = req.file;
            file.save().then(()=>{
           res.send({message:"uploaded successfully"})
           })
           /*Now do where ever you want to do*/
        
     }
     



}

module.exports=imageController