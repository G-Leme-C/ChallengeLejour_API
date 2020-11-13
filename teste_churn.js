const fs = require('fs');
const moment = require('moment');

let weddings = JSON.parse(fs.readFileSync('./data/wedding.json'));
let invoices = JSON.parse(fs.readFileSync('./data/invoice.json'));

let casamentosComData = weddings.filter((wedding) => {
    return wedding.WEDDING_DATE !== 'NULL';
});

let casamentosComInvoicesRecusadas = casamentosComData.filter((wedding) => {
    return invoices.find(invoice => (invoice.WEDDING_ID === wedding.ID) && (invoice.ACCEPTED !== "TRUE"));
});

let casamentosSemInvoiceGerada = casamentosComData.filter(wedding => {
    return !invoices.find(invoice => invoice.WEDDING_ID == wedding.ID);
});

console.log("Quantidade de casamentos com data:" + casamentosComData.length);
console.log("Quantidade de casamentos com invoices recusadas:" + casamentosComInvoicesRecusadas.length);
console.log("Quantidade de casamentos sem invoices geradas:" + casamentosSemInvoiceGerada.length);

let casamentosQueNaoConverteram = casamentosComInvoicesRecusadas.concat(casamentosSemInvoiceGerada);
console.log("Quantidade de casamentos que não converteram: " + casamentosQueNaoConverteram.length);

let dataPossivelConversao = moment().add(10, 'days');
let dataLimiteConversao = moment().add(90, 'days');
console.log("Data gerada: " + dataLimiteConversao.toString());

casamentosQueNaoConverteram = casamentosQueNaoConverteram.filter((wedding) => {
    return moment(wedding.WEDDING_DATE).isBetween(dataPossivelConversao, dataLimiteConversao);
}).map((wedding) => {
    const clientesChurn = {
        id_usuario: wedding.OWNER_ID,
        data_casamento: wedding.WEDDING_DATE
    };
    return clientesChurn;
});

console.log(casamentosQueNaoConverteram.length);
console.log(casamentosQueNaoConverteram);