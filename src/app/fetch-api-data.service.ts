import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs';


const apiUrl = 'https://flix-search-2021.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }


  //Making the api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(userDeta: any): Observable<any> {
    console.log(userDeta);
    return this.http.get(apiUrl + 'login', userDeta).pipe(
      catchError(this.handleError)
    );
  }


  //get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get one movie
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //get director
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:name', {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get director
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre/:name', {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get user profile
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.get(apiUrl + `users/${Username}`, {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get favorite movies
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.get(apiUrl + `users/${Username}`, {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add Favorite movie to user
  addFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.post(apiUrl + `users/${Username}/movies/${id}`, {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // delete Favorite movie 
  deleteFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.delete(apiUrl + `users/${Username}/movies/${id}`, {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Update user profile
  updateUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.put(apiUrl + `users/${Username}`, userData, {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Update user profile
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.delete(apiUrl + `users/${Username}`, {
      headers: new HttpHeaders
        (
          {
            Authorization: 'Bearer ' + token,
          })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Non-typed response extraction
  private extractResponseData(res: any): any {
    return res || {};
  }



  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
