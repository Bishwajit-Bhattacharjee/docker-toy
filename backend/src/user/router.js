const express = require('express');

const User = require('./model');
const { getActiveUserByID } = require('./helpers');


const router = new express.Router();


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

    try {
        const user = await getActiveUserByID(req.params.id);
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
        const users = await User.find({isDeleted: false});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});


router.delete('/delete/:id', async (req, res) => {
    try{
        const user = await getActiveUserByID(req.params.id);
        user.isDeleted = true;
        
        await user.save();

        res.send('Successfully Deleted!');
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;