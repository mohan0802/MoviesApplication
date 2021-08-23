using Business.Abstraction.AbstractObjects;
using DataAccess.Abstraction.AbstractModels;
using DataAccess.Abstraction.Enums;
using DataAccess.Abstraction.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implementation.BusinessManager
{
    public class MovieManager : IMovieManager
    {
        IMovieRepository MovieRepository { get; set; }
        public static MovieManager Create(IMovieRepository movieRepository)
        {
            return new MovieManager(movieRepository);
        }

        public MovieManager(IMovieRepository movieRepository)
        {
            MovieRepository = movieRepository;
        }

        public async Task<ICollection<IMovie>> GetAllMovies()
        {
            try
            {
                return await MovieRepository.GetAllMovies().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
