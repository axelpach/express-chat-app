const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(user, message, chatId, file) {
    
    return new Promise((resolve, reject) => {
        if(!user || !message || !chatId){
            console.error('[messageController] No hay usuario o mensaje o chatId');
            return reject('Los datos son incorrectos');
        }

        let fileUrl = '';
        if(file){
            fileUrl = 'http://localhost:3000/app/files/' + file.filename;
        }

        const fullMessage = {
            user: user,
            message: message,
            chat: chatId,
            file: fileUrl,
            date: new Date()
        };
        // console.log(fullMessage);
        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    })

}

function getMessages(user){
    // console.log(user);
    return new Promise((resolve, reject) => {
        
        resolve(store.list(user));
        
    });
}

function updateMessage(messageId, message){
    
    return new Promise(async (resolve, reject) => {
        
        if(!messageId || !message ){
            console.error('[messageController] No hay id o mensaje');
            return reject('No hay id o mensaje');
        } 
        
        const result = await store.updateText(messageId, message);
        resolve(result);

    })
}

function deleteMessage(messageId){
    return new Promise(async (resolve, reject) => {
        if(!messageId){
            console.error('[messageController] No hay id de mensaje a eliminar');
            return reject('No hay id de mensaje');
        }

        const result = await store.deleteMessage(messageId);
        resolve(result);
    })
}

module.exports = {
    addMessage, getMessages, updateMessage, deleteMessage
}