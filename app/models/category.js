const db = require('./../configs/dbconfig');

db.serialize(function () {

    let sql = `CREATE TABLE IF NOT EXISTS category(
        id_category INTEGER PRIMARY KEY AUTOINCREMENT,
        name varchar(254) not null,
        created text default (datetime('now','localtime')),
        updated text default (datetime('now','localtime'))
    );`;
    db.run(sql, (err) => {
        if (err) throw err;
        console.log("Table created");
    });

});

db.close();