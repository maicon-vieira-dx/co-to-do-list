import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item, Priority, Status } from "@app/model/item.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private url = "http://localhost:3000/api/tasks";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url);
  }

  getPriorityColor(priority: Priority): string {
    return new Map<Priority, string>([
      [Priority.LOW, "#10b981"],
      [Priority.MEDIUM, "#f59e0b"],
      [Priority.HIGH, "#f97316"],
      [Priority.URGENT, "#dc2626"],
    ]).get(priority) || "#9ca3af";
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
