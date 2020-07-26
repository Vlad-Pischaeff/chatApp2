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

module.exports = router