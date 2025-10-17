import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { TaskFormComponent } from '@app/components/task-form/task-form.component';
import { TaskStore } from '@app/services/store/task.store';
import { ApiResponse } from '@app/shared/types/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  imports: [HeaderComponent, SidebarComponent, TaskFormComponent],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class EditarComponent {
  protected form!: FormGroup;
  protected tags = signal<{ id: number; name: string }[]>([]);
  protected errors: WritableSignal<ApiResponse["errors"]> = signal([]);

  constructor(private fb: FormBuilder, public taskStore: TaskStore, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.tags.set(this.taskStore.taskSelected()?.tags.map((name, id) => ({ name, id })) || []);
    this.form = this.createForm();
  };

  private createForm(): FormGroup {
    return this.fb.group({
      title: [this.taskStore.taskSelected()?.title, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      status: [this.taskStore.taskSelected()?.status, [Validators.required]],
      description: [this.taskStore.taskSelected()?.description, [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
      priority: [this.taskStore.taskSelected()?.priority, [Validators.required, Validators.maxLength(20)]],
      category: [this.taskStore.taskSelected()?.category, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      tags: [[]]
    });
  };

  protected onSubmit() {
    this.taskStore.update(this.form.value, this.taskStore.taskSelected()?.id)
      .then(({ message }) => this.toastr.success(message) && (this.form.reset(), this.router.navigate(['/'])))
      .catch(({ error: { errors, message }}) => this.toastr.error(message) && this.errors.set(errors));
  };

  protected onDelete = () => {
    this.taskStore.delete(this.taskStore.taskSelected()?.id)
      .then(({ message }) => this.toastr.success(message) && (this.form.reset(), this.router.navigate(['/'])))
      .catch(({ error: { errors, message }}) => this.toastr.error(message) && this.errors.set(errors));
  };
}
