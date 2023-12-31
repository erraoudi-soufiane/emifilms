import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie-service.service';
import { NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    NgxEditorModule,
  ],
  providers: [MovieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'emifilms';
  actions: Array<any> = [
    { title: 'Home', route: '/' },
    { title: 'Movies', route: '/movies' },
    { title: 'Tv shows', route: '/tv-shows' },
  ];
  currentAction: any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
