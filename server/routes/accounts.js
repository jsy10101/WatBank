const router = require('express').Router();
let Account = require('../models/Account');
var mongoose = require('mongoose');
var mongodb = require('mongodb')

 router.route('/').get((req, res) => {
  Account.where()
     .then(accounts => res.json(accounts))
     .catch(err => res.status(400).json('Error: ' + err));
    });

// router.route('/:id').get((req, res) => {
//     Account.findById(req.params.id)
//       .then(accounts => res.json(accounts))
//       .catch(err => res.status(400).json('Error: ' + err));
//     });

router.route('/:userID/:accountID').get((req, res) => {
    Account.find({userID: req.params.userID, _id: mongoose.Types.ObjectId.createFromHexString(req.params.accountID)})
      .then(accounts => res.json(accounts))
      .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:userID').get((req, res) => {
    Account.find({userID: req.params.userID})
      .then(accounts => res.json(accounts))
      .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/add').post((req, res) => {
    const userID = req.body.userID;
    const type = req.body.type;
    const balance = req.body.balance;
    const createdAt =  req.body.createdAt;
    const updatedAt = req.body.updatedAt;
    
    const newAccount = new Account({userID, balance, type, createdAt, updatedAt});
  
    newAccount.save()
      .then(() => res.json('Account added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = router;