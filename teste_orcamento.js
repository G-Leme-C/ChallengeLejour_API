const fs = require('fs');

let weddings = JSON.parse(fs.readFileSync('./data/wedding.json'));

let retorno = [
    {
        faixa_valor: "5mil a 15mil",
        quantidade_casamentos: weddings.filter(wedding => (wedding.BUDGET >= 5000) && (wedding.BUDGET < 15000)).length
    },
    {
        faixa_valor: "15mil a 50mil",
        quantidade_casamentos: weddings.filter(wedding => (wedding.BUDGET >= 15000) && (wedding.BUDGET < 50000)).length
    },
    {
        faixa_valor: "50mil a 100mil",
        quantidade_casamentos: weddings.filter(wedding => (wedding.BUDGET >= 50000) && (wedding.BUDGET < 100000)).length
    },
    {
        faixa_valor: "100mil a 150mil",
        quantidade_casamentos: weddings.filter(wedding => (wedding.BUDGET >= 100000) && (wedding.BUDGET < 150000)).length
    },
    {
        faixa_valor: "150mil a 200mil",
        quantidade_casamentos: weddings.filter(wedding => (wedding.BUDGET >= 150000) && (wedding.BUDGET < 200000)).length
    },
    {
        faixa_valor: "200mil a 250mil",
        quantidade_casamentos: weddings.filter(wedding => (wedding.BUDGET >= 200000) && (wedding.BUDGET < 250000)).length
    },
    {
        faixa_valor: "250mil a 300mil",
        quantidade_casamentos: weddings.filter(wedding => (wedding.BUDGET >= 250000) && (wedding.BUDGET < 300000)).length
    },
    {
        faixa_valor: "300mil +",
        quantidade_casamentos: weddings.filter(wedding => (wedding.BUDGET >= 300000)).length
    }
];

console.log(retorno);