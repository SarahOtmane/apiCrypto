const express = require('express');
const app = express();
const port = 3000;
const cryptoApiProvider = require("./providers/cryptoApiProvider.js");

app.use(express.urlencoded());
app.use(express.json());

console.log(cryptoApiProvider.getAllcryptos());

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})