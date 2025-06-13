import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { RouterModule } from '@angular/router';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoursesListComponent,
        RouterModule.forRoot([]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-table', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-table')).toBeTruthy();
  });

  it('should render column headers', () => {
    const compiled = fixture.nativeElement;
    const headers = compiled.querySelectorAll('mat-header-cell');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toContain('Curso');
    expect(headers[1].textContent).toContain('Categoria');
  });

  //it('should call onAdd when "Adicionar Curso" button is clicked', () => {
   // const spy = jest.spyOn(component, 'onAdd');
  //  const button = fixture.debugElement.query(By.css('[data-testid="add-button"]'));

  //  button.nativeElement.click();
  //  expect(spy).toHaveBeenCalled();
  //});
});
