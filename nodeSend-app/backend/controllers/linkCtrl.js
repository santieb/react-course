const Link = require('../models/linkModel')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const linkCtrl = {
  newLink: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { name_original, name } = req.body

    const link = new Link()
    link.url = shortid.generate()
    link.name = name
    link.name_original = name_original

    if (req.user) {
      const { password, downloads } = req.body

      if (downloads) link.downloads = downloads

      if (password) {
        const passwordHashed = await bcrypt.hash(password, 8)
        link.password = passwordHashed
      }

      link.autor = req.user.id
    }

    try {
      await link.save()

      res.send({ msg: `${link.url}` })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  getLinks: async (req, res, next) => {
    try {
      const links = await Link.find().select('url -_id')

      res.json({ links })
    } catch (err) {
      console.log(err)
    }
  },
  getLink: async (req, res, next) => {
    const { url } = req.params

    const link = await Link.findOne({ url })

    if(!link) return res.status(400).json({ msg: 'link not found' })

    return res.json({ archive: link.name, password: false })
  },
  hasPassword: async (req, res, next) => {
    const { url } = req.params

    const link = await Link.findOne({ url })

    if(!link) return res.status(400).json({ msg: 'link not found' })

    if (link.password) return res.json({ password: true, archive: link.url })
    
    next()
  },
  verifyPassword: async (req, res, next) => {
    const { url } = req.params
    const { password } = req.body

    const link = await Link.findOne({ url })

    const isMatch = await bcrypt.compare(password, link.password)
      if (!isMatch) return res.status(401).json({ msg: 'The password is wrong' })

    next()
  }
}

module.exports = linkCtrl