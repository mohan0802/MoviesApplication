using System.Collections.Generic;

namespace DataAccess.Abstraction.AbstractModels
{
    public interface IMovieList
    {
        ICollection<IMovie> Movies { get; set; }
    }
}