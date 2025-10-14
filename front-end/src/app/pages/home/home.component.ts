import { Component, Signal, signal } from '@angular/core';
import { SharedMaterialModule } from '../../shared/material/shared-material.module';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { SidebarHomeComponent } from './sidebar-home/sidebar-home.component';
import { Item, Priority, Status } from '@app/model/item.model';
import { CardHomeComponent } from "./card-home/card-home.component";

@Component({
  selector: 'app-home',
  imports: [SharedMaterialModule, HeaderHomeComponent, SidebarHomeComponent, CardHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Item[]>([
    {
      id: '1',
      title: 'Implementar sistema de autenticação',
      description: 'Criar módulo de login e registro com JWT token',
      status: Status.IN_PROGRESS,
      priority: Priority.HIGH,
      createdAt: new Date('2024-01-15T10:30:00'),
      dueDate: new Date('2024-01-25T18:00:00'),
      category: 'Desenvolvimento',
      tags: ['frontend', 'backend', 'segurança'],
      isActive: true
    },
    {
      id: '2',
      title: 'Reunião de planejamento do sprint',
      description: 'Definir metas e tarefas para o próximo sprint com a equipe',
      status: Status.PENDING,
      priority: Priority.MEDIUM,
      createdAt: new Date('2024-01-18T14:00:00'),
      dueDate: new Date('2024-01-22T09:00:00'),
      category: 'Reunião',
      tags: ['planejamento', 'equipe', 'metas'],
      isActive: false
    },
    {
      id: '3',
      title: 'Corrigir bug no carrinho de compras',
      description:
        'O valor total não está atualizando quando itens são removidos',
      status: Status.CANCELLED,
      priority: Priority.URGENT,
      createdAt: new Date('2024-01-19T08:15:00'),
      dueDate: new Date('2024-01-20T12:00:00'),
      category: 'Bug Fix',
      tags: ['bug', 'crítico', 'ecommerce'],
      isActive: false
    },
  ]);

  activeTask(id: string) {
    this.tasks.update(tasks =>
      tasks.map(task => ({
        ...task,
        isActive: task.id === id
      }))
    );
  }
}