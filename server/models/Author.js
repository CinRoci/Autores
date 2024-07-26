const mongoose = require('mongoose');  

const AuthorSchema = new mongoose.Schema({  
    name: {  
        type: String,  
        required: true,  
        minlength: 3  
    },  
    quote: {  
        type: String,  
        required: true,  
        minlength: 3  
    }  
});  

module.exports = mongoose.model('Author', AuthorSchema);