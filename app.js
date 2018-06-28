const express = require('express');
const router = require('./router/router');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
// 监听端口
app.listen(port, ()=> {
    console.log('监听3000端口');
})

// 统一静态资源     
app.use('/public', express.static('./public'));
app.use('/node_modules',express.static('./node_modules'))

// 配置模板引擎     art-template    express-art-template
app.engine('html',require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);
app.get('/',(req,res)=> {
    res.send('hello world');
})

