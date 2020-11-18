const axios = require('axios');
const fs = require('fs');

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
            let weddings = JSON.parse(fs.readFileSync('./src/services/api/data/wedding.json'));

            return weddings;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getInvoices() {
        try {
            //const response = await axios.get(baseURL + '/invoice')
            let invoices = JSON.parse(fs.readFileSync('./src/services/api/data/invoice.json'));

            return invoices;
        }
        catch (error) {
            console.log(error);
        }
    },

    async getAppointments() {
        try {
            //const response = await axios.get(baseURL + '/appointment')
            let appointments = JSON.parse(fs.readFileSync('./src/services/api/data/appointment.json'));

            return appointments;
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

    async getWeddingStyles() {
        try {
            let weddingStyles = JSON.parse(fs.readFileSync('./src/services/api/data/wedding_styles.json'));

            return weddingStyles;
        }
        catch(error) {
            console.log(error);
        }
    }
}