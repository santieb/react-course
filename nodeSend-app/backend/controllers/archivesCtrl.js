const shortid = require('shortid')
const multer = require('multer')
const fs = require('fs')

const archivesCtrl = {
  uploadFiles: async (req, res) => {

    const configMulter = {
      limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
      storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, __dirname+'/../uploads')
        },
        filename: (req, file, cb) => {
          const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
          cb(null, `${shortid.generate()}${extension}`)
        }
      })
    }

    const upload = multer(configMulter).single('archive')

    upload(req, res, async (error) => {

      if(!error) res.json({ archive: req.file.filename})
      else console.log('error')
    })
  },
  deleteFiles: async (req, res) => {
    console.log(req.archive)
    try {
      fs.unlinkSync(__dirname + `/../uploads/${req.archive}`)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = archivesCtrl