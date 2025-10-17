import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task, Priority, Status } from "@app/model/task.model";
import { ApiResponse } from "@app/shared/types/api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private url = "http://localhost:3000/api/tasks";

  constructor(private http: HttpClient) { }

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  };

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(this.url + "/" + id);
  };

  create(task: Task): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url, task);
  };

  update(task: Task, id: string | undefined): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.url + "/" + id, task);
  };

  delete(id: string | undefined): Observable<ApiResponse> {
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
