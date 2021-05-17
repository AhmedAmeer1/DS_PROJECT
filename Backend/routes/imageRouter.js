const router = require ('express').Router()
//const imgController = require('../controllers/imageController')

const adminController = require('../controllers/adminController')


const multer = require('multer');
const path = require('path')



const storage = multer.diskStorage({
    //destination for files
    destination: function(req, file, cb) {
        cb(null, 'models');
    },
  
    //add back the extension
    filename: function(req, file, cb) { 
        cb(null, "Image" + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  



  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}



let upload = multer({ storage, fileFilter });

router.route('/add').post(upload.single('photo'), (req, res) => {
    //const photo = req.file.filename; 
    console.log(req.body);
});

// const fileFilter = (req, file, cb) => {​​​​​​​​
// const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
// if(allowedFileTypes.includes(file.mimetype)) {​​​​​​​​
// cb(null, true);
//     }​​​​​​​​ else {​​​​​​​​
// cb(null, false);
//     }​​​​​​​​
// }​​​​​​​​

// letupload = multer({​​​​​​​​ storage, fileFilter }​​​​​​​​);


// router.post('/add',(req,res)=>{

//     res.json({msg:"hiiiiiiiiii"})
// })















//console.log("xxxxxxx ---");
//router.post('/image1',imgController.obj)

//router.route('/image')

   
/*router.post('/image',(req,res)=>{

    res.send({msg:"hiiiiiiiiii"}),
    console.log("gggggggg")
})*/



module.exports  = router