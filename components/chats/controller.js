const store = require('./store');

function createChat(users){

    return new Promise((resolve, reject) => {
        if(users.length < 2){
            console.log('[chatController] No hay suficientes usuarios para crear un chat');
            reject('[chatController] No hay suficientes usuarios para crear un chat');
        }

        const newChat = {
            users
        }

        store.create(newChat);
        resolve(newChat);
    });
}

function listChats(userId){
    return new Promise((resolve, reject) => {
        const user = {
            _id: userId
        }
        console.log(user);
        resolve(store.list(user));
    })
}

module.exports = {
    createChat,
    listChats
}