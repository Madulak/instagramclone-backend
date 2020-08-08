const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
var cors = require('cors')

const app = express();

app.use(cors())

const MONGODB_URI = 'mongodb://localhost/insta-clone?retryWrites=true';
const MONGO = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kczql.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const authRoutes = require('./routes/auth');
const getpost = require('./routes/getpost');
const createpost = require('./routes/createpost');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}


app.use(bodyParser.urlencoded( {extended: false} ));
app.use(multer({storage: fileStorage, filterFile: fileFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, DELETE, PUT, PATCH, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(helmet());
app.use(compression());

app.use(authRoutes);
app.use(getpost);
app.use(createpost);

mongoose.connect(MONGO,  { useNewUrlParser: true ,useUnifiedTopology: true })
  .then(result => {
    app.listen(process.env.PORT || 8080);
    console.log('Server Running!!');
  })
  .catch(err => {
    console.log(err);
  });
