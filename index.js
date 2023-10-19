const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 7001;

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d8abmis.mongodb.net/?retryWrites=true&w=majority`;

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

            const productsCollection = client.db("ProductsDB").collection("products");

            app.get('/products', async (req, res) => {
                  const cursor = productsCollection.find()
                  const result = await cursor.toArray()
                  res.send(result);
            })
            // const brandName = req.params.brandName;
            // const products = await Product.find({ brand: brandName });

            // Nike
            app.get('/products/:Nike', async (req, res) => {
                  const { Nike } = req.params;
                  const query = { brand: Nike }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });
            // Adidas
            app.get('Adidas', async (req, res) => {
                  const { Adidas } = req.params;
                  const query = { brand: Adidas }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });
            // Zara
            app.get('Zara', async (req, res) => {
                  const { Zara } = req.params;
                  const query = { brand: Zara }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });
            // HM
            app.get('HM', async (req, res) => {
                  const { HM } = req.params;
                  const query = { brand: HM }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });
            // Levis
            app.get('Levis', async (req, res) => {
                  const { Levis } = req.params;
                  const query = { brand: Levis }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });

            app.post('/products', async (req, res) => {
                  const products = req.body;
                  const result = await productsCollection.insertOne(products);
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


app.get('/', (req, res) => {
      res.send('Fashion hub is Running!!')
})

app.listen(port, () => {
      console.log(`Fashion hub is running in the port: ${port}`);
})