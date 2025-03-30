import "dotenv/config";
import express, { json } from 'express';
import indexRoutes from './routes/index.routes.js';
import usersRoutes from './routes/users.routes.js';
import loginRoutes from './routes/login.routes.js';
import {connectDB}  from "./Utils/SQL.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = 5000;

//console.log(process.env.HOST)
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(loginRoutes);
app.use(usersRoutes);

app.listen(port, console.log("http://localhost:"+port));