const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const db_connect = require('./db');
db_connect();

const app = express();
const port = 3050;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const userRouter = require('./src/user/router');
app.use(userRouter);

app.listen(port, () => {
    console.log(`Backend is listening on 
    ${port}`)
});

// console.log()
