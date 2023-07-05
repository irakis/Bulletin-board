const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const postsRoutes = require('./routes/posts.routes');

const app = express();

/* INIT SESSION MECHANISM */
app.use(session({ secret: 'secretsessionkey112', resave: false, saveUninitialized: true }));

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: '/api not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../build/img/uploads')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
if(process.env.NODE_ENV === 'production') {
  dbUri = process.env.DATABASE_URL
} else if(process.env.NODE_ENV === 'development') {
  dbUri = 'mongodb://localhost:27017/Bulletin-board'
} else {
  dbUri = 'mongodb://localhost:27017/Bulletin-board'
};

mongoose.connect( dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
if(process.env.NODE_ENV === 'production') {
  port = process.env.PORT;
  console.log('port prod', port);
} else {
  port = process.env.REACT_APP_PORT;
  console.log('port dev', port);
}
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});