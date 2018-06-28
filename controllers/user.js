const db = require('./db_helper');
const md5 = require('md5');

exports.showSignin = (req,res)=> {
    res.render('signin.html');
};
// 处理登录逻辑
exports.handleSignin = (req,res)=> {
    res.send('handleSignin');
};

exports.showSignup = (req,res)=> {
    res.render('signup.html');
};
// 处理注册逻辑
exports.handleSignup = (req,res)=> {
    // res.send('handleSignup');
    // 获取到表单数据
    // 从数据库取出数据
    // 验证是否两者数据是否相同,若不同添加到数据库

    // 验证邮箱是否重复
    
    db.query(
        'select * from `users` where `email` = ?',
        req.body.email,
        (err,results)=> {
            if(err) {
                return res.send('服务器内部出错');
            }
            if (results.length > 0) {
                res.render('signup.html', {
                    msg : '邮箱已存在'
                })
                return;
            }
            // 验证昵称是否存在
            console.log(results);
            db.query(
                'select * from `users` where `nickname` =?',
                req.body.nickname,
                (err,results)=> {
                    if (err) {
                        return res.render('服务器内部出错');
                    }
                    if (results.length > 0) {
                        res.render('signup.html', {
                            msg : '昵称已存在'
                        })
                        return;
                    } 
                    req.body.createdAt = new Date();
                    req.body.password = md5(req.body.password);
                    db.query(
                        'insert into `users` set ?',
                        req.body,
                        (err,results)=> {
                            if (err) {
                                return res.send('服务器内部出错');
                            }
                            if(results.affectedRows == 1) {
                                res.redirect('/signin');

                            } else {
                                res.render('signup.html', {
                                    msg : "注册失败"
                                });
                            }
                        }
                    )
                }
            )
        }
    );
};
exports.handleSignout = (req,res)=> {
    res.send('handleSignout');
};


