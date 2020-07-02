const {Router} = require('express')
const config = require('config')
const Rooms = require('../models/Rooms')
const auth = require('../middleware/auth.middleware')
const router = Router()

// create new room and return list of new rooms
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
    // res.status(201).json({ room })
    const rooms = await Rooms.find( {private, $or: [{ owner: req.user.userId}, { followers: req.user.userId}] })
    res.status(201).json(rooms)
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

router.post('/search', auth, async (req, res) => {
  try {
    const rooms = await Rooms.find({  private: false, 
                                      name: { $regex: req.body.search, $options: "i" },
                                      owner: { $not: { $eq: req.user.userId }},
                                      followers: { $not: { $eq: req.user.userId }}
                                  })
    // console.log('rooms...', rooms)
    res.status(201).json(rooms)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// patch /api/room/follow
router.patch('/follow', auth, async (req, res) => {
  try {
    const candidates = Object.values(req.body.friends)
    await Rooms.updateMany({ _id: candidates }, { $push: { followers: req.user.userId } })
    const rooms = await Rooms.find( {private: false, $or: [{ owner: req.user.userId}, { followers: req.user.userId}] })
    res.status(201).json(rooms)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// patch /api/room/unfollow
router.patch('/unfollow/:id', auth, async (req, res) => {
  try {
    const id = req.params.id
    await Rooms.updateOne({ _id: id }, { $pull: { followers: req.user.userId } })
    const rooms = await Rooms.find( {private: false, $or: [{ owner: req.user.userId}, { followers: req.user.userId}] })
    res.status(201).json(rooms)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// delete room by id /api/room/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Rooms.findByIdAndRemove(req.params.id) 
    const rooms = await Rooms.find( {private: true, $or: [{ owner: req.user.userId}, { followers: req.user.userId}] })
    res.status(200).json(rooms)
  } catch(e) {
    // console.log('get id', e)
    res.status(500).json({ message:`Something wrong... ${e}` })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id) 
    console.log('link...', link)
    res.json(link)
  } catch(e) {
    console.log('get id', e)
    res.status(500).json({ message:"Something wrong..." })
  }
})

module.exports = router