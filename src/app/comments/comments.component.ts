import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from '../services/details.service';
import { ActivatedRoute } from '@angular/router';
import { comment } from '../model/comment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  @Input() movieId!: number;
  comments: comment[] = [];
  comment: comment = {} as comment;

  constructor(private detailsService: DetailsService) {}

  ngOnInit() {
    this.getCommentsByMovieId(this.movieId);
  }
  getCommentsByMovieId(movieId: number) {
    this.detailsService.getCommentsByMovieId(movieId).subscribe(
      (data) => {
        this.comments = data;
        console.log('this is the comments');
        console.log(this.comments);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.comment.movieId = this.movieId;
    this.detailsService.postComment(this.comment).subscribe(
      (response) => {
        console.log('this is the comment you typed ');
        console.log(this.comment);
        console.log('Comment submitted', response);
        this.getCommentsByMovieId(this.movieId);
      },
      (error) => {
        console.error('Error submitting comment', error);
      }
    );
  }
}
