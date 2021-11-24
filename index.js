const express = require('express');
const cors = require('cors');

// call express
const app = express();

// create port
const port = process.env.PORT || 5000;

app.use(express.json());
// use cors
app.use(cors());

// grouping router endpoint
// app.use('/api/v1/', router);

app.use('/', (req, res) => res.send('hello server'));
// create server
app.listen(port, () => console.log(`Server is listening on port : ${port}`));
