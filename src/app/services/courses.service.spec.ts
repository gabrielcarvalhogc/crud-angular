import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Course } from '../components/courses/model/course';
import { of } from 'rxjs';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpClientMock: { get: jest.Mock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    httpClientMock = {
      get: jest.fn()
    };

    service = new CoursesService(httpClientMock as unknown as HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with "courses.json" and return courses list', (done) => {
    const cursosMock: Course[] = [
      { _id: 1, name: 'Angular Básico', category: 'Frontend' } as Course,
      { _id: 2, name: 'Spring Boot Avançado', category: 'Backend' } as Course
    ];

    httpClientMock.get.mockReturnValue(of(cursosMock));

    service.getList().subscribe((resultado) => {
      expect(resultado).toEqual(cursosMock);
      done();
    });

    expect(httpClientMock.get).toHaveBeenCalledWith('courses.json');
  });
});
