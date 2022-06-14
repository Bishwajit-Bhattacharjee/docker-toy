const express = require('express');
const User = require('./model');

const router = new express.Router();

router.get('/hello', async (req, res) => {
    res.send('Hello World!!');
});

router.get('/users', async (req, res) => {
    res.send('Lukiye Lukiye users dekha??')
});


router.post('/create', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/edit/:id', async (req, res) => {
    const allowedUpdates = ['firstName', 
        'lastName', 'mobileNo', 
        'email'
    ];

    const requestedUpdateKeys = Object.keys(req.body);
    
    const isValidUpdate = requestedUpdateKeys.
        every(key => allowedUpdates.includes(key));

    if (!isValidUpdate) {
        return res.status(400).
            send("Invalid Updates!");
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('No User Found!');
        }

        requestedUpdateKeys.forEach(
            key => user[key] = req.body[key]
        );

        await user.save();
        res.status(200).send(user);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', async (req, res) => {
    try{
        const users = await User.find({});

        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;