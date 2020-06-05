const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const router = Router()
const SECRET = config.get("jwtSecret")

// /api/auth/register
router.post(
  '/register',
  async (req, res) => {
    try {
      const { login, password } = req.body
      const candidate = await User.findOne({ login })
 
      if (candidate) {
        return res.status(400).json({message:`User ${login} is already exists...`})
      }
      
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ login, password: hashedPassword })
      
      await user.save((err, doc) => {
        if (err) {
          console.error(err) 
          return res.status(500).json({message:`User ${login} not created...`})
        } else {
          // const token = jwt.sign( { userId: doc.id }, SECRET, { expiresIn: '1h' } )
          // return res.status(201).json({ token, userId: doc.id })
          res.status(201).json({message:`User ${login} created...`})
        }
      })
    } catch (e) {
      console.log('Register error...', e)
      res.status(500).json({message:`Something wrong while user ${login} registration...`})
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  async (req, res) => {
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

      const token = jwt.sign( { userId: candidate.id }, SECRET, { expiresIn: '1h' } )

      res.status(201).json({ token, userId: candidate.id })
    } catch (e) {
      res.status(500).json({ message:`Something wrong ${e}...` })
    }
  }
)

// /api/auth/upload
router.post(
  '/upload',
  async (req, res) => {
    try {
      // console.log('upload...', req.body, req.headers)
      res.status(201).json({})
    } catch (e) {
      res.status(500).json({ message:`Something wrong while uploading ${e}...` })
    }
  }
)

module.exports = router