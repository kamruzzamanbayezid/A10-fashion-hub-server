const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7001;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
      res.send('Fashion hub is Running!!')
})

app.listen(port, () => {
      console.log(`Fashion hub is running in the port: ${port}`);
})