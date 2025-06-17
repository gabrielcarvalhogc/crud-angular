import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../components/courses/model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //private API = 'courses.json';
  private readonly API = 'http://localhost:8080/api/courses';

  constructor(
    private readonly http: HttpClient,
  ) { }

  getList() {
    return this.http.get<Course[]>(this.API)
  }

  loadById(id: number) {
    return this.http.get<Course>(`${this.API}/${id}`);
  }

  save(record: Course) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Course) {
    return this.http.post<Course>(this.API, record);
  }

  private update(record: Course) {
    return this.http.put<Course>(`${this.API}/${record._id}`, record);
  }

  remove(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
