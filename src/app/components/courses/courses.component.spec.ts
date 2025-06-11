import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

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
});
