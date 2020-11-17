const express = require('express');
const routes = express.Router();

const CasaisController = require('./src/controllers/casais/casais.controller');
const FornecedoresController = require('./src/controllers/fornecedores/fornecedores.controller');

routes.get('/casais/churn', CasaisController.obterCasaisProbabilidadeRejeicao);
routes.get('/casais/orcamento', CasaisController.obterCasamentosPorOrcamento);
routes.get('/casais/estilos', CasaisController.obterEstilosDeCasamentoPorTempo);
routes.get('/fornecedores/ranking', FornecedoresController.obterRankingFornecedores);
routes.get('/fornecedores/invoices', FornecedoresController.obterAgendamentosPorInvoices);


module.exports = routes;