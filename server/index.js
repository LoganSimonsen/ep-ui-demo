require('dotenv').config();
require('babel-polyfill');
const express = require('express')
const app = express()
const port = 3000

const EasyPost = require('@easypost/api');

const apiKey = process.env.testkey; //test!
// const apiKey = process.env.prodkey; //prod!!

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening on port ${port}!`))
