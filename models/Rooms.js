const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  avatar: { type: String, default: null },
  private: { type: String, default: false },
  owner: { type: Types.ObjectId, ref: 'Users' },
  followers: [String]
})

module.exports = model('Rooms', schema)