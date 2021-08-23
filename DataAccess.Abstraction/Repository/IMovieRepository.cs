using DataAccess.Abstraction.AbstractModels;
using DataAccess.Abstraction.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstraction.Repository
{
    public interface IMovieRepository
    {
        Task<ICollection<IMovie>> GetAllMovies();

    }
}
