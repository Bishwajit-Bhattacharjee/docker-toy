const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


mongoose.connect(
    'mongodb://mongo:27017/my-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const app = express();
const port = 3050;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors());

const userRouter = require('./src/user/router');

app.use(function (req, res, next) {
    console.log(req.body) // populated!
    next()
})

app.use(userRouter);

app.listen(port, () => {
    console.log(`Backend is listening on 
    ${port}`)
});

// console.log()
