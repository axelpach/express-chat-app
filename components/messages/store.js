
const Model = require('./model');

function addMessage(message){
    const myMessage = new Model(message);
    console.log(myMessage);
    // db.collection('messages').insertOne(myMessage, function (error, response) {
    //     if(error) {
    //         console.log('Error occurred while inserting');           
    //     } else {
    //        console.log('inserted record' + response);          
    //     }
    // });
    myMessage.save();
}

function getMessage(user){    
    return new Promise((resolve, reject) => {
        let filter = {};
        if(user != null){
            filter = {user: user};
        } 
        Model.find(filter)
            .populate('user')
            .exec((error, populated) => {
                if(error){
                    reject(error);
                    return false;
                }
                resolve(populated);
            })

        // resolve(messages);
    })
}

async function deleteMessage(messageId){
    let filter = {};
    if(messageId){
        filter = {_id: messageId}
    }
    const messageDeleted = await Model.deleteOne(filter);
    return messageDeleted;
}

async function updateMessage(messageId, message){
    const foundMessage = await Model.findOne({
        _id: messageId,        
    }); 

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage; 
}

module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateMessage,
    //get
    deleteMessage: deleteMessage
    //delete
}