import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  getCommentsByMovieId(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/${movieId}`);
  }

  postComment(comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments/add`, comment);
  }
}
