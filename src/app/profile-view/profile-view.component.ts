import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
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
  FavoriteMovies: any[] = [];

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


  /**
   * call API end-point to get the user's information
   * @function getUserInfo
   * @return user's data in JSON format
   */
  getUserInfo(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  /**
   * get user's favorite movies from the user's data
   * @function getFavoriteMovies
   * @return user's favorite movies
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((res: any) => {
        this.FavoriteMovies = resp.filter((movie: any) =>
        return this.FavMovies;
        });
      }
  }

    /**
     * use API end-point to remove user favorite movie
     * @function removeFavoriteMovie
     * @param MovieID {string}
     * @param title {string}
     * @return updated user's data in JSON format
     */
    removeFavoriteMovie(MovieID: string, title: string): void {
      this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe(() => {
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

    /**
     * call API end-point to remove the current user
     * @function deleteUser
     * @return delete status
     */
    deleteUser(): void {
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }


    /**
     * open a dialog to the edit the user profile
     * @module UpdateUserComponent
     */
    openEditUserProfile(): void {
      this.dialog.open(UpdateUserComponent, {
        width: '500px'
      });
    }

    /**
     * open a dialog to display the Synopsis
     * @param title {string}
     * @param imageUrl {any}
     * @param description {string}
     * @param genre {string}
     * @return movie synopsis
     * @module MovieViewComponent
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
     * Open a dialog to display the genre 
     * @param name 
     * @param description 
     * @module GenreViewComponent
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
     * opens a dialog to diaply directors information
     * @param name 
     * @param bio 
     * @param birthyear 
     * @param deathyear 
     * @module DirectorViewComponent
     */
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
