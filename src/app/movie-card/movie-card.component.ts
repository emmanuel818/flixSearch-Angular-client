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

  /**
   * use API call to get data of all movies
   * @function getAllMovies
   * @return movies in JSON format
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * get an array of the user's favorite movies from user's data
   * @function getUser
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavoriteMovies = resp.FavoriteMovies;
      console.log(this.FavoriteMovies);
    });
  }

  /**
   * open a dialog to display the Genre
   * @param name 
   * @param description 
   */
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

  /**
   * Open a dialog to display director information
   * @param name 
   * @param bio 
   * @param birthyear 
   * @param deathyear 
   */
  openDirectorDialog(
    name: string, bio: string, birthyear: string, deathyear: string
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        name: name,
        bio: bio,
        birthyear: birthyear,
        deathyear: deathyear,
      },
      width: '500px'
    });
  }

  /**
   * Open a dialog to display the movie information
   * @param title 
   * @param imageUrl 
   * @param description 
   * @param genre 
   */
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

  /**
   * use API end-point to add a favorite movie
   * @param MovieID {string} 
   * @param Title {string}
   * @returns an array of the movie object in JSON format
   */
  addFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.addFavoriteMovies(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${Title} has been added to your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * user API end-point to remove a user favorite
   * @param MovieID {any}
   * @param title {string}
   * @returns updated user's data in JSON format
   */
  removeFavoriteMovie(MovieID: object, title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${title} has been removed from your favorites`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * check if the movie is in the user's favorite
   * @param MovieID {string}
   * @returns true or false
   */
  isFavorite(MovieID: object): boolean {
    return this.FavoriteMovies.some((movie) => movie._id === MovieID);
  }

  /**
   * toggle add/remove user's favorite function
   * if the movie is not in the favorite list, call
   * @function addFavoriteMovie
   * if the  movie is in the favorite list,call
   * @function removeFavoriteMovie
   * @param movie {any}
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}