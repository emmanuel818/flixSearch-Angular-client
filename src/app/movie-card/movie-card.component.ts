import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';




@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // variable declared as an array. Movies returned from API will be kept here
  movies: any = [];
  FavoriteMovies: any[] = [];
  user: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  // function to fetch the movies from the fetchApi Data service
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavoriteMovies = resp.FavoriteMovies;
      console.log(this.FavoriteMovies);
    });
  }

  openGenreDialog(
    name: string,
    description: string
  ): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    });
  }

  openDirectorDialog(
    name: string, bio: string, birthyear: string, deathyear: string
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthyear: birthyear,
        Deathyear: deathyear,
      },
      width: '500px'
    });
  }

  openSynopsisDialog(title: string, imageUrl: any, description: string, genre: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        Title: title,
        ImageUrl: imageUrl,
        Description: description,
        Genre: genre,
      },
      width: '500px'
    });
  }

  addFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavoriteMovies(MovieID).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  removeFavoriteMovie(MovieId: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieId).subscribe(() => {
      this.snackBar.open(`${title} has been removed from your favorites`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  isFavorite(MovieID: string): boolean {
    return this.FavoriteMovies.some((movie) => movie._id === MovieID);
  }

  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}