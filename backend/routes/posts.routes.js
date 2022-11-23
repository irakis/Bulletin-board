const express = require('express');
const router = express.Router();

const Data = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Data
      .find({status: 'published' })
      .select('author published title img')
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
    const result = await Data
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
