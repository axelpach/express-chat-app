const express = require('express');
const message = require('../components/messages/network');
const users = require('../components/users/network');
const chats = require('../components/chats/network');

const routes = function (server){
    server.use('/message', message);
    server.use('/users', users);
    server.use('/chats', chats);
}

module.exports = routes;