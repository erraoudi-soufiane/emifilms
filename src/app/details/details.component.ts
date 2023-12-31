import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service.service';
import { MovieDetails } from '../model/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  id: number = 0;
  movieDetails: MovieDetails = {} as MovieDetails;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.id = +params['id']));
    this.loadMovieDetails();
  }

  loadMovieDetails() {
    this.movieService.getMovieDetails(this.id).subscribe(
      (response: any) => {
        this.movieDetails = response;
        console.log('this is the response');
        console.log(response);
        console.log('this is the movie details');
        console.log(this.movieDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
