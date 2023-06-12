const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{ type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferredCity: { type: String },
  searches: [{ type: String }],
});

const userModel = mongoose.model('Users', userSchema);

module.exports = {
    userModel
}
