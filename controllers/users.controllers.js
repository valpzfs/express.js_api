import { connectDB } from "../Utils/SQL.js";

export const getUsers = async(req, res) => {
    const sql = connectDB();
    const data = await sql.query("SELECT * FROM users");
    console.log(data.rows);
    res.json(data.rows);
};

export const getUser = async(req, res) => {
    const sql = connectDB();
    const query = {
        text:"SELECT * FROM users WHERE user_id = $1", 
        values: [req.params.user_id],
    };
    const data = await sql.query(query);
    console.log(data.rows);
    res.json(data.rows);
};

export const postUser = async(req, res) => {
    const {user_id, username, first_name, last_name, birthdate, password, email} = req.body;
    const sql = connectDB();
    const query = {
        text:"INSERT into users(user_id, username, first_name, last_name, birthdate, password, email) values ($1 , $2, $3, $4, $5, $6, $7)", 
        values: [user_id, username, first_name, last_name, birthdate, password, email],
    };
    const data = await sql.query(query);
    res.json(data.rows);
};

export const putUser = async(req, res) => {
    const {username, first_name, last_name, birthdate, password, email} = req.body;
    const sql = connectDB();
    const query = {
        text:"UPDATE users SET  username = $1, first_name= $2, last_name= $3, birthdate = $4, password = $5, email= $6 WHERE user_id = $7", 
        values: [username, first_name, last_name, birthdate, password, email, req.params.user_id],
    };
    const data = await sql.query(query);
    res.json(data.rows);
};

export const deleteUser = async(req, res) => {
    try{
        const {user_id} = req.body;
        const sql = connectDB();
        const query = {
        text:"DELETE FROM users WHERE user_id = $1", 
        values: [req.params.user_id],
        };
        await sql.query(query);
        res.status(200).json({msg:"ya se borro"});
    }catch (error){
        res.status(500).json({msg: error.msg});
    }
};