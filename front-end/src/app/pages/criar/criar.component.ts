import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskStore } from '@app/services/store/task.store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '@app/shared/types/api';

@Component({
  selector: 'app-criar',
  imports: [HeaderComponent, SidebarComponent, TaskFormComponent],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css',
})
export class CriarComponent {
  protected form: FormGroup;
  protected errors: WritableSignal<ApiResponse['errors']> = signal([]);

  constructor(
    private fb: FormBuilder,
    public taskStore: TaskStore,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      status: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
      priority: ["", [Validators.required, Validators.maxLength(20)]],
      category: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      tags: [[]],
    });
  }

  protected onSubmit() {
    this.taskStore
      .create(this.form.value)
      .then(({ message }) => this.toastr.success(message) && (this.form.reset(), this.router.navigate(['/'])))
      .catch(({ error: { errors, message }}) => this.toastr.error(message) && this.errors.set(errors));
  }
}
