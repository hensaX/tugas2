const db = require('./../configs/dbconfig');

db.serialize(function () {

    let sql = `CREATE TABLE IF NOT EXISTS books(
        id_book INTEGER PRIMARY KEY AUTOINCREMENT,
        title varchar(254) not null,
        pub_year varchar(4) default '',
        price numeric(20,4) not null,
        notes varchar(1000) default '',
        id_author integer,
        id_category integer,
        created text default (datetime('now','localtime')),
        updated text default (datetime('now','localtime'))
    );`;
    db.run(sql, (err) => {
        if (err) throw err;
        console.log("Table created");
    });

});

db.close();