import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { By } from '@angular/platform-browser';
import { EMPTY, of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let mockService: { save: jest.Mock };

  beforeEach(async () => {
    mockService = { save: jest.fn() }

    await TestBed.configureTestingModule({
      imports: [
        CourseFormComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterModule.forRoot([])
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        FormBuilder,
        { provide: CoursesService, useValue: mockService },
        { provide: Location, useValue: { back: jest.fn() } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                course: { _id: 1, name: 'Test', category: 'TestCat' }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
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

  it('should call onSuccess and openSnackBar when save', () => {
    mockService.save.mockReturnValue(of({}));

    const spySuccess = jest.spyOn(component as any, 'onSuccess');
    const snackSpy = jest.spyOn(component, 'openSnackBar');

    component.onSubmit();

    expect(spySuccess).toHaveBeenCalled();
    expect(snackSpy).toHaveBeenCalledWith('Curso salvo com sucesso', '', { duration: 3000 });
  });

  it('should call onError and openSnackBar when save error', () => {
    mockService.save.mockReturnValue(throwError(() => new Error('fail')));
    const spyError = jest.spyOn(component as any, 'onError');
    const snackSpy = jest.spyOn(component, 'openSnackBar');

    component.onSubmit();

    expect(spyError).toHaveBeenCalled();
    expect(snackSpy).toHaveBeenCalledWith('Erro ao salvar o curso', 'Fechar');
  });

  it('should call onCancel when Observable does no have value', () => {
    mockService.save.mockReturnValue(EMPTY);
    const loc = TestBed.inject(Location);
    const backSpy = jest.spyOn(loc, 'back');

    component.onSubmit();

    expect(backSpy).toHaveBeenCalled();
  });

  it('submit button should call onSuccess and back navigation', () => {
    mockService.save.mockReturnValue(of({}));
    const snackSpy = jest.spyOn(component, 'openSnackBar');
    const loc = TestBed.inject(Location);
    const backSpy = jest.spyOn(loc, 'back');

    const btn: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[type=submit]'))
      .nativeElement;
    btn.click();

    expect(snackSpy).toHaveBeenCalledWith('Curso salvo com sucesso', '', { duration: 3000 });
    expect(backSpy).toHaveBeenCalled();
  });
});

