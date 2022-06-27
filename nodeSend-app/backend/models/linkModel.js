const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: { 
    type: String,
    required: true
  },
  name: { 
    type: String,
    required: true
  },
  name_original: { 
    type: String,
    required: true,
  },
  downloads: { 
    type: Number,
    required: true,
    default: 1
  },
  autor: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null,
  },
  password: { 
    type: String,
    default: null
  }
}, {
  timestamps: true
})

const Link = mongoose.model('Link', linkSchema)
module.exports = Link