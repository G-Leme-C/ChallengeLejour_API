const lejour = require('../../services/api/lejour');
const moment = require('moment');

function extrairCategorias(invoices) {
    return invoices.map(invoice => invoice.VENDOR_CATEGORY).filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

function obterInvoicesAceitasPorCategoria(categorias, invoices) {
    let ranking = [];

    categorias.forEach(vendorCat => {
        let invoicesAceitas = invoices.filter((invoice) => (invoice.ACCEPTED == "TRUE") && (invoice.VENDOR_CATEGORY === vendorCat)).length;
        ranking.push({
            categoria: vendorCat,
            negocios_fechados: invoicesAceitas
        });
    });

    return ranking;
}

function ordenarRanking(ranking) {
    return ranking.sort((a, b) => {
        if(a.negocios_fechados > b.negocios_fechados) return -1;
        if(a.negocios_fechados < b.negocios_fechados) return 1;
        if(a.negocios_fechados == b.negocios_fechados) return 0;
    });
}

function obterQuantidadeInvoicesAceitas(invoices, vendorCat) {
    return invoices.filter((invoice) => (invoice.ACCEPTED == "TRUE") && (invoice.VENDOR_CATEGORY === vendorCat)).length;
} 

function obterAgendamentosVsInvoicesAceitas(categorias, invoices, appointments) {
    let ranking = [];

    categorias.forEach(vendorCat => {
        let invoicesAceitas = obterQuantidadeInvoicesAceitas(invoices, vendorCat);
        let agendamentosRealizados = appointments.filter((appointment) => (appointment.STATUS !== "CANCELED") && (appointment.VENDOR_CATEGORY == vendorCat)).length;
        ranking.push({
            categoria: vendorCat,
            negocios_fechados: invoicesAceitas,
            agendamentos_realizados: agendamentosRealizados
        });
    });

    return ranking;
}


module.exports = {

    async obterRankingFornecedores(req, res) {
        let invoices = await lejour.getInvoices();

        let categorias = extrairCategorias(invoices);
        
        let ranking = obterInvoicesAceitasPorCategoria(categorias, invoices);

        ranking = ordenarRanking(ranking)

        return res.status(200).json(ranking);
    },
    
    async obterAgendamentosPorInvoices(req, res) {
        let invoices = await lejour.getInvoices();
        let appointments = await lejour.getAppointments();

        let categorias = extrairCategorias(invoices);

        let agendamentosPorInvoice = obterAgendamentosVsInvoicesAceitas(categorias, invoices, appointments);

        return res.status(200).json(agendamentosPorInvoice);
    }

}