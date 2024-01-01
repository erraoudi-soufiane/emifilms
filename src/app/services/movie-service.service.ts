import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MovieDetails } from '../model/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrlMovie = 'https://api.themoviedb.org/3/discover/movie';
  private apiUrlTv = 'https://api.themoviedb.org/3/discover/tv';
  private apiKey = 'eb552b3efa84cd7a6d178af28efdf67e';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjU1MmIzZWZhODRjZDdhNmQxNzhhZjI4ZWZkZjY3ZSIsInN1YiI6IjY1OGI0ZDMyYWU2ZjA5MmRmZjU1ZWVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ra3iOhUIV7lxfvaalhGN4K-k2vlwlncCi1VIvFL3aJ8',
    }),
  };
  constructor(private http: HttpClient) {}
  getMovies(page: number = 1) {
    const params = {
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: page.toString(),
      sort_by: 'popularity.desc',
    };

    return this.http.get(this.apiUrlMovie, { ...this.httpOptions, params });
  }

  getMovieDetails(id: number) {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    return this.http.get<MovieDetails>(movieDetailsUrl, this.httpOptions);
  }

  getTvShows(page: number = 1) {
    const params = {
      include_adult: 'false',
      include_null_first_air_dates: 'false',
      language: 'en-US',
      page: page.toString(),
      sort_by: 'popularity.desc',
    };

    return this.http.get(this.apiUrlTv, { ...this.httpOptions, params });
  }
}
