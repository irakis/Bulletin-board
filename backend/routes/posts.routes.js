const express = require('express');
const router = express.Router();
const path = require('path');
const uuidv4 = require('uuidv4');
const multer = require('multer');

const Post = require('../models/post.model');

/*muters Storge*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img/uploads'));
  },
  filname: (req, file, cb) => {
    const filName = file.originalname;
    cb(null, uuidv4() + '-' + filName)
  }
})
/*muters uploads*/
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})


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

router.post('/posts/add', upload.single('img'), async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    console.log('url:', url);
    const { author, published, revised, status, title, content, img, price, phone, location } = req.body;
    const newPost = await new Post({
      author: author, 
      published: published,
      revised: revised,
      status: status,
      title: title,
      content: content,
      img: url + '/public/img/uploads' + img,
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
