require("dotenv").config();
const express = require ("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const routes = require("./routes")

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api', routes);

/*server.get('/ping', (req,res)=>{
    res.json({pong: true});
});*/


server.listen(process.env.PORT, ()=>{
    console.log(`servidor rodando em: http://localhost:${process.env.PORT}`)
})