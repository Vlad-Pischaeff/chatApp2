const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Notification = require('../models/Notifications')
const router = Router()
const SECRET = config.get("jwtSecret")
const auth = require('../middleware/auth.middleware')

// /api/notification/new
router.put('/new', auth, async (req, res) => {
    try {
      const { to, text } = req.body
      const from = req.user.userId
      const notification = new Notification({ from, to, text })

      await notification.save((err, doc) => {
        if (err) {
          // console.error(err) 
          return res.status(500).json({ message:`Notification from ${from} to ${to} not created...` })
        } else {
          res.status(201).json({ message:`Notification from ${from} to ${to} created...` })
        }
      })
    } catch (e) {
      res.status(500).json({ message:`Something wrong ..., details ${e}` })
    }
  }
)

// get all notifications to user
router.get('/all', auth, async (req, res) => {
  try {
    const user = req.user.userId
    const notifications = await Notification.find({ to: user })
    res.status(201).json(notifications)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// get new notifications to user
router.get('/new', auth, async (req, res) => {
  try {
    const user = req.user.userId
    const notifications = await Notification.find({ to: user , verify: false })
    res.status(201).json(notifications)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// // get messages from public chat room
// router.get('/chat/:id', auth, async (req, res) => {
//   try {
//     const id = req.params.id
//     const messages = await Message.find({ to: id })
//     res.status(201).json(messages)
//   } catch(e) {
//     res.status(500).json({ message:`Something wrong ..., details ${e}` })
//   }
// })

// update notification information
router.patch('/:id', auth, async (req, res) => {
  try {
    const {id} = req.params
    const user = req.user.userId
    const result = await Notification.findByIdAndUpdate(id, req.body)
    const notifications = await Notification.find({ to: user , verify: false })
    res.status(201).json(notifications)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// // /api/auth/upload
// router.post('/upload', async (req, res) => {
//     try {
//       res.status(201).json({})
//     } catch (e) {
//       res.status(500).json({ message:`Something wrong while uploading ${e}...` })
//     }
//   }
// )

// // /api/auth/search

// router.post('/search', auth, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.user.userId })
//     const friends = [...user.friends, req.user.userId]
//     const users = await User.find({
//                                     login: { $regex: req.body.search, $options: "i" },
//                                       _id: { $nin: friends }
//                                   })           
//     res.status(201).json(users)
//   } catch(e) {
//     res.status(500).json({ message:`Something wrong ..., details ${e}` })
//   }
// })

// // list of friends ready to invite /api/auth/friends

// router.get('/friends', auth, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.user.userId })
//     const friends = await User.find({ _id: user.friends })
//     res.status(201).json(friends)
//   } catch(e) {
//     res.status(500).json({ message:`Something wrong ..., details ${e}` })
//   }
// })

// // list of invited friends /api/auth/invited

// router.post('/invited', auth, async (req, res) => {
//   try {
//     const invited = req.body.invited
//     const friends = await User.find({ _id: invited })
//     res.status(201).json(friends)
//   } catch(e) {
//     res.status(500).json({ message:`Something wrong ..., details ${e}` })
//   }
// })

// // add new friends /api/auth/friends
// router.patch('/friends', auth, async (req, res) => {
//   try {
//     const candidates = Object.values(req.body.friends)
//     await User.updateMany({ _id: req.user.userId }, { $push: { friends: candidates } })
//     const user = await User.findOne({ _id: req.user.userId })
//     const friends = await User.find({ _id: user.friends })
//     res.status(201).json(friends)
//   } catch(e) {
//     res.status(500).json({ message:`Something wrong ..., details ${e}` })
//   }
// })

// // remove from friends /api/auth/unfollow/:id
// router.patch('/unfollow/:id', auth, async (req, res) => {
//   try {
//     const id = req.params.id
//     await User.updateOne({ _id: req.user.userId }, { $pull: { friends: id } })
//     const user = await User.findOne({ _id: req.user.userId })
//     const friends = await User.find({ _id: user.friends })
//     res.status(201).json(friends)
//   } catch(e) {
//     res.status(500).json({ message:`Something wrong ..., details ${e}` })
//   }
// })


module.exports = router