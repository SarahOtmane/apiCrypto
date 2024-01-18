var cron = require('node-cron');
const {Bitcoin, Ethereum, Solana} = require('../models/cryptoModel');
const cryptoApiProvider = require("../providers/cryptoApiProvider");
const { all } = require('axios');



//récupérer les prix de chaque crypto tous les 1min
//comparer la premiere valeur et la derniere pour deduire le pourcentage de changement
exports.updatePrices = async () => {
    const bitcoin = new Bitcoin();
    const ethereum = new Ethereum();
    const solana = new Solana();

    //stocker les objets instancier dans un tab
    let cryptoPrice = [{...bitcoin}, {...ethereum}, {...solana}];
    let tabIds = ['bitcoin', 'ethereum', 'solana'];

    //faire appel à la fonction qui permet de mettre à jour les prix
    await updatePriceData(tabIds, cryptoPrice);

    //vérifier le changement des prix
    cron.schedule('* * * * *', () => {
        oberver(tabIds, cryptoPrice);
        updatePriceData(tabIds, cryptoPrice);
    });    
};


//fonction qui permet de mettre à jour le tableau des prix de chaque crypto
const updatePriceData = async (tabIds, cryptoPrice) => {
    try {
        //faire appel à la fonction qui permet de récuperer les données des crypto depuis une api externe
        let allPrice = await cryptoApiProvider.getAllcryptos(tabIds);

        //parcourir chaque crypto
        //récup le prix recup depuis l api externe 
        //ajouter ce prix au tableau des prix de chaque objet
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


//fonction qui permet d'observer s'il ya une différence entre le prix d'une crypto en 1h
const oberver = async (tabIds, cryptoPrice) => {
    for(let i = 0; i < tabIds.length; i++){
        let nbPrices = cryptoPrice[i].price.length;
        //parcourir chaque crypto
        //recup le pourcentage de différence entre la première donnée du tab et la dernière
        //voir si ce pourcentage de diff et supérieur ou égale au pourcentage déja prédéfinie
        //déclencher la fonction notify si c'est le cas
        if(tabIds[i] === cryptoPrice[i].id && nbPrices === 60){
            let result = ((cryptoPrice[i].price[nbPrices-1] - cryptoPrice[i].price[0]) / cryptoPrice[i].price[0]*100);
            if(result >= cryptoPrice[i].pourcentage || result <= -cryptoPrice[i].pourcentage){    
                notify(cryptoPrice[i].id, result);
            }
            cryptoPrice[i].price.shift();
        }
    }
}


//envoyer une nitification si les prix ont augumenté ou baissé d'un pourcentage donné
const notify = async(id, pourcentage) =>{
    if(pourcentage > 0) console.log(`${id} à augumenté de ${pourcentage}%`);
    else console.log(`${id} à baissé de ${pourcentage}%`);

}

