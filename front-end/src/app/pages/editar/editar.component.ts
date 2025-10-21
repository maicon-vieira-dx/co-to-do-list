import { Component, signal, WritableSignal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { TaskFormComponent } from '@app/components/task-form/task-form.component';
import { Task } from '@app/model/task.model';
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
  protected errors: WritableSignal<ApiResponse["errors"]> = signal([]);
  protected id = signal<Task["id"]>("");

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private taskStore: TaskStore, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.createForm();
    this.route.queryParamMap.subscribe(params => {
      const id = params?.get("id");
      id != null && id != 'null' ? this.taskStore.readById(params?.get("id")).then(({ tags = [], id, ...task}: Task) => {
        this.form.patchValue(task);
        this.id.set(id);
        const tagsArray = this.form.get('tags') as FormArray;
        tagsArray.clear();
        (tags || []).forEach(tag => tagsArray?.push(this.fb.control(tag)));
      }) : this.router.navigate(["/"])
  });
  };

  private createForm(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      status: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
      priority: ["", [Validators.required, Validators.maxLength(20)]],
      category: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      tags: this.fb.array([])
    });
  };

  protected onSubmit() {
    this.taskStore.update(this.form.value, this.id())
      .then(({ message }) => this.toastr.success(message) && (this.form.reset(), this.router.navigate(['/'])))
      .catch(({ error: { errors, message }}) => this.toastr.error(message) && this.errors.set(errors));
  };

  protected onDelete = () => {
    this.taskStore.delete(this.id())
      .then(({ message }) => this.toastr.success(message) && (this.form.reset(), this.router.navigate(['/'])))
      .catch(({ error: { errors, message }}) => this.toastr.error(message) && this.errors.set(errors));
  };
}
