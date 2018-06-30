const express = require('express');
const router = require('./router/router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session)


const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ithub'
}
const sessionStore = new MySQLStore(options);

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

// 配置获取表单信息
app.use(bodyParser.urlencoded({ extended: false }));

// 配置 session
// 配置 seesion 插件
app.use(session({
    key: 'session_cookie_name',
    secret: 'keyboard cat', // 加密规则私钥，用来保证不同的丰巢快递柜的密码规则都是不一样的，
    resave: false,
    saveUninitialized: true ,// 是否在初始化的时候就给客户端发送一个 Cookie
    store: sessionStore
}))



app.use(router);
app.get('/',(req,res)=> {
    res.send('hello world');
})

