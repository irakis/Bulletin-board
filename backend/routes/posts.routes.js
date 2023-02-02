const express = require('express');
const router = express.Router();
const path = require('path');
const uuidv4 = require('uuidv4');
const multer = require('multer');
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline)

const Post = require('../models/post.model');
const { Stream } = require('stream');

/*muters Storge*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/img/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.post('/posts/add', upload.single('uploaded_file'), async (req, res) => {
  try {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    const { author, published, revised, status, title, content, img, price, phone, location } = req.body;
    const newPost = await new Post({
      author: author, 
      published: published,
      revised: revised,
      status: status,
      title: title,
      content: content,
      img: url + '/public/img/uploads/' + img,
      price: price,
      phone: phone,
      location: location,
  })
    await newPost.save();
    if(!newPost) res.status(404).json({ post: 'Not found' });
    else res.json(newPost);

    await pipeline(file.stream, fs.createWriteStream(`${_dirname}/public/img/uploads/${filename}`));
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author title published location price phone revised status img content')
      .sort({published: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id)
      .select('author title published location price phone revised img status content');
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id/edit', async (req, res) => {
  
  const {author, revised, postId, published, status, title, content, img, price, phone, location} = req.body;

  try {
    const post = await Post.findById(req.params.id);
      if(post) {
        await Post.updateOne({_id: postId},{$set: {author: author, revised: revised, status: status, title: title, content: content,
          img: img, price: price, phone: phone, location: location, published: published}}
        );
      res.json({message: 'OK'});
      } else {
        res.status(404).json({ message: err })
      }
    } catch (err) { res.status(500).json({ message: err })}
  }
);

router.delete('/posts/:id', async (req, res)=>{
  try{
    const post = await Post.findById(req.params.id)
    if(post) {
      await Post.deleteOne({_id: req.params.id});
      res.json({message: 'OK'});
    } else 
      res.status(404).json({message: '...not found'})
  } 
  catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
