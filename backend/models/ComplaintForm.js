const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  description: { type: String, required: false },
  address: { type: String, required: false},
  latitude: { type: Number, required: false },
  longitude:{type: Number,required: false}
});

const Form = mongoose.model('Form', FormSchema);    //User -> name of the model and collection in dB in mongoDb

module.exports = Form;
