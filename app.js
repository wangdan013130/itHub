const express = require('express');
const router = require('./router/router');
const app = express();

const port = 3000;
app.engine('html',require('express-art-template'))
app.use('/public', express.static('./public'));
app.use('/node_modules',express.static('./node_modules'))
app.listen(port, ()=> {
    console.log('监听3000端口');
})
app.use(router);
app.get('/',(req,res)=> {
    res.send('hello world');
})

