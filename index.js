const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const ObjectId = require ('mongodb').ObjectID; 

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zalwj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceData = client.db("last-assignment-db").collection("services");
  const worksData = client.db("last-assignment-db").collection("works");
  const feedbackData = client.db("last-assignment-db").collection("feedback");

  console.log('database connected');

  app.post('/addService', (req, res) => {
    const task = req.body;
    serviceData.insertOne(task)
      .then(result => { 
        // res.send (result.insertedCount) 
      })
  })

//   app.post('/addJobCategory', (req, res) => {
//     const job = req.body;
//     allJobCategory.insertOne(job)
//       .then(result => { 
//         // res.send (result.insertedCount) 
//       })
//   })

  app.get('/services', (req, res) => {
    serviceData.find({})
    .toArray( (err, documents) => {
      res.send (documents);
    })
  })

  app.get('/works', (req, res) => {
    worksData.find({})
    .toArray( (err, documents) => {
      res.send (documents);
    })
  })
  app.get('/feedback', (req, res) => {
    feedbackData.find({})
    .toArray( (err, documents) => {
      res.send (documents);
    })
  })


//   app.get('/registeredJob', (req, res) => {
//     taskCollection.find({})
//     .toArray( (err, documents) => {
//       res.send (documents);
//     })
//   })

//   app.delete ('/deleteItem/:id', (req, res) => {
//     console.log(req.params.id);
//     taskCollection.deleteOne({_id: ObjectId(req.params.id)})
//     .then (( result) => {
//       console.log(result);
//     })
//   })


});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)

