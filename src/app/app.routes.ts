import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', loadComponent: () => import('./components/courses/courses.component').then(c => c.CoursesComponent) },
];
