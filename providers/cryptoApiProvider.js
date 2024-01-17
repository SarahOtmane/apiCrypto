const axios = require("axios");

const apiConvert = require('../interfaces/apiConvert');

exports.getAllcryptos = async (tabId) => {
    try {
        if(tabId.length < 1){
            // console.log("Il n'ya pas d id");
        }else{
            let ids = `${tabId[0]}`;
            
            for(let i = 1; i < tabId.length; i++){
                ids += `%2C${tabId[i]}`;
            }
    
            const baseUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
    
            let response1 = await axios.get(baseUrl);
            response1 = await apiConvert.convertResponse(response1);
    
            return(response1);
    
        } 
    } catch (error) {
        console.error(error);
    }
}