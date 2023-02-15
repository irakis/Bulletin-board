const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required : false, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  published: { type: String, required: false },
  revised: { type: String, required: false },
  status: { type: String, required: false },
  title: { type: String, required: false },
  content: { type: String, required: false },
  img: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  isLogged: { type: Boolean },
  id: { type: ObjectId }
});

module.exports = mongoose.model('Post', postSchema);
