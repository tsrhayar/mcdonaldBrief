var express = require('express');
var router = express.Router();

const connectionString = "mongodb+srv://yaibi012:NEVERgiveUP@cluster0.lboed.mongodb.net/mcdoland?retryWrites=true&w=majority"

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('mcdoland')
    // const quotesCollection = db.collection('mcdoland')
      /* GET home page. */
  router.get('/', function(req, res) {
    db.collection('NosMenu').find().toArray()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(error => console.error(error))
  });

  router.get('/MIX', function(req, res) {
    db.collection('NosMenu').find({category:"mix"}).toArray()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(error => console.error(error))
  });

  router.get('/NOS-SANDWICHS', function(req, res) {
    db.collection('NosMenu').find({category:"nos-sandwichs"}).toArray()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(error => console.error(error))
  });

  router.get('/SALADE', function(req, res) {
    db.collection('NosMenu').find({category:"salade"}).toArray()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(error => console.error(error))
  });

  router.get('/BOISSONS', function(req, res) {
    db.collection('NosMenu').find({category:"boissons"}).toArray()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(error => console.error(error))
  });

  router.get('/SELECTED/:number', function(req, res) {
    db.collection('NosMenu').find({num:parseInt(req.params.number)}).toArray()
    .then(results => {
      console.log(req.params.number)
      res.status(200).send(results);
    })
    .catch(error => console.error(error))
  });
  })
  .catch(error => console.error(error))

module.exports = router;
