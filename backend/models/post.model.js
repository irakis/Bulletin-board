const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required : true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  published: { type: Date, required: true },
  revised: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  isLogged: { type: Boolean }
});

module.exports = mongoose.model('Post', postSchema);
