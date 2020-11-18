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

function formataRespostaChurn(casamentos) {
    return casamentos.map((wedding) => {
        const clientesChurn = {
            id_usuario: wedding.OWNER_ID,
            data_casamento: wedding.WEDDING_DATE
        };
        return clientesChurn;
    });
}

function quantidadeDeCasamentosPorBudget(casamentos, budgetMinimo, budgetMaximo) {
    return casamentos.filter(casamento => (casamento.BUDGET >= budgetMinimo) && (casamento.BUDGET < budgetMaximo)).length;
}

function formataRespostaOrcamento(casamentos) {
    return [
        {
            faixa_valor: "5mil a 15mil",
            quantidade_casamentos: quantidadeDeCasamentosPorBudget(casamentos, 5000, 15000)
        },
        {
            faixa_valor: "15mil a 50mil",
            quantidade_casamentos: quantidadeDeCasamentosPorBudget(casamentos, 15000, 50000)
        },
        {
            faixa_valor: "50mil a 100mil",
            quantidade_casamentos: quantidadeDeCasamentosPorBudget(casamentos, 50000, 100000)
        },
        {
            faixa_valor: "100mil a 150mil",
            quantidade_casamentos: quantidadeDeCasamentosPorBudget(casamentos, 100000, 150000)
        },
        {
            faixa_valor: "150mil a 200mil",
            quantidade_casamentos: quantidadeDeCasamentosPorBudget(casamentos, 150000, 200000)
        },
        {
            faixa_valor: "200mil a 250mil",
            quantidade_casamentos: quantidadeDeCasamentosPorBudget(casamentos, 200000, 250000)
        },
        {
            faixa_valor: "250mil a 300mil",
            quantidade_casamentos: quantidadeDeCasamentosPorBudget(casamentos, 250000, 300000)
        },
        {
            faixa_valor: "300mil +",
            quantidade_casamentos: quantidadeDeCasamentosPorBudget(casamentos, 300000, 400000)
        }
    ];
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

        const casamentosOrdenados  = casamentosQueNaoConverteram.sort((a,b) => moment(a.WEDDING_DATE).format('YYYYMMDD') - moment(b.WEDDING_DATE).format('YYYYMMDD'))

        return res.status(200).json(formataRespostaChurn(casamentosOrdenados));
    },

    async obterCasamentosPorOrcamento(req, res) {
        let weddings = await lejour.getWeddings();

        if(req.query.days > 0) {
            weddings = filtrarPorData(weddings, moment().subtract(req.query.days, 'days'), moment());
        }

        let resposta = formataRespostaOrcamento(weddings)
        return res.status(200).json(resposta);
    },


    async obterEstilosDeCasamentoPorTempo(req, res) {
        let weddings = await lejour.getWeddingStyles();

        res.status(200).json(weddings);
    }
}