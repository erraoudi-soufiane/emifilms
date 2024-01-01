import { Component, Input } from '@angular/core';
import { TvShow } from '../model/tv.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css',
})
export class TvComponent {
  @Input() tvShow!: TvShow;

  constructor(private router: Router) {}

  // navigateToDetails() {
  //   this.router.navigate(['/movies', this.tvShow.id]);
  // }
}
