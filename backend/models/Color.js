const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
});

const Color = mongoose.model('Color', colorSchema);
module.exports = Color;
