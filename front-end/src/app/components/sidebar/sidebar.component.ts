import { TaskService } from '@app/services/task.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Status } from '@app/model/item.model';
import { SharedMaterialModule } from '@app/shared/material/shared-material.module';
import { TaskStore } from '@app/services/store/task.store';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected showFiller = false;

  constructor (private taskservice: TaskService, public taskStore: TaskStore){}

  getIconStatus(status: Status): string {
    return this.taskservice.getStatusIcon(status);
  }
}
