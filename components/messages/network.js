const express = require('express');
const multer = require('multer');

const router = express.Router();

const response = require('../../network/response');
const controller = require('./controller');

const upload = multer({
    dest: 'public/files/'
});

router.get('/', (req, res) => {  
    const {user} = req.query;
    // response.success(req, res, 'Lista de mensajes');
    controller.getMessages(user)
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected error', 500, e);
        })
})

router.post('/',
    upload.single('file'),
    (req, res) => { 
        controller.addMessage(req.body.user, req.body.message, req.body.chatId, req.file)
            .then((fullMessage) => {
                response.success(req, res, fullMessage);
            })
            .catch(e => {
                response.error(req, res, 'Los datos no son correctos', 400);
            });
    })

router.patch('/:messageId', (req, res) => {
    const { messageId } = req.params;
    // console.log(messageId);
    controller.updateMessage(messageId, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, 'Error en la consulta', 500);
    });
})

router.delete('/:messageId', (req, res) => {
    const {messageId} = req.params;
    controller.deleteMessage(messageId)
        .then(() => {
            response.success(req, res, `Mensaje ${messageId} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'No se ha eliminado', 500);
        })
})

module.exports = router;