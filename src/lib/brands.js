'use strict';

const Api = require('./api');
const colors = require('colors');
const Chance = require('chance');
const Products = require('./products');


class Brands extends Api {
    constructor(store_url, auth, options) {
        super(store_url,  auth);
        this.base_url = `${this.base_url}/brands`;
        this.store_url = store_url;
        this.auth = auth;
        this.options = options
    }

    post(num) {
        let thing = [];
        if (!num) {
            return super.post(this.base_url, this.generateBrand);
        }
        let brandPromises = super.postMany(this.base_url, this.generateBrand, parseInt(num));
        if (this.options.withProduct) {
            return brandPromises.then((brandResponse) => {
                brandResponse.forEach((ele) => {
                    thing.push(new Products(`${this.store_url}`, this.auth)
                        .post(1, false, ele.data.id));
                });

                Promise.all(thing).then((response) => {
                    return response
                }).catch((err) => {
                    console.error(err);
                })
            });
        } else {
            return super.postMany(this.base_url, this.generateBrand, num);
        }
    }

    generateBrand() {
        let chance = new Chance();
        return {
            name: `${chance.word()}-brand-rolodex`
        }
    }
}

module.exports = Brands;
