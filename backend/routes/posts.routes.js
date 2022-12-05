const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author published status title img')
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
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {
    const { author, published, revised, status, title, content, img, price, phone, location } = req.body;
    const newPost = await new Post({
      author: author, 
      published: published,
      revised: revised,
      status: status,
      title: title,
      content: content,
      img: img,
      price: price,
      phone: phone,
      location: location,
  })
    await newPost.save();
    if(!newPost) res.status(404).json({ post: 'Not found' });
    else res.json(newPost);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
