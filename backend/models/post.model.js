const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  email: { type: String, required : true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  phone: { type: Number, required: false },
  location: { type: String, reqired: false},
  isLogged: { type: Boolean, reqiired: false}
})


const postSchema = new mongoose.Schema({
  author: { type: authorSchema, required: true },
  published: { type: Date, required: true },
  revised: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Data', postSchema);
