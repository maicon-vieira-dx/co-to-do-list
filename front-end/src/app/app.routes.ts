import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CriarComponent } from './pages/criar/criar.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "criar", component: CriarComponent },
    { path: "editar", component: CriarComponent },
    { path: "**", redirectTo: "" }
];
