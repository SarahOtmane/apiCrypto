const axios = require("axios");

exports.getAllcryptos = async (tabId) => {

    if(tabId.length < 1){
        console.log("Il n'ya pas d id");
    }else{
        let ids = `${tabId[0]}`;
        
        for(let i = 1; i < tabId.length; i++){
            ids += `%2C${tabId[i]}`;
        }

        const baseUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

        let response = await axios.get(baseUrl);
        return response.data;   
    } 
}
