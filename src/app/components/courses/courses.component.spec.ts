import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Course } from './model/course';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  const coursesSubject = new BehaviorSubject<Course[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoursesComponent,
        RouterModule.forRoot([], {
          initialNavigation: 'disabled'
        })],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;

    component.courses$ = coursesSubject.asObservable();
    component.displayedColumns = ['name', 'category'];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-card', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
  });

  it('should render "Cursos disponíveis" correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Cursos disponíveis');
  });

  it('should render course collun headers', () => {
    coursesSubject.next([
      { _id: 1, name: 'Angular Basics', category: 'Frontend' },
      { _id: 2, name: 'Node.js', category: 'Backend' }
    ]);

    fixture.detectChanges();

    const headerCells = fixture.debugElement.queryAll(By.css('th'));

    expect(headerCells.length).toBe(2);

    expect(headerCells[0].nativeElement.textContent.trim()).toBe('Curso');
    expect(headerCells[1].nativeElement.textContent.trim()).toBe('Categoria');
  });
});
