import { JSONFile } from "lowdb/node"
import { Task } from "../models/task.model"
import { Low } from "lowdb";

export class TaskRepository {

    private db: Low<{ tasks: Task[] }>;
    constructor () {
        const adapter = new JSONFile<{ tasks: Task[] }>("db.json");
        this.db = new Low(adapter, { tasks: [] });
    };

    get = async (): Promise<{ tasks: Task[] }> => {
        await this.db.read();
        return this.db.data;
    };

    create = async (task: Task) => {
        await this.db.read();
        this.db.data.tasks.push(task);
        await this.db.write();
    };

    update = async (index: number, task: Task) => {
        await this.db.read();
        this.db.data.tasks[index] = { ...this.db.data.tasks[index], ...task };
        await this.db.write();
    };
}