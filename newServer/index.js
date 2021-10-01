const path = require("path");
const express = require('express');
const compression = require('compression');
const controllers = require('./controllers/controllers.js');

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());
app.use(compression());

app.get('/products', controllers.getProducts);

app.get('/products/styles', controllers.getStyles);

app.get('/products/related', controllers.getRelated);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})