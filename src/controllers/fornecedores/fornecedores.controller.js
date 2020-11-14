const lejour = require('../../services/api/lejour');
const moment = require('moment');

function extrairCategorias(invoices) {
    return invoices.map(invoice => invoice.VENDOR_CATEGORY).filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

function obtemInvoicesAceitasPorCategoria(categorias, invoices) {
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

function ordenaRanking(ranking) {
    return ranking.sort((a, b) => {
        if(a.negocios_fechados > b.negocios_fechados) return -1;
        if(a.negocios_fechados < b.negocios_fechados) return 1;
        if(a.negocios_fechados == b.negocios_fechados) return 0;
    });
}

module.exports = {

    async obterRankingFornecedores(req, res) {
        let invoices = await lejour.getInvoices();

        let categorias = extrairCategorias(invoices);
        
        let ranking = obtemInvoicesAceitasPorCategoria(categorias, invoices);

        ranking = ordenaRanking(ranking)

        return res.status(200).json(ranking);
    },

    async obterAgendamentosPorInvoices(req, res) {
        return res.status(200).json({teste: "sucesso"});
    }

}