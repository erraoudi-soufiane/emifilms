import { Component, Input } from '@angular/core';
import { Movie } from '../model/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  @Input() movie!: Movie;

  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/movies', this.movie.id]);
  }
}
