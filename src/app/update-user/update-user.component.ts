import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar,
    public router: Router

  ) { }

  ngOnInit(): void {
  }

  updateUserProfile(): void {
    this.fetchApiData.updateUserProfile(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      window.location.reload();
      localStorage.setItem('Username', resp.Username)
      console.log(resp)
      this.snackBar.open(this.userData.Username, 'Succesfully updated your profile!', {
        duration: 3000
      });
    }, (resp) => {
      this.snackBar.open(resp, 'OK', {
        duration: 3000
      });
    })
  }
}