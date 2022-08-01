const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "./../db/mydb.db";

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    //console.log("Koneksi ke database berhasil!");

    // tambahan supaya bisa async
    db.query = function (sql, params) {
        if (!Array.isArray(params)) throw new Error("params is not an array!");
        var that = this;
        return new Promise(function (resolve, reject) {
            that.all(sql, params, function (error, rows) {
                if (error)
                    reject(error);
                else
                    resolve({ rows: rows, rowCount: rows.length });
            });
        });
    };

});

module.exports = db;