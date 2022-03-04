import { Component, OnInit } from '@angular/core';
import { UserRegistrationService, User } from '../fetch-api-data.service';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
;

import { MovieViewComponent } from '../movie-view/movie-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');

  FavMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavoriteMovies();
  }

  getUserInfo(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: User) => {
        this.user = resp;

        console.log(this.user);
      });
    }
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavMovies = resp.FavoriteMovies;
      console.log(this.FavMovies);
      return this.FavMovies;
    });
  }

  removeFavoriteMovie(MovieId: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favorites!`,
        'OK',
        {
          duration: 4000,
        }
      );
      this.ngOnInit();
    });
  }

  deleteUser(): void {
    this.fetchApiData.deleteUserProfile(this.Username).subscribe(() => {
      this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

  openEditUserProfile(): void {
    this.dialog.open(UpdateUserComponent, {
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
        Deathyear: deathyear
      },
      width: '500px'
    });
  }



}
