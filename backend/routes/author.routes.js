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
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/login/author', async (req, res)=> {
  try {
      const authorEmail = req.user.emails[0].value;
      console.log('authorEmail????: ', authorEmail);

      const sessionKey = req.sessionID;
      console.log('sessionKey', sessionKey);

      await Author.findOneAndUpdate(
        {email: authorEmail},
        {isLogged: true},
        {new: true}
      )

     // const loggedAuthor = await Author.find(author=> author.email === authorEmail);
     // if (loggedAuthor) {
      //  await Author.updateOne({email: authorEmail},{isLogged: true});
       // console.log('endpoint logged author:', loggedAuthor);
          //loggedAuthor.isLogged = true;
          //loggedAuthor.session = sessionKey;
          //await loggedAuthor.save();
      //} else res.status(400).json({message: 'Not found'})
  } catch (err) {
      res.status(500).json({message: err})
  }
});

module.exports = router;