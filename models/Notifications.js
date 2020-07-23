const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: { type: Types.ObjectId, ref: 'Users', required: true },
  to: { type: Types.ObjectId, required: true },
  text: { type: String, default: null },
  date: { type: Date, default: Date.now },
  verify: { type: Boolean, default: false },
})

module.exports = model('Notifications', schema)