import { randomUUID } from "crypto";
import { Task } from "../models/task.model";
import { TaskRepository } from "../repository/task.repository";

export class TaskAction {

    private taskRepository;
    constructor() {
        this.taskRepository = new TaskRepository();
    };

    get = async() => {
        const { tasks } = await this.taskRepository.get();
        return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((e, i) => ({ ...e, isActive: i == 0 }));
    };

    getById = async(id: string) => {
        const { tasks } = await this.taskRepository.get();
        return tasks.find(e => e.id == id);
    };
}