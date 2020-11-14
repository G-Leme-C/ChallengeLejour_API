const fs = require('fs');

let invoices = JSON.parse(fs.readFileSync('./data/invoice.json'));
let appointments = JSON.parse(fs.readFileSync('./data/appointment.json'));

let categorias = invoices.map(invoice => invoice.VENDOR_CATEGORY).filter((value, index, self) => {
    return self.indexOf(value) === index;
});

let ranking = [];

categorias.forEach(vendorCat => {
    let invoicesAceitas = invoices.filter((invoice) => (invoice.ACCEPTED == "TRUE") && (invoice.VENDOR_CATEGORY === vendorCat)).length;
    let agendamentosRealizados = appointments.filter((appointment) => (appointment.STATUS !== "CANCELED") && (appointment.VENDOR_CATEGORY == vendorCat)).length;
    ranking.push({
        categoria: vendorCat,
        negocios_fechados: invoicesAceitas,
        agendamentos_realizados: agendamentosRealizados
    });
});

console.log(ranking);