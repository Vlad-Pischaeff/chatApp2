const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const router = Router()
const SECRET = config.get("jwtSecret")
const auth = require('../middleware/auth.middleware')

// /api/auth/register
router.post('/register', async (req, res) => {
    try {
      const { login, password, avatar } = req.body
      const candidate = await User.findOne({ login })
 
      if (candidate) {
        return res.status(400).json({message:`User ${login} is already exists...`})
      }
      
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ login, password: hashedPassword, avatar })
      
      await user.save((err, doc) => {
        if (err) {
          console.error(err) 
          return res.status(500).json({message:`User ${login} not created...`})
        } else {
          const token = jwt.sign( { userId: doc.id }, SECRET, { expiresIn: '10h' } )
          res.status(201).json({ login, token, userId: doc.id, avatar })
          // res.status(201).json({message:`User ${login} created...`})
        }
      })
    } catch (e) {
      console.log('Register error...', e)
      res.status(500).json({message:`Something wrong while user ${login} registration...`})
    }
  }
)

// /api/auth/login
router.post('/login', async (req, res) => {
    try {
      const { login, password } = req.body
      const candidate = await User.findOne({ login })

      if (!candidate) {
        return res.status(400).json({ message:`User ${login} not found...` })
      }

      const isMatch = await bcrypt.compare( password, candidate.password )
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password...' })
      }

      const token = jwt.sign( { userId: candidate.id }, SECRET, { expiresIn: '10h' } )

      res.status(201).json({ login, token, userId: candidate.id, avatar: candidate.avatar })
    } catch (e) {
      res.status(500).json({ message:`Something wrong ${e}...` })
    }
  }
)

// get user information
router.get('/user/:id', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.status(201).json(user)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// get users information
router.post('/users', auth, async (req, res) => {
  try {
    const candidates = req.body.users
    const users = await User.find({ _id: { $in: candidates } })
    res.status(201).json(users)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// update user information
router.patch('/user/:id', auth, async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findByIdAndUpdate(id, req.body)
    const newUser = await User.findOne({ _id: id })
    res.status(201).json(newUser)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// /api/auth/upload
router.post('/upload', async (req, res) => {
    try {
      res.status(201).json({})
    } catch (e) {
      res.status(500).json({ message:`Something wrong while uploading ${e}...` })
    }
  }
)

// /api/auth/search
router.post('/search', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId })
    const friends = [...user.friends, req.user.userId]
    const users = await User.find({
                                    login: { $regex: req.body.search, $options: "i" },
                                      _id: { $nin: friends }
                                  })           
    res.status(201).json(users)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// list of friends ready to invite /api/auth/friends
router.get('/friends', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId })
    const friends = await User.find({ _id: user.friends })
    res.status(201).json(friends)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// list of invited friends /api/auth/invited or
// list of users profile in array of id's including room owner profile
router.post('/invited', auth, async (req, res) => {
  try {
    const invited = req.body.invited
    const friends = await User.find({ _id: invited })
    // console.log('friends...', friends, invited)
    res.status(201).json(friends)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// add new friends /api/auth/friends
router.patch('/friends', auth, async (req, res) => {
  try {
    const candidates = Object.values(req.body.friends)
    await User.updateMany({ _id: req.user.userId }, { $push: { friends: candidates } })
    const user = await User.findOne({ _id: req.user.userId })
    const friends = await User.find({ _id: user.friends })
    res.status(201).json(friends)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})

// remove from friends /api/auth/unfollow/:id
router.patch('/unfollow/:id', auth, async (req, res) => {
  try {
    const id = req.params.id
    await User.updateOne({ _id: req.user.userId }, { $pull: { friends: id } })
    const user = await User.findOne({ _id: req.user.userId })
    const friends = await User.find({ _id: user.friends })
    res.status(201).json(friends)
  } catch(e) {
    res.status(500).json({ message:`Something wrong ..., details ${e}` })
  }
})


module.exports = router