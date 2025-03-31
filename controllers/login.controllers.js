import { connectDB } from "../Utils/SQL.js";
import {hashPassword} from "../Utils/hash.js";

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
    const salt = data.rows[0].password.substring(0, process.env.SALT);
    const hash = hashPassword(req.body.password, salt);
    const saltedhash = salt + hash;
    if(saltedhash === data.rows[0].password){
        res.json({islogin: true, user:data.rows[0]});
        return;
    } else
    {
        res.json({islogin: false, user: {}});
    }
};