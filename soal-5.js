const db = require('./app/configs/dbconfig');


// fungsi cek exists
const selectSql = async (author_name) => {
    let sql = `select 
    b.category_name,c.author_name,c.penname,c.gender,a.*
    from books a 
    left join category b on a.id_category=b.id_category
    left join authors c on a.id_author=c.id_author 
    where lower(c.author_name) like $author_name `
    const res = await db.query(sql, { $author_name: `%${author_name.toLowerCase()}%` });
    console.log(res.rows)
}

selectSql('Eka')