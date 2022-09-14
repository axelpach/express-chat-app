const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', (req, res) => {
    const {users} = req.body;
    // console.log(users);
    controller.createChat(users)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        })
});

router.get('/:userId', (req, res) => {
    controller.listChats(req.params.userId)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        })
})

module.exports = router;