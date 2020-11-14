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


let casamentosQueNaoConverteram = casamentosComInvoicesRecusadas.concat(casamentosSemInvoiceGerada);

let dataPossivelConversao = moment().add(10, 'days');
let dataLimiteConversao = moment().add(90, 'days');

casamentosQueNaoConverteram = casamentosQueNaoConverteram.filter((wedding) => {
    return moment(wedding.WEDDING_DATE).isBetween(dataPossivelConversao, dataLimiteConversao);
}).map((wedding) => {
    const clientesChurn = {
        id_usuario: wedding.OWNER_ID,
        data_casamento: wedding.WEDDING_DATE
    };
    return clientesChurn;
});