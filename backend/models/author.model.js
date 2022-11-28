const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const authorSchema = new mongoose.Schema({
    email: { type: String, required : true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    phone: { type: Number, required: false },
    role: { type: String, reqired: false},
    displayName: { type: String }
  });

  authorSchema.plugin(findOrCreate);

module.exports = mongoose.model('Author', authorSchema);