const lejour = require('../../services/api/lejour');
const moment = require('moment');

function obtemCasamentosComData(weddings) {
    return weddings.filter((wedding) => {
        return wedding.WEDDING_DATE !== 'NULL';
    });
}

function obtemCasamentosSemInvoice(weddings, invoices) {
    return weddings.filter(wedding => {
        return !invoices.find(invoice => invoice.WEDDING_ID == wedding.ID);
    });
}

function obtemCasamentosComInvoicesRecusadas(weddings, invoices) {
    return weddings.filter((wedding) => {
        return invoices.find(invoice => (invoice.WEDDING_ID === wedding.ID) && (invoice.ACCEPTED !== "TRUE"));
    });
}

function filtrarPorData(weddings, dataInicial, dataFinal) {
    return weddings.filter((wedding) => {
        return moment(wedding.WEDDING_DATE).isBetween(dataInicial, dataFinal);
    });
}

function formataResposta(casamentos) {
    return casamentos.map((wedding) => {
        const clientesChurn = {
            id_usuario: wedding.OWNER_ID,
            data_casamento: wedding.WEDDING_DATE
        };
        return clientesChurn;
    });
}

module.exports = {
    async obterCasaisProbabilidadeRejeicao(req, res) {
        let weddings = await lejour.getWeddings();
        let invoices = await lejour.getInvoices();

        let casamentosComData = obtemCasamentosComData(weddings);
        let casamentosComInvoicesRecusadas = obtemCasamentosComInvoicesRecusadas(casamentosComData, invoices);
        let casamementosSemInvoiceGerada = obtemCasamentosSemInvoice(casamentosComData, invoices);

        let casamentosQueNaoConverteram = casamentosComInvoicesRecusadas.concat(casamementosSemInvoiceGerada)
        casamentosQueNaoConverteram = filtrarPorData(casamentosQueNaoConverteram, moment().add(10, 'days'), moment().add(90, 'days'));

        return res.status(200).json(formataResposta(casamentosQueNaoConverteram));
    },

    async obterCasamentosPorOrcamento(req, res) {
        return res.status(200).json({teste: "sucesso"});
    }
}