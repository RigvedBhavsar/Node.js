require('dotenv').config();
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});
