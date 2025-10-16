import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../shared/material/shared-material.module';
import { HeaderComponent } from '../../components/header/header.component';
import { CardHomeComponent } from "./card-home/card-home.component";
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { TaskStore } from '@app/services/store/task.store';

@Component({
  selector: 'app-home',
  imports: [SharedMaterialModule, HeaderComponent, SidebarComponent, CardHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public taskStore: TaskStore) { }
}
