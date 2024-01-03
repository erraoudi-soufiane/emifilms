import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Favorite } from '../model/favorites.model';
import { cp } from 'fs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];
  constructor(private favoritesService: FavoritesService) {}
  ngOnInit() {
    this.loadFavoritesIds('soufiane');
  }

  loadFavoritesIds(username: string) {
    this.favoritesService.fetchFavorites(username).subscribe(
      (data: Favorite[]) => {
        console.log('this is the favorites ids');
        this.favorites = data;
        console.log(this.favorites);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
