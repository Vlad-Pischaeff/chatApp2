const {Router} = require('express')
const config = require('config')
const Rooms = require('../models/Rooms')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.put('/create', auth, async (req, res) => {
  try {
    const { name, description, avatar, private } = req.body
    const owner = req.user.userId

    const existing = await Rooms.findOne({ name })

    if (existing) {
      return res.status(500).json({ message: `room ${name} already existing ...` })
    }

    const room = new Rooms({ name, description, avatar, private, owner })

    await room.save()
    res.status(201).json({ room })
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

router.get('/chatroom', auth, async (req, res) => {
  try {
    const rooms = await Rooms.find( {private: false, $or: [{ owner: req.user.userId}, { followers: req.user.userId}] })
    res.status(201).json(rooms)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

router.get('/privatechat', auth, async (req, res) => {
  try {
    const rooms = await Rooms.find( {private: true, $or: [{ owner: req.user.userId}, { followers: req.user.userId}] })
    res.status(201).json(rooms)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

router.get('/conversations', auth, async (req, res) => {
  try {
    const rooms = await Rooms.find( {private: true, $or: [{ owner: req.user.userId}, { followers: req.user.userId}] })
    res.status(201).json(rooms)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

router.post('/search', auth, async (req, res) => {
  try {
    const rooms = await Rooms.find( {private: false, name: { $regex: req.body.search, $options: "i" } })
    res.status(201).json(rooms)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id) 
    res.json(link)
  } catch(e) {
    console.log('get id', e)
    res.status(500).json({ message:"Something wrong..." })
  }
})

module.exports = router