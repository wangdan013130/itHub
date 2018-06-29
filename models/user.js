const db = require('./db_helper');

//插入新用户
exports.createUser = (user,callback)=> {
    db.query(
        'insert into `users` set ?',
        user,
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
    );
};
// 根据 email 查询用户
exports.getByEmail= (email, callback)=> {
    db.query(
        'select  * from `users` where `email`=?',
        email,
        (err,results)=> {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                callback(null,results[0]);
            } else {
                callback(null,null);
            }
            
        }
    );
};

// 根据 nickname 查询用户
exports.getByNickname = (nickname, callback)=> {
    db.query(
        'select * from `users` where `nickname` = ?',
        nickname,
        (err, results)=> {
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
};



