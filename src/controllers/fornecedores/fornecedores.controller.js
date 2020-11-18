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

function filtrarInvoicesPorData(invoices, dataInicial, dataFinal) {
    return invoices.filter((invoice) => {
        return moment(invoice.CREATED_AT).isBetween(dataInicial, dataFinal);
    });
}

module.exports = {

    async obterRankingFornecedores(req, res) {
        let invoices = await lejour.getInvoices();

        let categorias = extrairCategorias(invoices);

        if(req.query.days > 0) {
            invoices = filtrarInvoicesPorData(invoices, moment().subtract(req.query.days, 'days'), moment());
        }
        
        let ranking = obterInvoicesAceitasPorCategoria(categorias, invoices);

        ranking = ordenarRanking(ranking)

        return res.status(200).json(ranking);
    },
    
    async obterAgendamentosPorInvoices(req, res) {
        let invoices = await lejour.getInvoices();
        let appointments = await lejour.getAppointments();

        let categorias = extrairCategorias(invoices);

        if(req.query.days > 0) {
            invoices = filtrarInvoicesPorData(invoices, moment().subtract(req.query.days, 'days'), moment());
        }

        let agendamentosPorInvoice = obterAgendamentosVsInvoicesAceitas(categorias, invoices, appointments);

        for(let i = 0; i < agendamentosPorInvoice.length; i++) {
            if(agendamentosPorInvoice[i].negocios_fechados > agendamentosPorInvoice[i].agendamentos_realizados) {
                let negociosFechados = agendamentosPorInvoice[i].negocios_fechados;
                agendamentosPorInvoice[i].negocios_fechados = agendamentosPorInvoice[i].agendamentos_realizados;
                agendamentosPorInvoice[i].agendamentos_realizados = negociosFechados;
            }
        }

        return res.status(200).json(agendamentosPorInvoice);
    }
}