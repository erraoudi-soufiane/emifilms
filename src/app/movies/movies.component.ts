import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieComponent } from '../movie/movie.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieSkeletonComponent } from '../movie-skeleton/movie-skeleton.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  imports: [
    MovieComponent,
    CommonModule,
    HttpClientModule,
    MovieSkeletonComponent,
  ],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  skeletons: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  isLoading: boolean = true;

  constructor(private movieService: MovieService) {}
  ngOnInit() {
    this.loadMovies(this.currentPage);
  }

  loadMovies(page: number) {
    this.movieService.getMovies(page).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.totalPages = response.total_pages;
        this.pages = this.generatePageArray(this.currentPage, this.totalPages);
        this.movies = response.results.map((apiMovie: any) =>
          this.mapApiMovieToMovie(apiMovie)
        );
        console.log(this.movies);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToPage(page: number) {
    this.currentPage = page; // Update the current page
    this.loadMovies(page); // Load the movies for the selected page
  }

  goToPreviousPage() {
    // Check if you're not on the first page
    if (this.currentPage > 1) {
      this.currentPage--; // Decrement the current page number
      this.loadMovies(this.currentPage); // Load movies for the previous page
    }
  }
  goToNextPage() {
    // Check if the current page is less than the total pages
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Increment the current page number
      this.loadMovies(this.currentPage); // Load movies for the next page
    }
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

  generatePageArray(currentPage: number, totalPages: number): number[] {
    let startPage: number, endPage: number;
    const visiblePages = 5; // Number of pages you want to show in the pagination bar

    if (totalPages <= visiblePages) {
      // If the total number of pages is less than what you want to show, display them all
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate the start and end page numbers
      const maxPagesBeforeCurrentPage = Math.floor(visiblePages / 2);
      const maxPagesAfterCurrentPage = Math.ceil(visiblePages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // Near the beginning of the page range
        startPage = 1;
        endPage = visiblePages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // Near the end of the page range
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        // Somewhere in the middle of the page range
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // Create an array of pages to ngFor in the pagination control
    let pages: number[] = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    return pages;
  }
}
