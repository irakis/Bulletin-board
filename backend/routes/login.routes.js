const express = require('express');
const router = express.Router();

const Author = require('../models/author.model');

router.get('/login/author/:id', async (req, res) => {
    console.log('login authors endpoint fire!!!');
    console.log('what is req.params.id:', req.params.id);
    try {
      const result = await Author
        .find({ email: req.params.id });
      if(!result) res.status(404).json({ author: 'Not found' });
      else res.json(result);
    }
    catch(err) {
      res.status(500).json(err);
    }
  });

module.exports = router;