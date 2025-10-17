import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Task } from '@app/model/task.model';
import { TaskService } from '../task.service';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '@app/shared/types/api';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private taskService = inject(TaskService);
  private _tasks = signal<Task[]>([]);
  private _loaded = signal(false);

  tasks = computed(() => this._tasks());
  loaded = computed(() => this._loaded());
  taskSelected = computed(() =>
    this._tasks().find((task) => task.isActive === true)
  );

  constructor() {
    effect(() => {
      if (!this._loaded()) {
        this.read();
      }
    });
  }

  read(force: boolean = false) {
    if (this._loaded() && !force) return;
    this.taskService.get().subscribe({
      next: (res) => {
        this._tasks.set(res);
        this._loaded.set(true);
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
      },
    });
  }

  async create(task: Task): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(this.taskService.create(task));
      this.read(true);
      return response;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  }

  async update(task: Task, id: string | undefined): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(this.taskService.update(task, id));
      this.read(true);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  }

  async delete(id: string | undefined): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(this.taskService.delete(id));
      this.read(true);
      return response;
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  }

  activate(id: string) {
    this._tasks.update((tasks) =>
      tasks.map((task) => ({ ...task, isActive: task.id === id }))
    );
  }
}
