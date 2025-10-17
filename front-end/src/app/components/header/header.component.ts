import { Component, computed, signal } from '@angular/core';
import { SharedMaterialModule } from '../../shared/material/shared-material.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskStore } from '@app/services/store/task.store';
import { Status } from '@app/model/item.model';

type NavLink = {
  path: string;
  label: string;
  icon: string;
}

type Stats = {pending: number ,in_progress: number ,completed: number ,cancelled: number }
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, SharedMaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected taskStats = signal<Stats>({
    [Status.PENDING]: 0,
    [Status.IN_PROGRESS]: 0,
    [Status.COMPLETED]: 0,
    [Status.CANCELLED]: 0
  });

  navLinks: NavLink[] = [
    { path: '/', label: 'Início', icon: 'house' },
    { path: '/criar', label: 'Nova Tarefa', icon: 'add' },
    { path: '/editar', label: 'Editar tarefa', icon: 'edit' }
  ];

  constructor(private router: Router, private taskStore: TaskStore) { }

  ngOnInit() {
    this.taskStats.update(stats => this.taskStore.tasks().reduce((acc, { status }) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, stats));
  }

  isActiveRoute(route: string): boolean {
    return this.router.url == route;
  }
}
