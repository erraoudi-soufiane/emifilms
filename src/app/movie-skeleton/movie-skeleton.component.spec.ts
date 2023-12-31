import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSkeletonComponent } from './movie-skeleton.component';

describe('MovieSkeletonComponent', () => {
  let component: MovieSkeletonComponent;
  let fixture: ComponentFixture<MovieSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
