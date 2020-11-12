const fs = require('fs');

let users = JSON.parse(fs.readFileSync('./data/user.json'));
let weddings = JSON.parse(fs.readFileSync('./data/wedding.json'));
let invoices = JSON.parse(fs.readFileSync('./data/invoice.json'));


let casamentosComData = weddings.filter((wedding) => {
    return wedding.WEDDING_DATE !== 'NULL';
});


let casamentosComInvoicesRecusadas = casamentosComData.filter((wedding) => {
    return invoices.find(invoice => (invoice.WEDDING_ID === wedding.ID) && (invoice.ACCEPTED !== "TRUE"));
});

//console.log(casamentosComInvoicesRecusadas);

let casamentosSemInvoiceGerada = casamentosComData.filter(wedding => {
    return !invoices.find(invoice => invoice.WEDDING_ID == wedding.WEDDING_ID);
});

console.log(casamentosSemInvoiceGerada);

/*
console.log(users);
console.log(weddings);
console.log(invoices);
*/