import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Item } from '@app/model/item.model';
import { TaskService } from '../task.service';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private taskService = inject(TaskService);
  private _tasks = signal<Item[]>([]);
  private _loaded = signal(false);

  tasks = computed(() => this._tasks());
  loaded = computed(() => this._tasks());
  taskSelected = computed(() => this._tasks().find((task) => task.isActive === true));

  constructor() {
    effect(() => {
      if (!this._loaded()) {
        this.read();
      }
    });
  }

  read() {
    if (this._loaded()) return;
    this.taskService.get().subscribe({
      next: (res) => {
        this._tasks.set(res);
        this._loaded.set(true);
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
      },
    });
  };

  create(task: Item) {
    this.taskService.create(task).subscribe({
      next: (res) => this._tasks.update((tasks) => [...tasks, res]),
    });
  };

  update(task: Item) {
    this.taskService.update(task).subscribe({
      next: (res) =>
        this._tasks.update((tasks) =>
          tasks.map((t) => (t.id === res.id ? res : t))
        ),
    });
  };

  delete(id: string) {
    this.taskService.delete(id).subscribe({
      next: () =>
        this._tasks.update((tasks) => tasks.filter((t) => t.id !== id)),
    });
  };

  activate(id: string) {
    this._tasks.update(tasks =>
      tasks.map(task => ({ ...task, isActive: task.id === id }))
    );
  };
}
