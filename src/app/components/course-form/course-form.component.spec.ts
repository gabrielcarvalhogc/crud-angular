import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { By } from '@angular/platform-browser';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let mockService: { save: jest.Mock };
  let snackBar: MatSnackBar

  beforeEach(async () => {
    mockService = { save: jest.fn() }

    await TestBed.configureTestingModule({
      imports: [CourseFormComponent, NoopAnimationsModule, ReactiveFormsModule, MatSnackBarModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        FormBuilder, { provide: CoursesService, userValue: mockService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create form component', () => {
    const form = component.form;

    expect(form).toBeTruthy();
  });

  it('should open snackBar with a message and action', () => {
    const spy = jest.spyOn(component, 'openSnackBar');

    component.openSnackBar('test message', 'OK');

    expect(spy).toHaveBeenCalledWith('test message', 'OK');
  });

  it('save button calls onSubmit()', () => {
    const spy = jest.spyOn(component, 'onSubmit');
    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

});
