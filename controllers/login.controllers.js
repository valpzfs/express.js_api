import { connectDB } from "../Utils/SQL.js";

export const login = async(req, res) => {
    const sql = connectDB();
    const query = {
        text:"SELECT * FROM users WHERE username = $1 ", 
        values: [req.body.username],
    };
    const data = await sql.query(query);
    console.log(data.rows);
    console.log(data.rows.length);
    if(data.rows.length === 0){
        res.json({islogin: false, user:{}});
        return;
    }
    if(req.body.password === data.rows[0].password){
        res.json({islogin: true, user:data.rows});
        return;
    } else
    {
        res.json({islogin: false, user: {}});
    }
};