const express = require ('express');
const cors = require ('cors');
const port = process.env.POST || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();


// Middleware
app.use(cors());
app.use(express.json());



//  MongoBD Pass & UserId

// shahinurislam2r
// zCad5eoZky0dOEKp




const uri = "mongodb+srv://shahinurislam2r:zCad5eoZky0dOEKp@cluster0.sxszi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    // const database = client.db("usersDB");
    // const userCollection = database.collection("users");

  const userCollection = client.db("usersDB").collection("users");


  // App Get
 app.get('/users' ,async(req, res) => {
  const cursor = userCollection.find()
  const result = await cursor.toArray();
  res.send(result);
 })


app.get('/users/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const user = await userCollection.findOne(query);
    res.send(user)
})





// App Post
  app.post('/users', async(req, res) => {
        const user = req.body;
        console.log("New User", user);
        const result = await userCollection.insertOne(user);
        res.send(result);

  })

  // App put (Update)
app.put('/users/:id', async(req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  const filter = {_id: new ObjectId(id)}
  const option = {upsert: true}
  const updateUser = {
    $set:{
      name:user.name,
      email:user.email
    }
  }
  const result = await userCollection.updateOne(filter, updateUser, option);
  res.send(result)

})


// App User Delete
app.delete('/users/:id', async(req, res) => {
  const id = req.params.id;
  console.log("please delete from database", id);
  const query = {_id: new ObjectId(id)};


  const result = await userCollection.deleteOne(query);
  res.send(result)
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





app.get('/', (req, res)=>{
    res.send('SIMPLE CRUD IS RUNNING ...')
})

app.listen(port, ()=>{
    console.log(`SIMPLE Crud is Running on port: ${port}`)
})