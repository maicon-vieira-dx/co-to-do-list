import express from "express";
import { TaskController } from "../controller/task.controller";
import { TaskSchema } from "../schemas/task.schema";
import { validate } from "../middleware/validate.middleware";

const router = express.Router();
const controller = new TaskController();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", validate(TaskSchema), controller.store);
router.put("/:id", validate(TaskSchema),controller.update);
router.delete("/:id", controller.delete);

export default router;