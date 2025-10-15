import { Component } from '@angular/core';
import { HeaderComponent } from "@app/components/header/header.component";
import { SidebarComponent } from "@app/components/sidebar/sidebar.component";
import { TaskFormComponent } from "../../components/task-form/task-form";

@Component({
  selector: 'app-criar',
  imports: [HeaderComponent, SidebarComponent, TaskFormComponent],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css'
})
export class CriarComponent {

}
