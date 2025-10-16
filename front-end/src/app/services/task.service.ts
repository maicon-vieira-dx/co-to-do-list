import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item, Priority, Status } from "@app/model/item.model";
import { ApiResponse } from "@app/shared/types/api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private url = "http://localhost:3000/api/tasks";

  constructor(private http: HttpClient) { }

  get(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url);
  };

  getById(id: string): Observable<Item> {
    return this.http.get<Item>(this.url + "/" + id);
  };

  create(task: Item): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url, task);
  };

  update(task: Item): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url, task);
  };

  delete(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.url + "/" + id);
  };

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
