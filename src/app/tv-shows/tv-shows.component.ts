import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie-service.service';
import { TvShow } from '../model/tv.model';
import { CommonModule } from '@angular/common';
import { MovieSkeletonComponent } from '../movie-skeleton/movie-skeleton.component';
import { TvComponent } from '../tv/tv.component';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.css',
  imports: [CommonModule, MovieSkeletonComponent, TvComponent],
})
export class TvShowsComponent implements OnInit {
  tvShows: TvShow[] = [];
  skeletons: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];

  ngOnInit(): void {
    this.loadTvShows();
  }

  constructor(private movieService: MovieService) {}

  loadTvShows(page: number = 1) {
    this.movieService.getTvShows(page).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.totalPages = data.total_pages;
        this.pages = this.generatePageArray(this.currentPage, this.totalPages);
        this.tvShows = data.results;
        console.log(this.tvShows);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadTvShows(this.currentPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTvShows(this.currentPage);
    }
  }
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTvShows(this.currentPage);
    }
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
