const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const server = app.listen(8080, () => {    
    console.log("Servidor iniciado en el puerto 8080");    
});

let clients = 0;

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log("Usuario conectado");
    clients++;
    console.log(clients);
    io.emit('feed', {tweets: tweets});
    socket.on("disconnect", () => {
        clients--;
        console.log("El cliente se ha desconectado, no clientes:", clients);
    })

});


let tweets = [];

app.use(bodyParser.json());
app.use(cors());
app.post('/tweets', (req, res) => {
    const tweet = req.body.tweet;
    tweets.push(tweet);
    console.log(tweets);
    io.emit('feed', {tweets: tweets});
    res.json({
        message: "Tweet agregado satisfactoriamente"
    });
});

