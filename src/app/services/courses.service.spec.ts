import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Course } from '../components/courses/model/course';
import { of } from 'rxjs';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpClientMock: { get: jest.Mock, post: jest.Mock };
  //const API_URL = 'courses.json';
  const API_URL = 'http://localhost:8080/api/courses';
  const cursosMock: Course[] = [
    { _id: 1, name: 'Angular Básico', category: 'Frontend' } as Course,
    { _id: 2, name: 'Spring Boot Avançado', category: 'Backend' } as Course
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    httpClientMock = {
      get: jest.fn(),
      post: jest.fn()
    };

    service = new CoursesService(httpClientMock as unknown as HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with rigth URL', () => {
    service.getList();

    expect(httpClientMock.get).toHaveBeenCalledWith(API_URL);
  });

  it('should return courses list ', (done) => {
    httpClientMock.get.mockReturnValue(of(cursosMock));

    service.getList().subscribe((resultado) => {
      expect(resultado).toEqual(cursosMock);
      done();
    });
  })

  it('should call the right POST Url', () => {
    service.save(cursosMock[0]);

    expect(httpClientMock.post).toHaveBeenCalledWith(API_URL, cursosMock[0]);
  });
});
