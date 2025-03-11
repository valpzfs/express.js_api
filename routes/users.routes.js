import {Router} from "express";
import {getUsers, getUser, postUser, putUser, deleteUser} from "../controllers/users.controllers.js"

const router = Router();

router.get("/users/", getUsers);
router.get("/users/:user_id", getUser);
router.post("/users/", postUser);
router.put("/users/:user_id", putUser);
router.delete("/users/:user_id", deleteUser);


export default router;