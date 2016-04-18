'use strict';
const axios = require('axios');
const url = require('url');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class Api {
    constructor(store_url, auth) {
        this.base_url = `https://${store_url}/api/v2`;
        this.auth = auth;

    }

    get() {

    }

    /**
     *
     * @param {string} entityUrl
     * @param {function} payload
     * @returns {axios.Promise}
     */
    post(entityUrl, payload) {
        return axios.post(entityUrl, payload(), this.getHeaders()).then((resp) => {
            return resp;
        });
    }

    /**
     *
     * @param {string} entityUrl
     * @param {object} payload
     * @returns {axios.Promise}
     */
    getPromise(entityUrl, payload) {
        return axios.post(entityUrl, payload, this.getHeaders());
    }

    deleteProduct(entityUrl, id) {
        return axios.delete(url.resolve(entityUrl, id), this.getHeaders());
    }

    /**
     *
     * @param {string} entityUrl
     * @param {function} payload
     * @param {int} num
     * @returns {axios.Promise}
     */
    postMany(entityUrl, payload, num) {
        let products = [];
        for (var i = 0; i < num; i++) {
            products.push(this.getPromise(entityUrl, payload()));
        }

        return axios.all(products).then((response) => {
            return response;
        });
    }

    /**
     *
     * @returns {{headers: {authorization: string}}}
     */
    getHeaders() {
        return {
            headers: {
                authorization: `Basic ${this.auth}`
            }
        }
    }
}

module.exports = Api;
