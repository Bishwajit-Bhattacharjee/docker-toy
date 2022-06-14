const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://mongo:27017/my-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const app = express();
const port = 3050;

const userRouter = require('./src/user/router');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors());

app.use(userRouter);

app.listen(port, () => {
    console.log(`Backend is listening on 
    ${port}`)
});

// console.log()
