import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs';



const apiUrl = 'https://flix-search-2021.herokuapp.com';
export interface User {
  _id: string;
  FavoriteMovies: Array<string>;
  Username: string;
  Email: string;
  Birthday: Date;
}
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  /**
   * Inject the HttpClient module to the constructor params 
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) {
  }


  /**
   * call API end-point to register a new user
   * @function userRegistration
   * @param userData {any}
   * @returns a new user object in json format
   */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/users', userData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to log in a user
   * @function userLogin
   * @param userData {any}
   * @returns user's data in json format
   */
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/login', userData).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * call API end-point to get all movies
   * @function getAllMovies
   * @returns array of movies object in json format
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {
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

  /**
   * call API end-point to get a specific movie by title
   * @function getSingleMovie
   * @returns a movie object in json format
   */
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/:title', {
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


  /**
   * call API end-point to get a director information by name
   * @function getDirector
   * @returns a director's information in json format
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/directors/:name', {
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

  /**
   * call API end-point to get a genre's data
   * @function getGenre
   * @returns genre's data in json format
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/genre/:name', {
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

  /**
   * call API end-point to get user's information
   * @function getUser
   * @param Username {any}
   * @returns a user's information in json format
   */
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/users/${Username}`, {
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

  /**
   * call API end-point to get a user's favorite movies
   * @function getFavoriteMovies
   * @param Username {any}
   * @returns a list of user's favoriote movies in JSON format
   */
  getFavoriteMovies(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/users/${Username}`, {
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

  /**
   * call API end-point to add a movie to user's favorite list
   * @function addFavoriteMovies
   * @param MovieID {any}
   * @returns a list of a user's favorite movies in JSON format
   */
  addFavoriteMovies(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.post(apiUrl + `/users/${Username}/movies/${MovieID}`, null, {
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

  /**
   * call to API end-point to delete a movie from user's favorites list
   * @function deleteFavoriteMovies
   * @param MovieID {any}
   * @returns an update favorite movies list in JSON format
   */
  deleteFavoriteMovies(MovieID: any): Observable<any> {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `/users/${Username}/movies/${MovieID}`, {
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

  /**
   * call API end-point to edit the user's information
   * @param userCredentials {object}
   * @returns updated user's information in JSON format
   */
  updateUserProfile(userCredentials: object): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.put(apiUrl + `/users/${Username}`, userCredentials, {
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

  /**
   * call API end-point to delete the current user
   * @returns delete status
   */
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user')
    return this.http.delete(apiUrl + `/users/${Username}`, {
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

  /**
   * Non-typed response extraction
   * @param data {any}
   * @returns response || empty object
   */
  private extractResponseData(data: any | object): any {
    return data || {};
  }


  // handle error 
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
