import express from "express"
import { addTask, deleteTask, getTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/addTask", addTask)
router.get("/getTasks", getTask);
router.delete('/:id', deleteTask); 

export default router;