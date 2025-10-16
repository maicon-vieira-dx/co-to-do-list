import { CommonModule } from '@angular/common';
import { Component, computed, Input, Signal, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { PRIORITY_LIST, STATUS_LIST } from '@app/shared/constants/task.constants';
import { SharedMaterialModule } from '@app/shared/material/shared-material.module';
import {COMMA, ENTER } from '@angular/cdk/keycodes';
import { errorTailorImports } from '@ngneat/error-tailor';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, SharedMaterialModule, ReactiveFormsModule, errorTailorImports],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input() title: string = "";
  @Input() form!: FormGroup;
  @Input() onSubmit!: () => void;
  @Input() tags = signal<{ id: number; name: string }[]>([]);

  protected readonly value = signal('');
  protected readonly statusList = STATUS_LIST;
  protected readonly priorityList = PRIORITY_LIST;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  };

  protected addTag(event: MatChipInputEvent) {
    const tag = (event.value || '').trim();
    if(this.tags().length < 3 && tag) {
      this.tags.update(tags => [...tags, { id: this.tags().length + 1, name: tag }]);
    };
    event.chipInput!.clear();
  };

  protected removeTag(id: number) {
    this.tags.update(tags => tags.filter(e => e.id != id));
  };

  protected formSubmit() {
    if(this.form.valid) {
      this.form.get('tags')?.setValue(this.tags().map(({ name }) => name));
      this.onSubmit();
    }
  }
}
