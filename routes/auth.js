const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

//Validation
const Joi = require('@hapi/joi');
const schema = {
  name: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
};

router.post('/register', async (req, res) => {
  //Validate user data
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details.message[0]);

  //Check if email is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already in the database');

  //Hash passwords
  const salt = await bcrypt.gentSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', (req, res) => {
  res.send('Login');
});

module.exports = router;
