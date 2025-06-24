import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  private readonly _snackBar = inject(MatSnackBar);
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private readonly service: CoursesService,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: ['', [Validators.required]]
    });

    const course: Course = this.route.snapshot.data['course'];

    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });

    console.log(course)
  }

  openSnackBar(message: string, action: string, config?: { duration?: number }) {
    this._snackBar.open(message, action, config);
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => this.onCancel()
      });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.openSnackBar('Curso salvo com sucesso', '', { duration: 3000 });
  }

  private onError() {
    this.openSnackBar('Erro ao salvar o curso', 'Fechar');
  }

  errorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 5;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }
}
