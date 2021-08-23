using DataAccess.Abstraction.AbstractModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstraction.AbstractObjects
{
    public interface IMovieManager
    {
        Task<ICollection<IMovie>> GetAllMovies();
    }
}
