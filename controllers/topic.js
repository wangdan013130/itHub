// 1 显示添加话题的页面
const categoryModel = require('../models/category');
const topicModel = require('../models/topic');
exports.showTopic = (req,res)=> {
    categoryModel.getAll((err,categories)=> {
        res.render('topic/create.html', {
            categories,
            user : req.session.user
        });
    });
};
// 2 处理添加话题页面
exports.handleCreate = (req,res)=> {
    // res.send('handleCreate');
    if (!req.session.user) {
        res.json({
            code : 403,
            msg : '登陆过期,请先登录'
        })
    }
    req.body.id = req.session.id;
    req.body.createdAt = new Date();
    topicModel.createTopic(req.body,(err,isOk)=>{
        if (err) {
            return res.json({
                code : 400,
                msg : '服务器内部出错'
            })
        }
        if (isOk) {
            res.json({
                code : 200,
                msg : '添加成功'
            });
        } else {
            res.json({
                code : 201,
                msg : '添加失败'
            })
        }
    });
};
exports.showTopicID = (req,res)=> {
    res.send('showTopicID');
};
exports.showEdit = (req,res)=> {
    res.send('showEdit');
};
exports.handleEdit = (req,res)=> {
    res.send('handleEdit');
};
exports.handleDelete = (req,res)=> {
    res.send('handleDelete');
};