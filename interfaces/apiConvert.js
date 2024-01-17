let parseString = require('xml2js').parseString;
const paparse = require("papaparse");

exports.convertResponse = async (response1) =>{
    try {
        const contentType = response1.headers.get('Content-Type');
        
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
    } catch (error) {
        console.error(error);
    }
}