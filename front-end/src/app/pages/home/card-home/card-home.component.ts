import { CommonModule } from '@angular/common';
import { Component, Input, Signal, computed, Output, EventEmitter, signal } from '@angular/core';
import { Item, Priority, Status } from '@app/model/item.model';
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
  @Input() tasks: Signal<Item[]> = signal([]);
  @Output() taskActive = new EventEmitter<string>();

  constructor (private taskService: TaskService) {}

  private searchSubject = new Subject<string>();

  searchTerm = signal<string>('');

  filteredTasks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.tasks();
    return this.tasks().filter(task => task.title.toLowerCase().includes(term));
  });

  taskSelected = computed(() => {
    const tasks = this.tasks();
    return tasks.find((task) => task.isActive === true);
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

  activeTask(id: string) {
    this.taskActive.emit(id);
  }

  getPriorityColor(priority: Priority = Priority.LOW): string {
    return this.taskService.getPriorityColor(priority);
  }

  getStatusIcon(status: Status = Status.CANCELLED): string {
    return this.taskService.getStatusIcon(status);
  }
}
