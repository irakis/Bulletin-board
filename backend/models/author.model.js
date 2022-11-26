const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    email: { type: String, required : true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    phone: { type: Number, required: false },
    role: { type: String, reqired: true},
  });

module.exports = mongoose.model('Author', authorSchema);