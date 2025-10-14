import { Component, signal } from '@angular/core';
import { SharedMaterialModule } from '../../shared/material/shared-material.module';
import { HeaderComponent } from '../../components/header/header.component';
import { Item } from '@app/model/item.model';
import { CardHomeComponent } from "./card-home/card-home.component";
import { TaskService } from '@app/services/task.service';
import { SidebarComponent } from '@app/components/sidebar-home/sidebar.component';

@Component({
  selector: 'app-home',
  imports: [SharedMaterialModule, HeaderComponent, SidebarComponent, CardHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Item[]>([]);

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.get().subscribe({
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
