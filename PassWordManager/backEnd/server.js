const { MongoClient } = require('mongodb');
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(cors())

dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

client.connect().then(()=>console.log("connected"));

// Database Name
const dbName = 'keyGuardian';

const collectionName = "keyGuard";

app.get('/',async (req,res)=>{

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const findresult = await collection.find({}).toArray()
    console.log(findresult)
    res.json(findresult)
})

app.post('/',async (req,res)=>{

    const db = client.db(dbName);
    
    const password = req.body
    console.log(password)
    const collection = db.collection(collectionName);

    const findresult = await collection.insertOne(password)

    res.send({succes:true})
})

app.delete('/',async (req,res)=>{

    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const findresult = await collection.deleteOne(password)
    res.send({succes:true,result:findresult})
})




app.listen(port,()=>{console.log(`listening on port no ${port}`)})