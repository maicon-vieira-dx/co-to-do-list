import express from "express";
import { TaskController } from "../controller/task.controller";

const router = express.Router();
const controller = new TaskController();

router.get("/", controller.index);
router.get("/:id", controller.show);

export default router;