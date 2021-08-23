using DataAccess.Abstraction.AbstractModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Json.Models
{
    public class MovieList
    {
        public ICollection<Movie> Movies { get; set; }
    }

}
