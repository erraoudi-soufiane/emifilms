import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Favorite } from '../model/favorites.model';
import { MovieDetails } from '../model/movie.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjU1MmIzZWZhODRjZDdhNmQxNzhhZjI4ZWZkZjY3ZSIsInN1YiI6IjY1OGI0ZDMyYWU2ZjA5MmRmZjU1ZWVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ra3iOhUIV7lxfvaalhGN4K-k2vlwlncCi1VIvFL3aJ8',
    }),
  };

  fetchFavorites(username: string) {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    console.log('this is the access token grrr');
    console.log(accessToken);
    return this.http.get<Favorite[]>(
      `http://localhost:8085/favorites/${username}`,
      {
        headers,
      }
    );
  }

  getFavoritesFromApi() {}

  getMovieDetails(id: number) {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    return this.http.get<MovieDetails>(movieDetailsUrl, this.httpOptions);
  }
}
