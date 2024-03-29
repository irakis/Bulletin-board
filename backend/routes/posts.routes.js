const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Post = require('../models/post.model');
const fs = require('fs')

/*multers Storge*/
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'build/img/uploads/');
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, path.basename(file.originalname.replaceAll(' ','_'), 
      path.extname(file.originalname)) + '-' + uniqueSuffix + path.extname(file.originalname));
  },

  limits: { fileSize: 2000000 
  }
});

const upload = multer({ storage: storage })

router.post('/posts/add', upload.single('uploaded_file'), async (req, res) => {
  const { author, published, revised, status, title, content, price, phone,  location } = req.body;
  try {
    
    const newPost = await new Post({
      published: published,
      revised: revised,
      status: status,
      title: title,
      content: content,
      img: ('/img/uploads/' + req.file.filename),
      price: price,
      phone: phone,
      location: location,
      author: author,
      },
    );

    await newPost.save();

    if (!newPost) { res.status(404).json({ post: 'newPost not found' })
    } else res.json(newPost);
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
    if (!result) res.status(404).json({ post: 'Not found' });
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
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id/edit', upload.single('uploaded_file'), async (req, res) => {
  
  const {author, revised, _id, published, status, title, content, img, price, phone, location} = req.body;
  const newFile = '/img/uploads/' + req.file?.filename;
  try {
    const post = await Post.findById(req.params.id);

      if (post) {
        if (req.file != undefined && post.img !== newFile) {
            fs.unlink(path.join(process.cwd(), 'build/' + post.img), (err) => {
              if (err) {
                res.send({message: 'couldnt delete the file' + err})
                }
            });
          req.body.img = newFile;
        } else {
            req.body.img = post.img; //====> do need this???
        } 
        await Post.updateOne({_id: _id},{$set: {author: author, revised: revised, status: status, 
          title: title, content: content, img: req.body.img, price: price, phone: phone, location: location, 
          published: published}}
        );
        res.json({message: 'OK post updated'});
      } else {
        res.status(404).json({ message: err })
      }
  } catch (err) { if (err) { res.status(500).json({ message: err }) }; return };
});

router.delete('/posts/:id', async (req, res)=>{
  try{
    const post = await Post.findById(req.params.id)
    if (post) {
      await Post.deleteOne({_id: req.params.id});

      fs.unlink(path.join(process.cwd(), 'build/' + post.img), (err) => {
        if (err) {
          res.send({message: 'couldnt delete the file' + err})
        }
      });
    } else 
      res.status(404).json({message: '...not found'})
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
