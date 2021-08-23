using DataAccess.Abstraction.Enums;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DataAccess.Abstraction.AbstractModels
{
    public interface IMovie
    {
        Language Language { get; set; }
        string Location { get; set; }
        string Plot { get; set; }
        string Poster { get; set; }
        string[] SoundEffects { get; set; }
        string[] Stills { get; set; }
        string Title { get; set; }
        string imdbID { get; set; }
        ListingType listingType { get; set; }
        string imdbRating { get; set; }
    }
}
