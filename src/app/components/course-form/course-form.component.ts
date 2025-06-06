import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSelectModule, MatSnackBarModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  private _snackBar = inject(MatSnackBar);
  form: FormGroup;

  constructor(formBuilder: FormBuilder, private service: CoursesService) {
    this.form = formBuilder.group({
      name: [null],
      category: [null]
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    this.service.save(this.form.value)
    .subscribe({
      next: (result) => console.log(result),
      error: () => this.onError()
    });
  }

  onCancel() {

  }

  private onError() {
    this.openSnackBar('Erro ao salvar o curso', 'Fechar');
  }
}
