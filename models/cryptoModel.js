class Crypto{
    constructor(){
        this.price = [];
    }
}


class Bitcoin extends Crypto{
    constructor(){
        super()
        this.id = 'bitcoin',
        this.pourcentage = 0.5
    }
}


class Ethereum extends Crypto{
    constructor(){
        super()
        this.id = 'ethereum',
        this.pourcentage = 0.0002
    }
}


class Solana extends Crypto{
    constructor(){
        super()
        this.id = 'solana',
        this.pourcentage = 0.001
    }
}

module.exports = {
    Crypto,
    Bitcoin,
    Ethereum,
    Solana,
};