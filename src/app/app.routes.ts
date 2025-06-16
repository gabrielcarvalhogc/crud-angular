import { Routes } from '@angular/router';
import { courseResolver } from './guards/course.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    loadComponent: () => import('./components/courses/courses.component').then(c => c.CoursesComponent)
  },
  {
    path: 'courses/new',
    loadComponent: () => import('./components/course-form/course-form.component').then(c => c.CourseFormComponent),
    resolve: { course: courseResolver }
  },
  {
    path: 'courses/edit/:id',
    loadComponent: () => import('./components/course-form/course-form.component').then(c => c.CourseFormComponent),
    resolve: { course: courseResolver}
  },
];
