// const fs = require('fs');

// let textFromFile = fs.readFileSync(`${__dirname}/txt/input.txt`,'utf-8')

// textFromFile = textFromFile.split(" ");
// for(let word of textFromFile){
//     if(word.length >8){
//         fs.appendFileSync(`${__dirname}/txt/validatedWords.txt`, word + "\n")
//     }
//     if(word.includes("es")){
//         fs.appendFileSync(`${__dirname}/txt/esWords.txt`, word + "\n")
//     }
// }

// ------------------------------------------------------------------------
// let textFromFile = fs.readFile(`${__dirname}/txt/input.txt`,'utf-8',(err, data)=>{
//     console.log(data);
// });



//Core modules

const fs = require('fs');
const http = require('http'); 
const url = require('url');
const findProduct = require('./modules/findProduct');

let products = fs.readFileSync(`${__dirname}/products/products.json`,'utf-8');
productsInJSON = JSON.parse(products);
console.log(products)

//Server

const hostname = 'localhost';
const port = '8888';

const server = http.createServer((req, res)=>{
    const {query, pathname} = url.parse(req.url, true);
    console.log('path',pathname);
    console.log('query',query);
    switch(pathname){
        case '/':
            res.writeHead(200,{
                'Content-Type': 'text/html',
            })
            res.end('Hello world');
            break;
        case '/api/products':

            res.writeHead(200,{
                'Content-Type': 'application/json',
            })
            res.end(products);

        case '/api/product':
            for(let product of productsInJSON)
                if(product.id == query.id){
                    res.writeHead(200,{
                        'Content-Type': 'application/json',
                        'my-header': 'I like node'
                    })
                    res.end(JSON.stringify(product));
                    break
                }
        default:
            res.writeHead(404,{
                'Content-Type': 'text/html',
                'my-header':'I like Node'
            })
            res.end('<h1>Page not found</h1>');
    }
})

server.listen(port,hostname, ()=>{
    console.log(`Server is listening on ${port} port`)
})





// http://locallhost:88/api/product?id=1
