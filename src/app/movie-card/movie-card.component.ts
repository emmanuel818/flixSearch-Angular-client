import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // variable declared as an array. Movies returned from API will be kept here
  movies: any[] = [];
  username: any = localStorage.getItem('user');
  user: any = JSON.parse(this.username);
  currentUser: any = null;
  currentFavs: any[] = [];
  isInFavs: boolean = false;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.currentUser = resp;
      this.currentFavs = resp.Favorites;
      return (this.currentUser, this.currentFavs);
    });
  }

  // function to fetch the movies from the fetchApi Data service
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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

  toggleFavs(movieId: string): void {
    if (this.currentFavs.filter(function (e: any) { return e._id === movieId; }).length > 0) {
      this.removeFromFavs(movieId);
      this.isInFavs = false;
    } else {
      this.addToFavs(movieId)
      this.isInFavs = true;
    }
  }

  addToFavs(movieId: string): void {
    //checking if the title is already in favs
    if (this.currentFavs.filter(function (e: any) { return e._id === movieId; }).length > 0) {
      this.snackBar.open('Already in your favs', 'OK', { duration: 2000 });
      return
    } else {
      this.fetchApiData.addFavoriteMovies(movieId).subscribe((resp: any) => {
        this.getCurrentUser();
        this.ngOnInit();
        this.snackBar.open('Added to favs', 'OK', { duration: 2000 });
      });
    }
  }

  removeFromFavs(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovies(movieId).subscribe((resp: any) => {
      this.snackBar.open('Removed from favs', 'OK', { duration: 2000 });
      this.getCurrentUser();
      this.ngOnInit();
      2000
    });
  }

  favCheck(movieId: string): any {
    let favIds = this.currentFavs.map(function (fav: any) { return fav._id });
    if (favIds.includes(movieId)) {
      this.isInFavs = true;
      return this.isInFavs;
    };
  }
}