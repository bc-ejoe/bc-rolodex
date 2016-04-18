'use strict';

const Api = require('./api');
const Chance = require('chance');
const Products = require('./products');

class Brands extends Api {
    constructor(store_url, auth, options) {
        super(store_url, auth);
        this.store_url = store_url;
        this.base_url = `${this.base_url}/categories`;
        this.options = options;
        this.auth = auth;
    }

    post(num) {
        let thing = [];
        if (!num) {
            return super.post(this.base_url, this.generatePayload);
        }

        let categoryPromises = super.postMany(this.base_url, this.generatePayload, parseInt(num));
        if (this.options.withProduct) {
            return categoryPromises.then((categoryResponse) => {
                categoryResponse.forEach((ele) => {
                    thing.push(new Products(`${this.store_url}`, this.auth)
                        .post(1, true, ele.data.id));
                });

                Promise.all(thing).then((response) => {
                    return response
                }).catch((err) => {
                    console.error(err);
                })
            });
        } else {
            return super.postMany(this.base_url, this.generatePayload, num);
        }
    }

    generatePayload() {
        const chance = new Chance();
        return {
            name: `${chance.word()}-category-rolodex`
        }
    }
}

module.exports = Brands;
