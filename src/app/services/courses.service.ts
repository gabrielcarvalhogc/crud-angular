import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../components/courses/model/course';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //private API = 'courses.json';
  private API = 'http://localhost:8080/api/courses';

  constructor(
    private http: HttpClient,
  ) {}

  getList() {
    return this.http.get<Course[]>(this.API)
      .pipe(
        first(),
        tap(courses => {
          console.log(courses);})
      );
  }

  save(record: Course) {
    return this.http.post<Course>(this.API, record);
  }
}
