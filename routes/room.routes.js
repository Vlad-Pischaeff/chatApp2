const {Router} = require('express')
const config = require('config')
const Rooms = require('../models/Rooms')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', auth, async (req, res) => {
  try {
    // const baseUrl = config.get('baseUrl')
    // const {from} = req.body
    console.log('create room body ...', req.body, 'header ...', req.headers)
    // const code = shortid.generate()

    // const existing = await Link.findOne({ from })

    // if (existing) {
    //   return res.json({ link: existing })
    // }

    // const to = baseUrl + '/t/' + code

    // const link = new Link({
    //   code, to, from, owner: req.user.userId
    // })

    // await link.save()
    // res.status(201).json({ link })
    
  } catch(e) {
    console.log('generate', e)
    res.status(500).json({ message:"Something wrong..." })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId})
    res.json(links)
  } catch(e) {
    console.log('get root', e)
    res.status(500).json({ message:"Something wrong..." })
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