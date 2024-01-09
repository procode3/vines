import { Router } from "express";
import {getAllUsers, getUser, updateUser, deleteUser} from "../controllers/users.controller";

const router = Router();

// get all users
router.get("/users", getAllUsers);

// get user by id
router.get("/users/:id", getUser);

// update user by id
router.put("/users/:id", updateUser);

// delete user by id
router.delete("/users/:id", deleteUser);

module.exports = router;