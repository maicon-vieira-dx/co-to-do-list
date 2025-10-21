import { Component, computed, Signal, signal } from '@angular/core';
import { SharedMaterialModule } from '../../shared/material/shared-material.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskStore } from '@app/services/store/task.store';
import { Status } from '@app/model/task.model';

type NavLink = {
  path: string;
  label: string;
  icon: string;
  queryParams?: { [key: string]: any }
}

type Stats = {pending: number ,in_progress: number ,completed: number ,cancelled: number }
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, SharedMaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected navLinks: Signal<NavLink[]> = computed(() => [
    { path: '/', label: 'Início', icon: 'house' },
    { path: '/criar', label: 'Nova Tarefa', icon: 'add' },
    { path: `/editar`, queryParams: { id: this.taskStore.taskSelected()?.id }, label: 'Editar tarefa', icon: 'edit' }
  ]);

  constructor(private router: Router, private taskStore: TaskStore) { }

  isActiveRoute(route: string): boolean {
    return this.router.url == route;
  }
}
