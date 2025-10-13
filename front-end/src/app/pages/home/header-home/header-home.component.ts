import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavLink {
  path: string;
  label: string;
  icon: string;
}
@Component({
  selector: 'app-header-home',
  imports: [CommonModule, RouterLink, SharedMaterialModule],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

  pendingTasks = 5;
  completedTasks = 12;

  navLinks: NavLink[] = [
    { path: '/', label: 'Início', icon: 'store' },
    { path: '/criar', label: 'Nova Tarefa', icon: 'store' },
    { path: '/editar', label: 'Editar tarefa', icon: 'info' }
  ];

  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url == route;
  }
}
