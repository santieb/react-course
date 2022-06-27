const Link = require('../models/linkModel')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const linkCtrl = {
  newLink: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { name_original } = req.body

    const link = new Link()
    link.url = shortid.generate()
    link.name = shortid.generate()
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
  getLink: async (req, res, next) => {
    const { url } = req.params

    const link = await Link.findOne({ url })

    if(!link) return res.status(400).json({ msg: 'link not found' })

    const { downloads, name } = link
    if (downloads === 1) {
      req.archive = name

      await Link.findOneAndRemove(url)
      next()
    }
    else {
      link.downloads--
      await link.save()
    }

    res.json({ archive: link.name })
  }
}

module.exports = linkCtrl