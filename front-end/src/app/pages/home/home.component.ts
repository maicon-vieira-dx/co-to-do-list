import { Component, signal } from '@angular/core';
import { SharedMaterialModule } from '../../shared/material/shared-material.module';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { SidebarHomeComponent } from './sidebar-home/sidebar-home.component';
import { Item } from '@app/model/item.model';
import { CardHomeComponent } from "./card-home/card-home.component";
import { TaskService } from '@app/services/task.service';

@Component({
  selector: 'app-home',
  imports: [SharedMaterialModule, HeaderHomeComponent, SidebarHomeComponent, CardHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Item[]>([]);

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (res) => this.tasks.set(res),
      error: (err) => console.error('Erro ao carregar tarefas:', err)
    })
  };

  activeTask(id: string) {
    this.tasks.update(tasks =>
      tasks.map(task => ({
        ...task,
        isActive: task.id === id
      }))
    );
  };
}