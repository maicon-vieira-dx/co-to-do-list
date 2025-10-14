import { Injectable } from '@angular/core';
import { Priority, Status } from '@app/model/item.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getPriorityColor(priority: Priority): string {
    return new Map<Priority, string>([
      [Priority.LOW, '#4caf50'],
      [Priority.MEDIUM, '#ff9800'],
      [Priority.HIGH, '#f44336'],
      [Priority.URGENT, '#d32f2f'],
    ]).get(priority) || "#757575";
  }

  getStatusIcon(status: Status): string {
    return new Map<Status, string>([
      [Status.PENDING, "schedule"],
      [Status.IN_PROGRESS, "play_circle_outline"],
      [Status.COMPLETED, "check_circle_outline"],
      [Status.CANCELLED, "highlight_off"]
    ]).get(status) || "help_outline";
  }
}
