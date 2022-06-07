const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const heyfriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  age: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  image: {
    type: String,
    required: true    
  },
  gender: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  }
  
}, { timestamps: true })


// model
const heyfriendModel = mongoose.model('Heyfriend', heyfriendSchema)

// export
module.exports = heyfriendModel
