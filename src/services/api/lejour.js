const axios = require('axios');

const baseURL = 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap';

module.exports = {

    async getUsers() {
        try {
            const response = await axios.get(baseURL + '/user')

            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getWeddings() {
        try {
            const response = await axios.get(baseURL + '/wedding')
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getInvoices() {
        try {
            const response = await axios.get(baseURL + '/invoice')
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getAppointments() {
        try {
            const response = await axios.get(baseURL + '/appointment')
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getWeddingFavorites() {
        try {
            const response = await axios.get(baseURL + '/wedding_favorites')
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    },
}