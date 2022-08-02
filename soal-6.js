const db = require('./app/configs/dbconfig');


// fungsi cek exists
const getBookByCategory = async (category) => {
    let sql = `select 
    b.category_name,c.author_name,c.penname,c.gender,a.*
    from books a 
    left join category b on a.id_category=b.id_category
    left join authors c on a.id_author=c.id_author 
    where lower(b.category_name) like $category`
    const res = await db.query(sql, { $category: `%${category.toLowerCase()}%` });
    console.log(res.rows)
}

getBookByCategory('komputer')