import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';

export const courseResolver: ResolveFn<Observable<Course>> = (route, state, service: CoursesService = inject(CoursesService)) => {

  if(route.params['id']) {
    return service.loadById(route.params['id'])
  }
  return of({_id: '', name: '', category: '', lessons: []});
};
