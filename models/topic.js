const db = require('./db_helper');
// 添加新文章
exports.createTopic = (topic, callback)=> {
    db.query(
        'insert into `topics` set ?',
        topic,
        (err,results)=> {
            if (err) {
                return callback(err);
            }
            if (results.affectedRows > 0) {
                callback(null,true);
            } else {
                callback(null,false);
            }
        }
    )
}

//根据 ID 查询所有文章
exports.getById= (id,callback)=> {
    db.query(
        'select * from `topics` where `id` =?',
        id,
        (err,results)=> {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                callback(null, results[0]);
            } else {
                callback(null,null);
            }
        }
    )
}

// 删除文章
exports.deleteTopic = (id, callback)=> {
    db.query(
        'delete from `topics` where `id` =?',
        id,
        (err,results)=> {
            if (err) {
                return callback(err);
            }
            if (results.affectedRows > 0) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    )
}

// 修改文章
exports.updatdTopic = (topic,callback)=> {
    db.query(
        'update `topics` set `title=`?`, content=`?, `categoryId=`?  where `id`=?',
        topic,
        (err,results)=> {
            if (err) {
                return callback(err);
            }
            if (results.affectedRows > 0) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    )
}