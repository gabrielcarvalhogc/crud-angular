import { Component, Input } from '@angular/core';
import { Course } from '../courses/model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CategoryPipe } from '../../shared/pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    CategoryPipe
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
