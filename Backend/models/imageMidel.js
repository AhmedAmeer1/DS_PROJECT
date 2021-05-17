var mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    meta_data:{
        type:String
    }
});

mongoose.model("file",fileSchema);