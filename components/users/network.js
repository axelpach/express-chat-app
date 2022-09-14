const express = require('express');
const router = express.Router();

const response = require('../../network/response');
const controller = require('./controller');

router.post('/', (req, res) => { 
    controller.addUser(req.body.name)
        .then((fullUser) => {
            response.success(req, res, fullUser, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500);
        });
})

router.get('/', (req, res) => {
    controller.getUser(req.query.name)
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        });
});

module.exports = router;