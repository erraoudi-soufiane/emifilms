import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie-service.service';
import { response } from 'express';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent implements OnInit {
  trendingMovies: Movie[] = [];
  ngOnInit(): void {
    this.getTrendigMovies();
  }
  constructor(private movieService: MovieService) {}
  getTrendigMovies() {
    return this.movieService.getMovies().subscribe(
      (response: any) => {
        console.log(response);
        this.trendingMovies = response.results.map((apiMovie: any) => {
          this.mapApiMovieToMovie(apiMovie);
        });
        console.log(this.trendingMovies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private mapApiMovieToMovie(apiMovie: any): Movie {
    return {
      adult: apiMovie.adult,
      backdropPath: apiMovie.backdrop_path,
      genreIds: apiMovie.genre_ids,
      id: apiMovie.id,
      originalLanguage: apiMovie.original_language,
      originalTitle: apiMovie.original_title,
      overview: apiMovie.overview,
      popularity: apiMovie.popularity,
      posterPath: apiMovie.poster_path,
      releaseDate: apiMovie.release_date,
      title: apiMovie.title,
      video: apiMovie.video,
      voteAverage: apiMovie.vote_average,
      voteCount: apiMovie.vote_count,
    };
  }
}
