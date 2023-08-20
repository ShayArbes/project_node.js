const express = require('express');
var morgan = require('morgan')

const productsRouter = require('./routes/productsRouter');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
//app.use(productsRouter);
app.use((req, res, next) => {
    productsRouter(req, res, next); 
  });
app.listen(3000, () => console.log("Server started on port 3000"));