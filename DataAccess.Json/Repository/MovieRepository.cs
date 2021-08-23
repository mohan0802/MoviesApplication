using DataAccess.Abstraction.AbstractModels;
using DataAccess.Abstraction.Enums;
using DataAccess.Abstraction.Repository;
using DataAccess.Json.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Json.Repository
{
    public class MovieRepository : IMovieRepository
    {
        Dictionary<string, MovieList> moviesCache = new Dictionary<string, MovieList>();
        public static MovieRepository Create()
        {
            return new MovieRepository();
        }
        public MovieRepository()
        {
            
        }

        public async Task<ICollection<IMovie>> GetAllMovies()
        {
            MovieList movieList = new MovieList();
            ICollection<IMovie> movies = new List<IMovie>();

            try
            {
                movieList = JsonConvert.DeserializeObject<MovieList>(Read("movies.json", "Resources"));
                moviesCache.Add("cache", movieList);
                if (movieList.Movies.Count > 0)
                {
                    foreach (IMovie movie in movieList.Movies)
                    {
                        movies.Add(movie);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return movies;
        }

        private string Read(string fileName, string location)
        {
            Directory.SetCurrentDirectory(AppDomain.CurrentDomain.BaseDirectory);
            String Root = Directory.GetCurrentDirectory();
            string directory = Directory.GetParent(Root).Parent.Parent.Parent.FullName;// Directory.GetParent(Environment.CurrentDirectory).FullName;

            string filePath = Path.Combine(directory, "DataAccess.Json", location, fileName);

            string result;

            using (StreamReader streamReader = new StreamReader(filePath))
            {
                result = streamReader.ReadToEnd();
            }
            return result;
        }
    }
}
