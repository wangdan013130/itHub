const express = require('express');
const catgoryCtrl = require('../controllers/category');
const indexCtrl = require('../controllers/index');
const topicCtrl = require('../controllers/topic');
const userCtrl = require('../controllers/user');

const router = express.Router();
module.exports = router;

router
    .get('/',indexCtrl.showIndex);

router
    .get('/signin', userCtrl.showSignin)
    .post('/signin',userCtrl.handleSignin)
    .get('/signup',userCtrl.showSignup)
    .post('/signup',userCtrl.handleSignup)
    .get('/signout',userCtrl.handleSignout);

router
    .get('/topic/create', topicCtrl.showCreate)
    .post('/topic/create',topicCtrl.handleCreate)
    // 动态路由,可以传递参数
    // .get('/topic/show', topicCtrl.showTopic)
    .get('/topic/:topicID',topicCtrl.showTopic)
    .get('/topic/:topicID/edit',topicCtrl.showEdit)
    .post('/topic/:topicID/edit',topicCtrl.handleEdit)
    .get('/topic/:topicID/delete',topicCtrl.handleDelete);
