import { Router } from "express";
import {getAllUsers, getUser, updateUser} from "../controllers/users.controller";

const router = Router();

// get all users
router.get("/users", getAllUsers);

// get user by id
router.get("/users/:id", getUser);

// update user by id
router.put("/users/:id", updateUser);

module.exports = router;