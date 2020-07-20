const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirm = req.body.confirm;

  console.log(confirm)

  User.findOne({username: username, email: email})
    .then(userDoc => {
      if(userDoc !== []){
        console.log(userDoc)
        // const error = new Error('Not authenticated');
        // error.statusCode = 401;
        // throw error;
        // return res.json(error)
          // console.log('Username or Email Exist, Please try to change username');
          // res.status(401).json({ message: 'Username or Email Exist, Please try to change username', username: username, email: email});

      }
      // if (password !== confirm) {
      //   res.status(401).json({ message: 'Password Did not Match', username: username, email: email});
      //   console.log('password is not confirmed')
      //   return
      // }
      console.log('password is confirmed')
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
          })
          console.log(newUser)
          return newUser.save();
        })
        .then(results => {
          res.status(201).json({message: 'User successfully created'});
          console.log('user created')
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

exports.postLogin = (req, res, next) => {
  const auth = req.body.auth;
  const password = req.body.password;

  let loadeduser;

  User.findOne({ email: auth})
    .then(userDoc => {
      if(!userDoc){
        console.log(userDoc);
        return
      }
      loadeduser = userDoc;
      return bcrypt.compare(password, userDoc.password)
      .then(result => {
        if(!result){
          console.log('Password Did not Match!');
          res.status(401).json({ message: 'Password Wrong Password', username: auth });
          return
        }
        console.log('username', loadeduser.username);
        console.log('Logged In!');
        const token = jwt.sign({
          username: loadeduser.username,
          userId: loadeduser._id.toString()
        }, 'somesupersecretsecret', { expiresIn: '1h'});
        res.status(200).json({token: token, username: loadeduser.username, userId: loadeduser._id.toString()})
      })
    })
    .catch(err => {
      console.log(err);

    })

}
