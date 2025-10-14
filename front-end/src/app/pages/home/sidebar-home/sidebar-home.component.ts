import { TaskService } from '@app/services/task.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';
import { Item, Status } from '@app/model/item.model';

@Component({
  selector: 'app-sidebar-home',
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './sidebar-home.component.html',
  styleUrl: './sidebar-home.component.css'
})
export class SidebarHomeComponent {
  @Input() tasks: Signal<Item[]> = signal([]);
  @Output() taskActive = new EventEmitter<string>();

  showFiller = false;

  constructor (private taskservice: TaskService){}

  activeTask(id: string) {
    this.taskActive.emit(id);
  }

  getIconStatus(status: Status): string {
    return this.taskservice.getStatusIcon(status);
  }
}
