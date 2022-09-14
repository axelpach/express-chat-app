
const Model = require('./model');


function addUser(user){
    const myUser = new Model(user);
    
    myUser.save();
}

async function getUser(name){
    let filter = {}
    if(name != null){
        filter = {name: name};
    }
    console.log(filter);
    const users = await Model.find(filter);
    return users;
}


module.exports = {
    add: addUser,
    list: getUser  
}