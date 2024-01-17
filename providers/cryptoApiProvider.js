const axios = require("axios");
let parseString = require('xml2js').parseString;
const paparse = require("papaparse");

exports.getAllcryptos = async (tabId) => {
    if(tabId.length < 1){
        console.log("Il n'ya pas d id");
    }else{
        let ids = `${tabId[0]}`;
        
        for(let i = 1; i < tabId.length; i++){
            ids += `%2C${tabId[i]}`;
        }

        const baseUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

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
}