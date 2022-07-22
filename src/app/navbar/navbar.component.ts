import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Link to all movies
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Link to user profile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Link to logout current user, clear the storage an return to welcome page
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }
}
