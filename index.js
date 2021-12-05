require('dotenv').config();

const express = require('express');
const cors = require('cors');

// import routers
const router = require('./src/routes');

// call express
const app = express();

// create port
const port = process.env.PORT || 9000;

app.use(express.json());
// use cors
app.use(cors());

// grouping router endpoint
app.use('/api/v1', router);
// static file directory  by file upload
app.use('/uploads', express.static('uploads'));

app.get('/', function (req, res) {
  res.send({
    message: 'Hello Literature',
  });
});

// create server
app.listen(port, () => console.log(`Server is listening on port : ${port}`));
