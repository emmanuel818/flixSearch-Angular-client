import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {}

  /**
   * Binding input values to userProfile object
   */

  @Input() userProfile = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * get user info
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
    });
  }

  /**
   * update the user information in API
   * @function updateUserProfile
   * @return an updated user in JSON format
   * the stores it in localstorage, and a popup message is displayed upon successful update
   */
  updateUserProfile(): void {
    this.fetchApiData.updateUserProfile(this.userProfile).subscribe(() => {
      this.dialogRef.close();

      localStorage.setItem('Username', this.userProfile.Username);
      localStorage.setItem('Password', this.userProfile.Password);

      this.snackBar.open('Your profile was updated succesfully!', 'OK', {
        duration: 3000
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }
}