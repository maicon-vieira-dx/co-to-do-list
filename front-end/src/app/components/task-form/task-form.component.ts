import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  PRIORITY_LIST,
  STATUS_LIST,
} from '@app/shared/constants/task.constants';
import { SharedMaterialModule } from '@app/shared/material/shared-material.module';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ApiResponse } from '@app/shared/types/api';

@Component({
  selector: 'app-task-form',
  imports: [ CommonModule, SharedMaterialModule, ReactiveFormsModule, errorTailorImports ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  @Input() title: string = '';
  @Input() form!: FormGroup;
  @Input() canDelete: boolean = false;
  @Input() errors: ApiResponse['errors'] = [];
  @Input() onSubmit!: () => void;
  @Input() onDelete?: () => void;

  protected readonly value = signal('');
  protected readonly statusList = STATUS_LIST;
  protected readonly priorityList = PRIORITY_LIST;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private fb: FormBuilder) {}

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected addTag(event: MatChipInputEvent) {
    const tag = (event.value || '').trim();
    if (tag && this.tags.length < 3) {
      this.tags.push(this.fb.control(tag));
    }
    event.chipInput!.clear();
  }

  protected clean() {
    this.form.reset();
  }

  protected removeTag(index: number) {
    this.tags.removeAt(index);
  }

  protected getError(path: string): string | undefined {
    return this.errors?.find((e) => e.path == path)?.message;
  }

  protected formSubmit() {
    this.form.valid && this.onSubmit();
  }
}
