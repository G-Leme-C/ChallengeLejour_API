const lejour = require('../../../services/api/lejour');

module.exports = {
    async obterCasaisProbabilidadeRejeicao(req, res) {
        return res.status(200).json({teste: "sucesso"});
    },

    async obterCasamentosPorOrcamento(req, res) {
        return res.status(200).json({teste: "sucesso"});
    }

}