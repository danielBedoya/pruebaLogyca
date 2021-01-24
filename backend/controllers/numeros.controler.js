const db = require('../models')
const Numero = db.numeros
const Pares = db.pares

const primo = (n, d) =>{
    if (d<=1){
        return true;
    }else{
        if (n%d == 0){
            return false;
        }else{
            return primo(n, d-1)
        }
    }
}

exports.getPrimosNoBD = (req, res) =>{
    if(!req.body.numero) {
        res.status(400).send({
            message: "Debe ingresar un número"
        })
        return;
    }

    if (req.body.numero==1){
        res.send([])
        return;
    }

    var list_primos = []
    for (var i = 2; i <= req.body.numero; i++){
        if(primo(i, i-1)){
            list_primos.push(i)
        }
    }
    res.send(JSON.stringify(list_primos));
}

exports.paresNoBD = (req, res) => {
    if (req.body.numero==1){
        res.send([])
        return;
    }
    var list_pares = []
    for (var i = 2; i<=req.body.numero; i++){
        if(primo(i,i-1)){
            if(i+2 <= req.body.numero){
                if(primo(i+2,i+1)){
                    list_pares.push([i,i+2])
                }
            }
        }
    }
    res.send(JSON.stringify(list_pares));
}

exports.getPrimos = async (req, res) => {
    if(!req.body.numero) {
        res.status(400).send({
            message: "Debe ingresar un número"
        })
        return;
    }
    
    if (req.body.numero==1){
        res.send([])
        return;
    }else{
        var list_primos = []
        for (var i=2; i<=req.body.numero; i++){
            var numeroBD = await Numero.findOne({where: {numero: i}});
            if (numeroBD!=null){
                if(numeroBD.esPrimo){
                    list_primos.push(i)
                }
            }else{
                var numero = {
                    numero: i,
                    esPrimo: primo(i, i-1)
                }

                if (numero.esPrimo){
                    list_primos.push(i)
                }
    
                newNumero = await Numero.create(numero)
            }
        }
        if(req.url == '/primos'){
            res.send(JSON.stringify(list_primos));
        }else{
            return list_primos;
        }
    }

};

exports.findPares = async (req, res) => {
    const primosN = await this.getPrimos(req, res);
    var list_gemelos = [];
    for(var i = 0; i < primosN.length-1; i++){
        try {
            var gemelo = await Pares.findOne({where: {numero: primosN[i]}})
        } catch(e){
            console.log(e);
        }
        if(gemelo!=null){
            if(gemelo.gemelo != -1){
                list_gemelos.push([gemelo.numero, gemelo.gemelo])
            }
        }else{
            if(primosN[i+1]>primosN[i] && (primosN[i+1] - primosN[i] == 2) ){
                list_gemelos.push([primosN[i], primosN[i+1]]);
                var par1 = {
                    numero: primosN[i],
                    gemelo: primosN[i+1]
                }
                try {
                    var savePar1 = await Pares.create(par1)
                }catch(e) {
                    console.log(e);
                }

            }else{
                var sinPar = {
                    numero: primosN[i],
                    gemelo: -1
                }
                try {
                    var saveSinPar = await Pares.create(sinPar)
                }catch(e){
                    console.log(e)
                }
                
            } 
        }  
    }
    res.send(JSON.stringify(list_gemelos));
};
