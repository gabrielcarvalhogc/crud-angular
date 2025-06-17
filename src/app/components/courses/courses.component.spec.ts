import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Course } from './model/course';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let router: Router;
  const mockRouter = {
    navigate: jest.fn()
  };
  const mockActivatedRoute = {} as ActivatedRoute;


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        CoursesComponent,
        RouterModule.forRoot([])],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);

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

  it('should navigate to the "new" route', () => {
    component.onAdd();

    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(
      ['new'],
      { relativeTo: mockActivatedRoute }
    );
  });

  it('should navigate to the "edit/:id" route with the course id', () => {
    const course: Course = { _id: '12', name: 'Angular', category: 'Frint-end' };

    component.onEdit(course);

    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(
      ['edit', course._id],
      { relativeTo: mockActivatedRoute }
    );
  });

  it('should call delete method when onDelete is called', () => {
    const course: Course = { _id: '12', name: 'Angular', category: 'Front-end' };
    const deleteSpy = jest.spyOn(component, 'onDelete');

    component.onDelete(course);

    expect(deleteSpy).toHaveBeenCalledWith(course);
  });

});
