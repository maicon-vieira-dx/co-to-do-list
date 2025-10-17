import { TaskService } from '@app/services/task.service';
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Status } from '@app/model/item.model';
import { SharedMaterialModule } from '@app/shared/material/shared-material.module';
import { TaskStore } from '@app/services/store/task.store';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected showFiller = false;
  private searchSubject = new Subject<string>();
  protected readonly searchTerm = signal<string>('');
  protected filteredTasks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.taskStore.tasks();
    return this.taskStore.tasks().filter(task => task.title.toLowerCase().includes(term));
  });

  constructor (private taskservice: TaskService, public taskStore: TaskStore){}

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.searchTerm.set(term));
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }


  getIconStatus(status: Status): string {
    return this.taskservice.getStatusIcon(status);
  }
}
