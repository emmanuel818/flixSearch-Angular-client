import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
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
  user: any = localStorage.getItem('Username');
  favs: any = null;



  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.favs = resp.Favorites;
      console.log(this.user)
      return (this.user, this.favs);
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
        Deathyear: deathyear,
      },
      width: '500px'
    });
  }


  openEditUserProfile(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '500px'
    });
  }

  getFavorites(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      movies = resp;
      movies.forEach((movie: any) => {
        if (this.user.favorites.includes(movie._id)) {
          this.favs.push(movie);
        }
      });
    });
    return this.favs;
  }

  removeFavorites(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open('Movie was removed from Favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favs;
    })
  }

  deleteProfile(): void {
    if (confirm('Are you sure? This cannot be undone')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your profile was deleted', 'OK', { duration: 6000 });
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      })
    }
  }
}
