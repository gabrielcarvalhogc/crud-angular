import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
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
    const compiled = fixture.nativeElement;
    const headers = compiled.querySelectorAll('th');

    expect(headers[0].textContent).toContain('Curso');
    expect(headers[1].textContent).toContain('Categoria');
  });

  it('should render course rows', () => {
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('td');
    const coursesMock = [ {_id: '1', name: 'Angular Basics', category: 'Frontend' },];

    expect(rows[0].textContent).toContain(coursesMock[0].name);
    expect(rows[1].textContent).toContain(coursesMock[0].category);
  });
});
