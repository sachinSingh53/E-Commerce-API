require('dotenv').config();
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listning on port ${PORT}`);
})