import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Priority, Status } from '@app/model/item.model';
import { TaskStore } from '@app/services/store/task.store';
import { TaskService } from '@app/services/task.service';
import { SharedMaterialModule } from '@app/shared/material/shared-material.module';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-card-home',
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css',
})
export class CardHomeComponent {
  private searchSubject = new Subject<string>();
  protected readonly searchTerm = signal<string>('');

  constructor (private taskService: TaskService, public taskStore: TaskStore) {}

  filteredTasks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.taskStore.tasks();
    return this.taskStore.tasks().filter(task => task.title.toLowerCase().includes(term));
  });

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.searchTerm.set(term));
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  getPriorityColor(priority: Priority = Priority.LOW): string {
    return this.taskService.getPriorityColor(priority);
  }

  getStatusIcon(status: Status = Status.CANCELLED): string {
    return this.taskService.getStatusIcon(status);
  }
}
