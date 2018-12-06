const express = require('express'), 
        bodyParser = require('body-parser'), 
        app = express(), 
        port = 8888,
        path = require("path");
        
const server = app.listen(port, function() {
    console.log(`server is running on port: ${port}`);
});
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var color = "white";

io.on('connection', function (socket) {
    console.log(socket.id);

    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server', color: color});
    socket.on('thankyou', function (data) {
        console.log(data.msg);
    });

    socket.on('color', function (data) {
        console.log(data.color);
        color = data.color;
        io.emit('updated_color', {color: color})
    })

});

app.get('/', function(req, res) {
    res.render("index.ejs");
});