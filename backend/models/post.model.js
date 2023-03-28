const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required : true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  published: { type: String, required: true },
  revised: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true, min: [5, 'Content must have at least 5 characters'] },
  img: { type: String },
  price: { type: Number, required: true, min: [1, 'Price can not be 0'] },
  phone: { type: Number },
  location: { type: String, required: true },
  isLogged: { type: Boolean },
  file: { type: Buffer }
});

module.exports = mongoose.model('Post', postSchema);
