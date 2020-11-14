const fs = require('fs');

let invoices = JSON.parse(fs.readFileSync('./data/invoice.json'));

let categorias = invoices.map(invoice => invoice.VENDOR_CATEGORY).filter((value, index, self) => {
    return self.indexOf(value) === index;
});

let ranking = [];

categorias.forEach(vendorCat => {
    let invoicesAceitas = invoices.filter((invoice) => (invoice.ACCEPTED == "TRUE") && (invoice.VENDOR_CATEGORY === vendorCat)).length;
    ranking.push({
        categoria: vendorCat,
        negocios_fechados: invoicesAceitas
    });
});

ranking.sort((a, b) => {
    if(a.negocios_fechados > b.negocios_fechados) return -1;
    if(a.negocios_fechados < b.negocios_fechados) return 1;
    if(a.negocios_fechados == b.negocios_fechados) return 0;
});

console.log(ranking);
