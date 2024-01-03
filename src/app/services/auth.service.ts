import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: string = '';
  accessToken: string = '';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    let parms: HttpParams = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<any>(
      'http://localhost:8085/auth/login',
      parms,
      options
    );
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    console.log('this is the data');
    console.log(data);
    this.accessToken = data['acces-token'];
    console.log('this is the access token');
    console.log(this.accessToken);
    let decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;

    if (isPlatformBrowser(this.platformId)) {
      // Only interact with localStorage if on the browser platform
      localStorage.setItem(
        'isAuthenticated',
        JSON.stringify(this.isAuthenticated)
      );
      localStorage.setItem('roles', JSON.stringify(this.roles));
      localStorage.setItem('username', this.username);
      localStorage.setItem('accessToken', this.accessToken);

      // ... other localStorage calls
    }
  }
}
