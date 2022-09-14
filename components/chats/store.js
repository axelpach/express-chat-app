const Model = require('./model');

function createChat(users){
    const myChat = new Model(users);
    myChat.save();
}

function getChats(userId){
    return new Promise((resolve, reject) => {
        
        let filter = {}
        if(userId != null){
            filter = {users: userId}
        }
        console.log(filter);
        Model.find(filter)
        .populate('users')
        .exec((error, populated) => {
            if(error){
                reject(error);
                return false;
            }
            resolve(populated);
        });
    });
    // Model.find()
    // .populta;
    // return chats;
}

module.exports = {
    create: createChat,
    list: getChats
}