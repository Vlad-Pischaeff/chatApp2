const {Schema, model} = require('mongoose')

const schema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null },
  online: { type: Boolean, default: false },
  friends: [String]
})

module.exports = model('Users', schema)