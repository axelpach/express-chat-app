const store = require('./store');

function addUser(name) {
    return new Promise((resolve, reject) => {
        
        if(!name){
            console.error('[userController] No hay usuario');
            return reject('Los datos son incorrectos');
        }
        
        const user = {
            name
        };

        // console.log(fullUser);
        store.add(user);
        resolve(user);
    })

}

function getUser(name){
    return new Promise((resolve, reject) => {        
        return resolve(store.list(name));
    });
}

module.exports = {
    addUser, getUser
}