import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule
  ]
})

export class SharedMaterialModule {}
