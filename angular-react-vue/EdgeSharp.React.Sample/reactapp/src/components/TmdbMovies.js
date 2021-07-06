import React from 'react';
import { useState, useEffect } from 'react';

import { actionClientGet } from '../services/ActionControllerClientService.js';

export default function TmdbMovies() {

  const tmdbPopular     = 'popular';
  const tmdbToprated    = 'toprated';
  const tmdbNowplaying  = 'nowplaying';
  const tmdbUpcoming    = 'upcoming';

  const [searchText, setSearchText] = useState('');
  const [moviesList, setMoviesList] = useState([]);

  const getMovies = (queryType) => {
    var url = 'http://edgesharp.com/tmdbmovies?querytype=' + queryType + '&searchquery=' + searchText;
    actionClientGet(url, getMoviesCallback);
  };

  const searchMovies = () => {
    getMovies('search', searchText);
  };

  const getMoviesCallback = (response) => {
    var dataArray = parseArrayResult(response.results);
    setMoviesList(dataArray);
  };

  const parseArrayResult = (data) => {
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

  const imageStyle = {
    height: '100%',
    width: '100%',
    'object-fit': 'contain'
  };

  useEffect(() => {
    getMovies('popular', '');
  }, []);


  return (
    <div className="container justify-content-center mt-3">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary" onClick={() => getMovies(tmdbPopular)}>popular</button>
                        <button type="button" className="btn btn-secondary" onClick={() => getMovies(tmdbToprated)}>top rated</button>
                        <button type="button" className="btn btn-secondary" onClick={() => getMovies(tmdbNowplaying)}>now playing</button>
                        <button type="button" className="btn btn-secondary" onClick={() => getMovies(tmdbUpcoming)}>upcoming</button>
                    </div>
                </div>
                <div className="col">
                  <div className="form-group d-flex">
                    <input  type="text" value={searchText} onChange={e => setSearchText(e.target.value)} className="form-control me-sm-2" placeholder="search movies" />
                    <button type="button" className="btn btn-secondary my-2 my-sm-0" onClick={searchMovies}>Search</button>
                  </div>
                </div>
            </div>
        </div>


       <div className="moviesCointainer container-fluid  mt-3">
            <div className="row row-cols-1 row-cols-md-3 g-4">

                {moviesList.map(item => (

                  <div className="col">
                    <div className="card h-100">
                      <div className="text-center">
                      <img src={'https://image.tmdb.org/t/p/original' + item.PosterUrl} alt='...' title={item.Title} style={imageStyle} />
                      </div>
                        <div className="card-body">
                            <h4 className='card-title text-info'>{item.Title}</h4>
                            <h6 className='card-subtitle text-muted'>{item.ReleaseDate}</h6>
                            <p className='card-text mt-4'><b>Popularity</b>: {item.Popularity}<br /><b>Vote Count</b>:  {item.VoteCount} <br /><b>Vote Average</b>:  {item.VoteAverage}
                            <br /><br /><a className='btn btn-primary' href={item.HomePage}>Homepage</a></p>
                        </div>
                    </div>
                  </div>

                ))}

            </div>
       </div>
    </div>
  );
}