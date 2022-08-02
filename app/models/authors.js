const db = require('./../configs/dbconfig');

db.serialize(function () {

    let sql = `CREATE TABLE IF NOT EXISTS authors(
        id_author INTEGER PRIMARY KEY AUTOINCREMENT,
        author_name varchar(254) not null,
        penname varchar(254) default '',
        gender varchar(32) default '',
        created text default (datetime('now','localtime')),
        updated text default (datetime('now','localtime'))
    );`;
    db.run(sql, (err) => {
        if (err) throw err;
        console.log("Table created");
    });

});

db.close();