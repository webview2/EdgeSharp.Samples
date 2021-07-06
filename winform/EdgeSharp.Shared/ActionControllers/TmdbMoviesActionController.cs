using EdgeSharp.Core.Infrastructure;
using EdgeSharp.Core.Network;
using EdgeSharp.Shared.Models;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace EdgeSharp.Shared.ActionControllers
{
    [ActionController(Name = "TmdbMoviesActionController", Description = "Tmdb movies controller")]
    public class TmdbMoviesActionController : ActionController
    {
        private const string TmdbBaseUrl = "https://api.themoviedb.org/3/";
        private const string EdgeSharpTmdbApiKey = "4f457e870e91b76e02292d52a46fc445";

        private static string TmdbLatestUrl(string apiKey = EdgeSharpTmdbApiKey) => $"movie/latest?api_key={apiKey}&language=en-US";
        private static string TmdbPopularUrl(string apiKey = EdgeSharpTmdbApiKey) => $"movie/popular?api_key={apiKey}&language=en-US&page=1";
        private static string TmdbTopRatedUrl(string apiKey = EdgeSharpTmdbApiKey) => $"movie/top_rated?api_key={apiKey}&language=en-US&page=1";
        private static string TmdbNowPlayingUrl(string apiKey = EdgeSharpTmdbApiKey) => $"movie/now_playing?api_key={apiKey}&language=en-US&page=1";
        private static string TmdbUpcomingUrl(string apiKey = EdgeSharpTmdbApiKey) => $"movie/upcoming?api_key={apiKey}&language=en-US&page=1";
        private static string TmdbSearchUrl(string queryValue, string apiKey = EdgeSharpTmdbApiKey) => $"search/movie?api_key={apiKey}&query={queryValue}&language=en-US&page=1&include_adult=false";
        private static string TmdbGetMovieUrl(string movieId, string apiKey = EdgeSharpTmdbApiKey) => $"movie/{movieId}?api_key={apiKey}";

        [ActionRoute(Path = "/tmdbmovies")]
        public TmdMoviesModel GetMovies(string querytype, string searchquery)
        {
            if (string.IsNullOrWhiteSpace(querytype))
            {
                return new TmdMoviesModel(); 
            }

            if (querytype.Equals("search") && string.IsNullOrWhiteSpace(searchquery))
            {
                return new TmdMoviesModel(); 
            }

            var paramUrl = string.Empty;
            switch (querytype.ToLower())
            {
                case "latest":
                    paramUrl = TmdbLatestUrl();
                    break;
                case "popular":
                    paramUrl = TmdbPopularUrl();
                    break;
                case "toprated":
                    paramUrl = TmdbTopRatedUrl();
                    break;
                case "nowplaying":
                    paramUrl = TmdbNowPlayingUrl();
                    break;
                case "upcoming":
                    paramUrl = TmdbUpcomingUrl();
                    break;
                case "search":
                    paramUrl = TmdbSearchUrl(searchquery);
                    break;
            }

            var tmdbMoviesTask = Task.Run(() =>
            {
                return GetTmdbMovieListAsync(paramUrl);
            });

            tmdbMoviesTask.Wait();

            return tmdbMoviesTask.Result;
        }

        [ActionRoute(Path = "/tmdbmovies/homepage")]
        public void HomePage(string movieId)
        {
            if (string.IsNullOrWhiteSpace(movieId))
            {
                return;
            }

            var tmdbMovieTask = Task.Run(() =>
            {
                return GetTmdbMovieAsync(movieId);
            });

            tmdbMovieTask.Wait();

            var movie = tmdbMovieTask.Result;
            if (movie != null && !string.IsNullOrWhiteSpace(movie.homepage))
            {
                BrowserLauncher.Open(movie.homepage);
            }
        }

        private async Task<TmdMoviesModel> GetTmdbMovieListAsync(string paramUrl)
        {
            var baseAddress = new Uri(TmdbBaseUrl);
            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {
                try
                {
                    httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");

                    using (var response = await httpClient.GetAsync(paramUrl))
                    {
                        string responseData = await response.Content.ReadAsStringAsync();

                        var options = new JsonSerializerOptions();
                        options.ReadCommentHandling = JsonCommentHandling.Skip;
                        options.AllowTrailingCommas = true;

                        return JsonSerializer.Deserialize<TmdMoviesModel>(responseData, options);
                    }
                }
                catch (Exception exception)
                {
                    Logger.Instance.Log.LogError(exception);
                }

                return new TmdMoviesModel();
            }
        }

        private async Task<TmdMovie> GetTmdbMovieAsync(string movieId)
        {
            var baseAddress = new Uri(TmdbBaseUrl);
            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");

                using (var response = await httpClient.GetAsync(TmdbGetMovieUrl(movieId)))
                {
                    string responseData = await response.Content.ReadAsStringAsync();

                    var options = new JsonSerializerOptions();
                    options.ReadCommentHandling = JsonCommentHandling.Skip;
                    options.AllowTrailingCommas = true;

                    return JsonSerializer.Deserialize<TmdMovie>(responseData, options);
                }
            }
        }
    }
}
