import { Component, inject } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '@app/services/task.service';
import { TaskStore } from '@app/services/store/task.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar',
  imports: [HeaderComponent, SidebarComponent, TaskFormComponent],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css',
})
export class CriarComponent {
  protected form: FormGroup;

  constructor(private fb: FormBuilder, public taskStore: TaskStore, private router: Router) {
    this.form = this.createForm();
  };

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      priority: ['', [Validators.required, Validators.maxLength(20)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      dueDate: ['', [Validators.required, Validators.maxLength(10)]],
      tags: [[], [Validators.required]],
    });
  };

  protected onSubmit() {
    this.taskStore.create(this.form.value)
      .then(({ success }) => success && (this.form.reset(), this.router.navigate(["/"])));
  };
}
