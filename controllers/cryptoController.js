var cron = require('node-cron');
const {Bitcoin, Ethereum, Solana} = require('../models/cryptoModel');
const cryptoApiProvider = require("../providers/cryptoApiProvider");
const { all } = require('axios');


exports.updatePrices = async () => {
    const bitcoin = new Bitcoin();
    const ethereum = new Ethereum();
    const solana = new Solana();

    let cryptoPrice = [{...bitcoin}, {...ethereum}, {...solana}];
    let tabIds = ['bitcoin', 'ethereum', 'solana'];

    await updatePriceData(tabIds, cryptoPrice);

    cron.schedule('* * * * *', () => {
        oberver(tabIds, cryptoPrice);
        updatePriceData(tabIds, cryptoPrice);
    });    
};

const updatePriceData = async (tabIds, cryptoPrice) => {
    try {
        let allPrice = await cryptoApiProvider.getAllcryptos(tabIds);

        for(let i = 0; i < tabIds.length; i++){
            if(tabIds[i] === cryptoPrice[i].id){
                let priceTab = cryptoPrice[i].price;
                priceTab.push(allPrice[tabIds[i]].usd);
                cryptoPrice[i].price = priceTab;
            }
        }

        console.log(cryptoPrice);  
    } catch (error) {
        console.error(error);
    }
};

const oberver = async (tabIds, cryptoPrice) => {
    for(let i = 0; i < tabIds.length; i++){
        let nbPrices = cryptoPrice[i].price.length;
        if(tabIds[i] === cryptoPrice[i].id && nbPrices === 2){
            let result = ((cryptoPrice[i].price[nbPrices-1] - cryptoPrice[i].price[0]) / cryptoPrice[i].price[0]*100);
            if(result >= cryptoPrice[i].pourcentage || result <= -cryptoPrice[i].pourcentage){    
                notify(cryptoPrice[i].id, result);
            }
            cryptoPrice[i].price.shift();
        }
    }
}


const notify = async(id, pourcentage) =>{
    if(pourcentage > 0) console.log(`${id} à augumenté de ${pourcentage}`);
    else console.log(`${id} à baissé de ${pourcentage}`);

}

