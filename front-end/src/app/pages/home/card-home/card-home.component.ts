import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor (private taskService: TaskService, public taskStore: TaskStore, public router: Router) {}

  protected latestTasks = computed(() => this.taskStore.tasks().slice(0, 8));

  getPriorityColor(priority: Priority = Priority.LOW): string {
    return this.taskService.getPriorityColor(priority);
  }

  getStatusIcon(status: Status = Status.CANCELLED): string {
    return this.taskService.getStatusIcon(status);
  }
}
