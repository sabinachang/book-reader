const app = require('./app')
const Db = require('./services/db');
const db = new Db();
db.connect('local')
// start express server on port 5000
app.listen(process.env.dev || 5000, () => {
  console.log("server started on port 5000");
});

// const io = require('socket.io')(server)
// io.on('connection', socket => {

//   socket.on('updateFavorite', () => {
//     io.sockets.emit('fetchFavorite')
//   })
//   socket.on('disconnect', () => {
//     console.log('client disconnect')
//   })
// })

// app.io = io