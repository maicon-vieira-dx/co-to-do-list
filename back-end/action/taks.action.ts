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

    create = async(req: Task) => {
        const task = { ...req, id: randomUUID(), createdAt: new Date().toISOString() }
        await this.taskRepository.create(task);
    };

    update = async(id: string, task: Task) => {
        const { tasks } = await this.taskRepository.get();
        const index = tasks.findIndex(e => e.id == id);
        index != -1 && await this.taskRepository.update(index, task);
    };

    delete = async(id: string) => {
        await this.taskRepository.delete(id);
    };
}