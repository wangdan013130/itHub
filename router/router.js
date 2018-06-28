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
    .post('/signout',userCtrl.handleSignout);

router
    .get('/topic/create', topicCtrl.showTopic)
    .post('/topic/create',topicCtrl.handleCreate)
    .get('/topic/:topicID',topicCtrl.showTopicID)
    .get('/topic/:topicID/edit',topicCtrl.showEdit)
    .post('/topic/:topicID/edit',topicCtrl.handleEdit)
    .post('/topic/:topicID/delete',topicCtrl.handleDelete);
