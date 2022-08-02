const db = require('./../configs/dbconfig');

db.serialize(function () {

    let sql = `CREATE TABLE IF NOT EXISTS user(
        userid varchar(32) primary key,
        password varchar(1024) not null,
        username varchar(256) default '',
        created text default (datetime('now','localtime'))
    );`;
    db.run(sql, (err) => {
        if (err) throw err;
        console.log("Table created");
    });

});

db.close();