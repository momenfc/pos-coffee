const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    trim: true,
    unique: [true, 'Name repated try another name!'],
  },
  role: {
    type: String,
    enum: ['user', 'lead', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    default: '123456',
    minlength: 6,
    select: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
