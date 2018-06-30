const userModel = require('../models/user');
const md5 = require('md5');

exports.showSignin = (req,res)=> {
    res.render('signin.html');
};
// 处理登录逻辑
exports.handleSignin = (req,res)=> {
    // res.send('handleSignin');
    // 验证用户的输入
    // 验证邮箱是否正确
   userModel.getByEmail(req.body.email,(err,user)=>{
        if (err) {
            return res.send('服务器内部出错');
        }
        if (!user) {
            return res.json({
                code : 401,
                msg : '邮箱不存在,请检查后输入或者注册'
            });
        }
        // 判断密码是否正确
        const password = md5(req.body.password);
        if (password == user.password) {
            // 记录 session
            delete user.password;
            req.session.user = user;
            res.json({
                code : 200,
                msg : '登录成功'
            })
        } else {
            res.json({
                code : 403,
                msg : '密码错误,请重新输入'
            });
        }

   });
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

    // 验证邮箱是否存在
    userModel.getByEmail(req.body.email,(err,user)=> {
        if (err) {
            return res.send('服务器内部出错');
        }
        if (user) {
            return res.render('signup.html', {
                msg : '邮箱已经存在'
            });
        }
        // 验证昵称是否存在
        userModel.getByNickname(req.body.nickname,(err,user)=> {
            if (err) {
                return res.send('服务器内部出错');
            }
            if (user) {
                return res.render('signup.html',{
                    msg : '昵称已存在'
                });
            }
            
            // 获取到时间与加密后的密码
            req.body.createdAt = new Date();
            req.body.password = md5(req.body.password);
            userModel.createUser(req.body,(err,isOk)=> {
               if (err) {
                   return res.send('服务器内部出错');
               }
                if (isOk) {
                   
                    res.redirect('/signin');
                } else {
                   
                    res.render('signup.html', {
                        msg : '注册失败'
                    });
                }
            });
        });
    });
};
exports.handleSignout = (req,res)=> {
    // res.send('handleSignout');
    delete req.session.user;
    // res.redirect('/signin');
    res.redirect('/signin');
};


