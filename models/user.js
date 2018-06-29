const db = require('../controllers/db_helper');

exports.selectAll = (email, callback)=> {
    db.query(
        'select * from `users`',
        (err, results)=> {
            if (err) {
                callback(err);
            } 
            callback(null, results); 
        }
    )
};



exports.getByEamil= (email, callback)=> {
    db.query(
        'select  * from `users` where `email`=?',
        email,
        (err,results)=> {
            if (err) {
                callback(err);
            }
            callback(null,results);
        }
    )
};

exports.getByNickname = (nickname, callback)=> {
    db.query(
        'select * from where `nickname` = ?',
        nickname,
        (err, results)=> {
            if (err) {
                callback(err);
            }
            callback(null,results);
        }
    )
};

// exports.createUsers = (user,callback)=> {
//     db.query()
// }