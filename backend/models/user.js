const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);    //User -> name of the model and collection in dB in mongoDb

module.exports = User;
