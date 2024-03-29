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
console.log('what is the process:', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  dbUri = process.env.DATABASE_URL_API;
} else if (process.env.NODE_ENV === 'development') {
  dbUri = process.env.DATABASE_URL;
}
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */

const port = process.env.PORT || 8000;
console.log('port is:', port);
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});