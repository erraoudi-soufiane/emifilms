import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie-service.service';
import { DetailsService } from './services/details.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule],
  providers: [MovieService, DetailsService, AuthService, FavoritesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isUserAuthenticated: boolean = false;
  username: string = '';

  // this.roles = JSON.parse(localStorage.getItem('roles'));
  // this.accessToken = localStorage.getItem('accessToken');

  title = 'emifilms';
  actions: Array<any> = [
    { title: 'Home', route: '/' },
    { title: 'Movies', route: '/movies' },
    { title: 'Tv shows', route: '/tv-shows' },
  ];
  currentAction: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isUserAuthenticated = JSON.parse(
        localStorage.getItem('isAuthenticated') || 'false'
      );
      this.username = localStorage.getItem('username') || '';
      console.log('this is the isUserAuthenticated');
      console.log(this.isUserAuthenticated);
    }
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('roles');
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/movies']);
  }
}
