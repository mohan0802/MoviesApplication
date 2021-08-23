using Business.Abstraction.AbstractObjects;
using DataAccess.Abstraction.AbstractModels;
using DataAccess.Abstraction.Enums;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Movies.Controllers
{
    [Produces("application/json")]
    [Route("api/Movies")]
    public class MovieController : Controller
    {
        IMovieManager MovieManager { get; set; }
        public MovieController(IMovieManager movieManager)
        {
            MovieManager = movieManager;
        }

        [HttpGet("[action]")]
        public async Task<ICollection<IMovie>> GetAllMovies()
        {
            try
            {
                // event started logs
                return await MovieManager.GetAllMovies().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                //we can log error
                throw ex;
            }
            finally
            {
                // event completed logs
            }
        }

    }
}
