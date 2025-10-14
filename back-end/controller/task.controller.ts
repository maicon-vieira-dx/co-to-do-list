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

  store = async (req: Request, res: Response) => {
    try {
      await this.taskAction.create(req.body);
      res.status(201).json({
        success: true,
        message: "Tarefa criada com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({
        sucess: false,
        message: "Erro na criação da tarefa",
        error: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      await this.taskAction.update(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Tarefa editada com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({
        sucess: false,
        message: "Erro na edição da tarefa",
        error: error.message,
      });
    }
  };
  
  delete = async (req: Request, res: Response) => {
    try {
      await this.taskAction.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Tarefa deletada com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({
        sucess: false,
        message: "Erro ao deletar tarefa",
        error: error.message,
      });
    }
  };
}
