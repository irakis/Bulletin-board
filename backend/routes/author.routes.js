const express = require('express');
const router = express.Router();

const Author = require('../models/author.model');

router.get('/authors', async (req, res) => {
  try {
    const result = await Author
      .find().sort({ published: 1 });
    if(!result) res.status(404).json({ author: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/authors/:id', async (req, res) => {
  try {
    const result = await Author
      .find({email: req.params.id});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result.role);//<=========================================tu ma zwracać rolę
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;