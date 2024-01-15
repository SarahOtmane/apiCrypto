const axios = require("axios");

const baseUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csolana&vs_currencies=usd';

exports.getAllcryptos = async () => {
    let response = await axios.get(baseUrl);
    console.log(response.data);
    return response.data;
}