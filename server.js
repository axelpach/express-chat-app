const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./network/routes');
const socket = require('./socket');

db(`mongodb+srv://axelpach:A251193a.@firstcluster.wci82qx.mongodb.net/chatapp?retryWrites=true&w=majority`);


const port = 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use(router);

socket.connect(server);
router(app);

app.use('/app', express.static('public'));

server.listen(port, () => {
    console.log('Running on port: ' + port);
})