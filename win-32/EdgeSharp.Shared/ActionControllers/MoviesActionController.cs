using System;
using System.Linq;
using System.Threading.Tasks;
using EdgeSharp.Core.Infrastructure;
using EdgeSharp.Core.Network;
using EdgeSharp.Shared.Data;
using EdgeSharp.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace EdgeSharp.Shared.ActionControllers
{
    [ActionController(Name = "MoviesActionController", Description = "Movies controller")]
    public class MoviesActionController : ActionController
    {
        private readonly MovieContext _context;

        public MoviesActionController(MovieContext context)
        {
            _context = context;
        }

        [ActionRoute(Path = "/movies")]
        public async Task<MoviesViewModel> GetMoviesAsync(string movieGenre, string searchString)
        {
            IQueryable<string> genreQuery = from m in _context.Movie
                                            orderby m.Genre
                                            select m.Genre;

            var movies = from m in _context.Movie
                         select m;

            if (!string.IsNullOrEmpty(searchString))
            {
                movies = movies.Where(s => s.Title.Contains(searchString));
            }

            if (!string.IsNullOrEmpty(movieGenre))
            {
                movies = movies.Where(x => x.Genre == movieGenre);
            }

            var genres = await genreQuery.Distinct().ToListAsync();
            var moviesList = await movies.ToListAsync();

            var moviesVM = new MoviesViewModel
            {
                Genres = genres,
                Movies = moviesList
            };

            return moviesVM;
        }

        [ActionRoute(Path = "/moviedetails/get")]
        public async Task<Movie> Details(int? id)
        {
            if (id == null)
            {
                return null;
            }

            return await _context.Movie.FirstOrDefaultAsync(m => m.Id == id);
        }


        [ActionRoute(Path = "/moviecreate/post")]
        public async Task<bool> Create(Movie movie)
        {
            try
            {
                _context.Add(movie);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception exception)
            {
                Logger.Instance.Log.LogError(exception);
            }

            return false;
        }

        [ActionRoute(Path = "/movieedit/get")]
        public async Task<Movie> Edit(int? id)
        {
            if (id == null)
            {
                return null;
            }

            return await _context.Movie.FindAsync(id);
        }

        [ActionRoute(Path = "/movieedit/post")]
        public async Task<bool> Edit(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return false;
            }

            try
            {
                var itemToUpdate = await _context.Movie.FirstOrDefaultAsync(m => m.Id == id);

                itemToUpdate.Title = movie.Title;
                itemToUpdate.Genre = movie.Genre;
                itemToUpdate.Rating = movie.Rating;
                itemToUpdate.ReleaseDate = movie.ReleaseDate;
                itemToUpdate.Price = movie.Price;

                _context.Update(itemToUpdate);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception exception)
            {
                Logger.Instance.Log.LogError(exception);
            }

            return false;
        }

        [ActionRoute(Path = "/moviedelete/get")]
        public async Task<Movie> Delete(int? id)
        {
            if (id == null)
            {
                return null;
            }

            return await _context.Movie.FirstOrDefaultAsync(m => m.Id == id);
        }

        [ActionRoute(Path = "/moviedelete/confirmed")]
        public async Task<bool> DeleteConfirmed(int id)
        {
            try
            {
                var movie = await _context.Movie.FindAsync(id);
                _context.Movie.Remove(movie);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception exception)
            {
                Logger.Instance.Log.LogError(exception);
            }

            return false;
        }
    }
}
