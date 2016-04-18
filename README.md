### Create quick test entities on your BigCommerce Store
This is a quick tool that will allow you to create
* Random Categories
* Random Product associated to the above category
* Random Brands
* Random Product associated to the above Brand (Useful for creating facets)
* Random Products

### Installation
`npm install -g bc-rolodex`

### Usage
```
Usage: rolodex [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -t, --type [type]            Select one of the following products, cateories, brands
    -p, --product                Add a product entity with your entity selection
    -s, --store_url [store_url]  Store URL to run commands against
    -n, --num [num]              Number of Entities to create
    -a, --auth [auth]            Legacy API key
    -u, --user [user]            API Username
```

`rolodex -s STORE_URL -u API_USER_NAME -a API_KEY -t brands -n 2 -p`

### Licence

USE AT YOUR OWN RISK, THERE ARE NO WARRANTIES OR SUPPORT FOR THIS SOFTWARE.

Copyright (c) 2016 Mick Ryan


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
