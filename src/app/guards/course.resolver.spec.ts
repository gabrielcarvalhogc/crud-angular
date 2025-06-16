import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { courseResolver } from './course.resolver';
import { Observable } from 'rxjs';
import { Course } from '../components/courses/model/course';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('courseResolver', () => {
  const executeResolver: ResolveFn<Observable<Course>> = (...resolverParameters) => TestBed.runInInjectionContext(() => courseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
