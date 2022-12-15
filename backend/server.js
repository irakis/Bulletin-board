const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session')
const passportConfig = require('./config/passport');
//const multer = reqiure('multer');

const postsRoutes = require('./routes/posts.routes');
const authorsRoutes = require('./routes/author.routes');
const loginRoutes = require('./routes/login.routes');

const app = express();

// init session mechanism
app.use(session({ secret: 'secretsessionkey112', resave: false, saveUninitialized: true }));

// init passport
app.use(passport.initialize());
app.use(passport.session());

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);
app.use('/api', authorsRoutes);
app.use('/api', loginRoutes);
app.use('/auth', require('./routes/auth.routes'));

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../public')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/Bulletin-board', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});