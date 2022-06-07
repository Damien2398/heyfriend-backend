const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Heyfriend = require('./../models/Heyfriend')
const path = require('path')

// GET- get all haircuts ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Heyfriend.find().populate('user', '_id firstName lastName')
    .then(heyfriends => {
      if(heyfriends == null){
        return res.status(404).json({
          message: "No friends found"
        })
      }
      res.json(heyfriends)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting friends"
      })
    })  
})

// POST - create new haircut --------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "group content can't be empty"})
  }
  // validate - check if image file exist
  if(!req.files || !req.files.image){
    return res.status(400).send({message: "Image can't be empty"})
  }

  console.log('req.body = ', req.body)

  // image file must exist, upload, then create new haircut
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
    // create new haircut
    let newFriend = new Heyfriend({
      name: req.body.name,
      description: req.body.description,
      age: req.body.age,
      price: req.body.price,
      user: req.body.user,
      image: uniqueFilename,
      gender: req.body.gender,
    })
  
    newFriend.save()
    .then(friends => {        
      // success!  
      // return 201 status with haircut object
      return res.status(201).json(friends)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating group",
        error: err
      })
    })
  })
})


// export
module.exports = router
