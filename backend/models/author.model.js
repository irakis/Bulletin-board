const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    email: { type: String, required : true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    phone: { type: Number, required: false },
    location: { type: String, reqired: false},
    isLogged: { type: Boolean, reqiired: false}
  });

module.exports = mongoose.model('Author', authorSchema);