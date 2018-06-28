const express = require('express');

const app = express();

const port = 3000;

app.listen(port, ()=> {
    console.log('监听3000端口');
})

app.get('/',(req,res)=> {
    res.send('hello world');
})