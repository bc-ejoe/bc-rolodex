#!/usr/bin/env node
'use strict';

const Program = require('commander');
const pkg = require('./../package.json');
const Brands = require('./lib/brands');
const Products = require('./lib/products');
const Categories = require('./lib/categories');
const colors = require('colors');
const resolveAuth = require('./lib/auth');
const availableEntities = {
    brands: Brands,
    products: Products,
    categories: Categories
};
let storeUrl;
let auth;

Program.version(pkg.version)
       .option('-t, --type [type]', 'Select one of the following products, cateories, brands')
       .option('-p, --product', 'Add a product entity with your entity selection')
       .option('-s, --store_url [store_url]', 'Store URL to run commands against')
       .option('-n, --num [num]', 'Number of Entities to create')
       .option('-a, --auth [auth]', 'Legacy API key')
       .option('-u, --user [user]', 'API Username')
       .parse(process.argv);

console.log('Starting up...'.green);

if (!Program.store_url) {
    console.error('-s is missing, store URL is required'.red);
    process.exit(1);
}

storeUrl = Program.store_url;

if (!Program.auth || !Program.user) {
    console.error('-a or -u missing, auth key is required'.red);
    process.exit(1);
}

auth = resolveAuth(Program.user, Program.auth);

if (Program.type in availableEntities) {
    createEntity(Program.type, Program.num, Program.product);
} else {
    console.error(`${Program.type} is not a valid entity type`.red);
    process.exit(1);
}

function createEntity(entity, num, product) {
    new availableEntities[entity](Program.store_url, auth, {withProduct: product})
        .post(num)
        .then((response) => {
            if (!num) {
                num = 1
            }

            console.log(`${num} ${entity} Created!`.rainbow);
            if (product) {
                console.log('With products!'.rainbow)
            }

            console.log(`id: ${response.data.id}`, `${entity} name: ${response.data.name}`);
            process.exit(0);
        }).catch((err) => {
        console.error(err.data[0].message.red);
        process.exit(1);
    })

}
