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
            // await client.connect();

            const productsCollection = client.db("ProductsDB").collection("products");
            const cartCollection = client.db("ProductsDB").collection("cartsProducts")

            app.get('/products', async (req, res) => {
                  const cursor = productsCollection.find()
                  const result = await cursor.toArray()
                  res.send(result);
            })

            // get user through id
            app.get('/productSingle/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: new ObjectId(id) };
                  const result = await productsCollection.findOne(query);
                  res.send(result);
            })

            // Nike
            app.get('/products/:Nike', async (req, res) => {
                  const { Nike } = req.params;
                  const query = { brand: Nike }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });
            // Adidas
            app.get('/products/:Adidas', async (req, res) => {
                  const { Adidas } = req.params;
                  const query = { brand: Adidas }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });
            // Zara
            app.get('/products/:Zara', async (req, res) => {
                  const { Zara } = req.params;
                  const query = { brand: Zara }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });
            // HM
            app.get('/products/:HM', async (req, res) => {
                  const { HM } = req.params;
                  const query = { brand: HM }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });
            // Levis
            app.get('/products/:Levis', async (req, res) => {
                  const { Levis } = req.params;
                  const query = { brand: Levis }
                  const cursor = productsCollection.find(query);
                  const result = await cursor.toArray();
                  res.send(result);
            });

            // update product
            app.put('/products/:id', async (req, res) => {
                  const id = req.params.id;
                  const product = req.body;
                  const filter = { _id: new ObjectId(id) }
                  const options = { upsert: true };
                  const updatedProduct = {
                        $set: {
                              image: product.image,
                              name: product.name,
                              brand: product.brand,
                              type: product.type,
                              price: product.price,
                              rating: product.rating,
                        },
                  };
                  const result = await productsCollection.updateOne(filter, updatedProduct, options);
                  res.send(result);
            })

            app.post('/products', async (req, res) => {
                  const products = req.body;
                  const result = await productsCollection.insertOne(products);
                  res.send(result)
            })

            // Products Cart
            app.get('/addToCart', async (req, res) => {
                  const cursor = cartCollection.find()
                  const result = await cursor.toArray()
                  res.send(result);
            })


            app.get('/addToCart/:email', async (req, res) => {
                  const { email } = req.params;
                  const query = { email: email }
                  const cursor = cartCollection.find(query)
                  const result = await cursor.toArray()
                  res.send(result);
            })

            app.get('/addToCartSingle/:id', async (req, res) => {
                  const id = req.params.id
                  const query = { _id: new ObjectId(id) }
                  const result = await cartCollection.findOne(query);
                  res.send(result)
            })

            app.delete('/addToCartSingle/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: new ObjectId(id) };
                  const result = await cartCollection.deleteOne(query);
                  res.send(result);
            })


            app.post('/addToCart', async (req, res) => {
                  const products = req.body;
                  const result = await cartCollection.insertOne(products);
                  res.send(result);
            })


            // Send a ping to confirm a successful connection
            // await client.db("admin").command({ ping: 1 });
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