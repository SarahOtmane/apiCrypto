const express = require('express');
const app = express();
const port = 3000;

const cryptoController = require('./controllers/cryptoController');

cryptoController.updatePrices();

app.use(express.urlencoded());
app.use(express.json());

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})