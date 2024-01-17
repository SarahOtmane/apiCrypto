const axios = require("axios");
let parseString = require('xml2js').parseString;
const paparse = require("papaparse");
const baseUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csolana&vs_currencies=usd';
// const baseUrl = 'https://www.w3schools.com/xml/note.xml';

exports.getAllcryptos = async () => {
    let response1 = await axios.get(baseUrl);
    
    fetch(baseUrl)
    .then(response => {
        const contentType = response.headers.get('Content-Type');
        
        if (contentType.includes('json')) {
            return response1.data;
            
        } else if (contentType.includes('xml')) {
            parseString(response1.data, function (err, result) {
                console.log(result);
                return result;
            });
        } else if (contentType.includes('csv')) {
            console.log('La réponse est au format CSV');
            return paparse.parse(response1);

        } else {
            console.log('Format inconnu');
        }
    })
    .catch(error => console.error('Erreur :', error));
}
