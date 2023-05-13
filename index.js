const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Middleware;
app.use(cors());
app.use(express.json());

//dbUser79
//slSw0IiNmdPiYFgE
//


const uri = "mongodb+srv://dbUser79:slSw0IiNmdPiYFgE@cluster0.rlobwwy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const userCollection = client.db('usersDB').collection('users');

    app.get('/users', async(req,res)=>{
        const cursor = userCollection.find();
        const results = await cursor.toArray();
        res.send(results);

    })
        //creating an api on the server side;
    app.post('/users',async(req,res)=>{
        const user = req.body;
        console.log('new user',user)
        const result = await userCollection.insertOne(user);
        res.send(result);
       
       
    });

    //app.update;

    //app.delete;
    app.delete('/users/:id',async(req,res)=>{
      const id = req.params.id;
      console.log('Delete id from database',id);
      const query = { _id:new ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



//

app.get('/',(req,res)=>{
    res.send('Hello World');

})

app.listen(port,()=>{
    console.log(`yes, my server is running on port : ${port}`);
})

//67_5 module will be start;

/*

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Query for a movie that has title "Annie Hall"
    const query = { title: "Annie Hall" };

    const result = await movies.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);





*/