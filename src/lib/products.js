'use strict';

const Api = require('./api');
const colors = require('colors');
const Chance = require('chance');

class Products extends Api {
    constructor(store_url, auth, options) {
        super(store_url, auth);
        this.base_url = `${this.base_url}/products`;
        this.options = options
    }

    post(num, categoryOption, categoryId) {
        if (!num) {
            return super.post(this.base_url, this.generateProduct.bind(null, categoryOption, categoryId));
        }
         return super.postMany(this.base_url, this.generateProduct.bind(null, categoryOption, categoryId), parseInt(num));
    }

    generateProduct(categoryOption, categoryId) {
        const chance = new Chance();
        return {
            name: `${chance.word()}${chance.integer({min:1, max: 100000})}-product-rolodex`,
            type: 'physical',
            brand_id: categoryId || '16',
            description: chance.paragraph(),
            price: chance.dollar().replace('$', ''),
            categories: categoryOption ? categoryId : [1],
            availability: "available",
            weight: "0.5",
            is_visible: true
        }
    }
}

module.exports = Products;
