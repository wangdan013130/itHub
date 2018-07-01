// 1 显示添加话题的页面
const categoryModel = require('../models/category');
const topicModel = require('../models/topic');
exports.showCreate = (req,res)=> {
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
    req.body.userId = req.session.user.id;
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


exports.showTopic = (req,res)=> {
     // 获取url传递的id，动态路由
    const topicId = req.params.topicID;
    
    if (isNaN(topicId)) {
        return res.send('参数');
    } 
    topicModel.getById(topicId,(err,topic)=> {
        if (err) {
            return res.send('服务器内部出错');
        }
        if (topic) {
            res.render('topic/show.html', {
                topic,
                user : req.session.user
            })
        } else {
            res.send('您查询的话题不在列表项');
        }
    })
};

exports.showEdit = (req,res)=> {
// 先获取所有一级分类模板
// 再获取当前 ID
// 根据 当前 id 将修改后值传入

    categoryModel.getAll((err,categories)=> {
        const id = req.params.topicID;
        if (isNaN(id)) {
            return res.send('参数错误');
        }
        topicModel.getById(id,(err,topic)=> {
            if (err) {
                return res.send('服务器内部出错');
            }
            if (topic) {
                res.render('topic/edit.html', {
                    topic
                })
            }else {
                res.redner('没有查询到数据');
            }
        });
    });
};
exports.handleEdit = (req,res)=> {
    res.send('handleEdit');
};
exports.handleDelete = (req,res)=> {
   //res.send('handleDelete');
   const id = req.params.topicID;
  // 2 删除数据
  topicModel.delete(id, (err, isOK) => {
    if (err) {
      return res.send('服务器内部错误');
    }
    if (isOK) {
      res.redirect('/');
    } else {
      // 传统的请求响应方式，不好
      // 错误的时候，也要重新渲染整个页面
      res.send('删除失败');
    }
  });
};