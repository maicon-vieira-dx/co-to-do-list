import { Component } from '@angular/core';
import { MatHint } from '@angular/material/form-field';
import { DefaultControlErrorComponent, errorTailorImports } from '@ngneat/error-tailor';

@Component({
  selector: 'app-material-error',
  imports: [errorTailorImports, MatHint],
  template: `
    <mat-hint align="start" class="text-red-500 font-medium">
      {{ errorText }}
    </mat-hint>
  `,
  styles: [`
    :host {
      display: block;
      line-height: 1.2;
    }
  `]
})
export class MaterialErrorComponent extends DefaultControlErrorComponent {}
