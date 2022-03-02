import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // variable declared as an array. Movies returned from API will be kept here
  movies: any[] = [];
  constructor(public fetchApiData: UserRegistrationService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  // function to fetch the movies from the fetchApi Data service
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
