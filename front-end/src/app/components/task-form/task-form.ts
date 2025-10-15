import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { PRIORITY_LIST, STATUS_LIST } from '@app/shared/constants/task.constants';
import { SharedMaterialModule } from '@app/shared/material/shared-material.module';
import {COMMA, ENTER } from '@angular/cdk/keycodes';
import { errorTailorImports } from '@ngneat/error-tailor';
import { TaskService } from '@app/services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, SharedMaterialModule, ReactiveFormsModule, errorTailorImports],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input() title: string = "";

  private taskService = inject(TaskService);
  protected readonly value = signal('');
  protected readonly statusList = STATUS_LIST;
  protected readonly priorityList = PRIORITY_LIST;
  protected form: FormGroup;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<{ id: number, name: string }[]>([]);

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected add(event: MatChipInputEvent) {
    const tag = (event.value || '').trim();
    if(this.tags().length < 3 && tag) {
      this.tags.update(tags => [...tags, { id: this.tags().length + 1, name: tag }]);
    }
    event.chipInput!.clear();
  }

  protected remove(id: number) {
    this.tags.update(tags => tags.filter(e => e.id != id));
  }

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
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
    this.form.get("tags")?.setValue(this.tags().map(({ name }) => name));
    this.form.valid && this.taskService.create(this.form.value)
    .subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error('Erro ao criar tarefa:', err)
    });
  }

}
