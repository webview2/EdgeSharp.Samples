import { Component, OnInit, NgZone } from '@angular/core';
import { ActionClientService } from '../../services/action.controller.client.service';

type  MovieItem = {
  Id: string;
  Title: string;
  PosterUrl: string;
  Overview: string;
  ReleaseDate: string;
  Popularity: string;
  VoteCount: string;
  VoteAverage: string;
  HomePage: string;
};

@Component({
  selector: 'app-tmdb-movies',
  templateUrl: './tmdb-movies.component.html',
  styleUrls: ['./tmdb-movies.component.css']
})
export class TmdbMoviesComponent implements OnInit {

  _searchText: string;
  _moviesList: Array<MovieItem>;

  constructor(private _actionClientService: ActionClientService,
             private _zone: NgZone) { 
      this._searchText = "";
      this._moviesList = new Array<MovieItem>();

  }

  public searchMovies() {
    this.getMovies('search', this._searchText);
  }

  public getMovies(queryType: string, searchquery: string) {
    var url = 'http://edgesharp.com/tmdbmovies?querytype=' + queryType + '&searchquery=' + searchquery;
    this._actionClientService.get(url,  (data: any) => {
      this._zone.run(
          () => {
            this._moviesList = this.parseArrayResult(data.results);
          })
    });
  }

  ngOnInit(): void {
    this.getMovies('popular', '');
  }

  private parseArrayResult(data: any) {
    var dataArray = [];
    for (var i = 0; i < data.length; i++) {
        var tempItem = {
            Id: data[i].id,
            Title: data[i].original_title,
            PosterUrl: "https://image.tmdb.org/t/p/original" + data[i].poster_path,
            Overview: data[i].overview,
            ReleaseDate: data[i].release_date,
            Popularity: data[i].popularity,
            VoteCount: data[i].vote_count,
            VoteAverage: data[i].vote_average,
            HomePage: "http://edgesharp.com/tmdbmovies/homepage?movieid=" + data[i].id
        };
       
        dataArray.push(tempItem);
    }
    return dataArray;
  }
}
