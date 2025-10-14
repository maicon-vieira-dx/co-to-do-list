import { TaskAction } from "../action/taks.action";
import { Request, Response } from "express";

export class TaskController {
  private taskAction;
  constructor() {
    this.taskAction = new TaskAction();
  }

  index = async (req: Request, res: Response) => {
    try {
      return res.json(await this.taskAction.get());
    } catch (error: any) {
      return res.status(500).json({
        sucess: false,
        message: "Erro ao listar tarefas",
        error: error.message,
      });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      return res.json(await this.taskAction.getById(req.params.id));
    } catch (error: any) {
      return res.status(500).json({
        sucess: false,
        message: "Erro ao listar tarefa",
        error: error.message,
      });
    }
  };
}
