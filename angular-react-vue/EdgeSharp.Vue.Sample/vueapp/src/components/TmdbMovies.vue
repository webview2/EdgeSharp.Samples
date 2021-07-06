<template>
    <div class="container justify-content-center mt-3">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-secondary" @click="getMovies('popular', '')">popular</button>
                        <button type="button" class="btn btn-secondary" @click="getMovies('toprated', '')">top rated</button>
                        <button type="button" class="btn btn-secondary" @click="getMovies('nowplaying', '')">now playing</button>
                        <button type="button" class="btn btn-secondary" @click="getMovies('upcoming', '')">upcoming</button>
                    </div>
                </div>
                <div class="col">
                  <div class="form-group d-flex">
                    <input  v-model="searchText" type="text" class="form-control me-sm-2" placeholder="search movies">
                    <button type="button" class="btn btn-secondary my-2 my-sm-0" @click="searchMovies()">Search</button>
                  </div>
                </div>
            </div>
        </div>


       <div class="moviesCointainer container-fluid  mt-3">
            <div class="row row-cols-1 row-cols-md-3 g-4">
               <div  v-for="item in movieListResult"  v-bind:key="item.Id">

                    <!-- Card -->
                    <div class="col">
                        <div class="card h-100">
                            <div class="text-center">
                                <img v-bind:src="item.PosterUrl" alt="..." title="{{ item.Title }}" style="width: 100%;" />
                            </div>
                            <div class="card-body">
                                <h4 class="card-title text-info">{{ item.Title }}</h4>
                                <h6 class="card-subtitle text-muted">{{ item.ReleaseDate }}</h6>
                                <p class="card-text mt-4"><b>Popularity</b>: {{ item.Popularity }}<br /><b>Vote Count</b>:  {{ item.VoteCount }} <br /><b>Vote Average</b>:  {{ item.VoteAverage }}
                                <br /><br /><a class="btn btn-primary" v-bind:href="item.HomePage">Homepage</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>


    </div>
</template>


<script>
var actionClient = require('../services/ActionControllerClient');

export default {
  data(){
    return{
       searchText: '',
        movieListResult: []
    }
  }, 
  methods: {
       getMovies(queryType, searchquery) {
           var url = 'http://edgesharp.com/tmdbmovies?querytype=' + queryType + '&searchquery=' + searchquery;
           actionClient.get(url, this.getMoviesCallback);
        },
        searchMovies() {
            if (typeof this.searchText !== 'undefined' && this.searchText !== null ) {
                this.getMovies('search', this.searchText);
            }
		},
		getMoviesCallback (response) {
            var dataArray = this.parseArrayResult(response.results);
            this.movieListResult = dataArray
        },
         parseArrayResult(data) {
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
	},
  mounted(){
    this.getMovies('popular', '');
  }
}
</script>