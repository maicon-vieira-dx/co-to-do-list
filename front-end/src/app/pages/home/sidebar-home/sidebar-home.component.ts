import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';
import { Item, Status } from '@app/model/item.model';

@Component({
  selector: 'app-sidebar-home',
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './sidebar-home.component.html',
  styleUrl: './sidebar-home.component.css'
})
export class SidebarHomeComponent {
  @Input() tasks: Item[] = [];

  showFiller = false;

  getIconStatus(status: string): string {
    switch (status) {
      case Status.PENDING:
        return 'schedule';
      case Status.IN_PROGRESS:
        return 'play_circle_outline';
      case Status.COMPLETED:
        return 'check_circle_outline';
      case Status.CANCELLED:
        return 'highlight_off';
      default:
        return 'help_outline';
    }
  }
}
