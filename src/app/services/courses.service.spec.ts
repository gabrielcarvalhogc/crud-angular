import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Course } from '../components/courses/model/course';
import { of } from 'rxjs';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpClientMock: { get: jest.Mock, post: jest.Mock, put: jest.Mock, delete: jest.Mock };
  const API_URL = 'http://localhost:8080/api/courses';
  const cursosMock: Course[] = [
    { _id: '1', name: 'Angular Básico', category: 'Frontend' } as Course,
    { _id: '2', name: 'Spring Boot Avançado', category: 'Backend' } as Course
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
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    };

    service = new CoursesService(httpClientMock as unknown as HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.get', () => {
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
    });

    it('Should return the right url id when loadById is called', () => {
      service.loadById(1);
      expect(httpClientMock.get).toHaveBeenCalledWith(`${API_URL}/1`);
      service.loadById(2);
      expect(httpClientMock.get).toHaveBeenCalledWith(`${API_URL}/2`);
    });
  });

  describe('should call http.post', () => {
    it('should call http.post with right URL', () => {
      const novoCurso =  { name: 'Curso de Testes', category: 'Testes' } as Course;
      service.save(novoCurso);

      expect(httpClientMock.post).toHaveBeenCalledWith(API_URL, novoCurso);
    });

    it('should return the created course', (done) => {
      const novoCurso =  { name: 'Curso de Testes', category: 'Testes' } as Course;
      httpClientMock.post.mockReturnValue(of(novoCurso));

      service.save(novoCurso).subscribe((resultado) => {
        expect(resultado).toEqual(novoCurso);
        done();
      });
    });
  })

  describe('should call http.put', () => {
    it('should call http.put with right URL', () => {
      const cursoAtualizado = { _id: '1', name: 'Curso Atualizado', category: 'Atualização' } as Course;
      service.save(cursoAtualizado);

      expect(httpClientMock.put).toHaveBeenCalledWith(`${API_URL}/${cursoAtualizado._id}`, cursoAtualizado);
    });

    it('should return the updated course', (done) => {
      const cursoAtualizado = { _id: '1', name: 'Curso Atualizado', category: 'Atualização' } as Course;
      httpClientMock.put.mockReturnValue(of(cursoAtualizado));

      service.save(cursoAtualizado).subscribe((resultado) => {
        expect(resultado).toEqual(cursoAtualizado);
        done();
      });
    });
  });

  describe('should call http.delete', () => {
    it('should call http.delete with right URL', () => {
      const cursoId = '1';
      service.remove(cursoId);

      expect(httpClientMock.delete).toHaveBeenCalledWith(`${API_URL}/${cursoId}`);
    });

    it('should return void on successful deletion', (done) => {
      httpClientMock.delete.mockReturnValue(of(null));

      service.remove('1').subscribe((resultado) => {
        expect(resultado).toBeNull();
        done();
      });
    });
  });
});
