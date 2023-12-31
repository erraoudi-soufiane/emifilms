import { Component } from '@angular/core';

import { UpcomingMoviesComponent } from '../upcoming-movies/upcoming-movies.component';
import { TopRatedMoviesComponent } from '../top-rated-movies/top-rated-movies.component';
import { TrendingComponent } from '../trending/trending.component';
import { LatestMoviesComponent } from '../latest-movies/latest-movies.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UpcomingMoviesComponent,
    TopRatedMoviesComponent,
    TrendingComponent,
    LatestMoviesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
