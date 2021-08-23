using DataAccess.Abstraction.AbstractModels;
using DataAccess.Abstraction.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Json.Models
{
    [JsonObject(MemberSerialization.OptIn)]
    public class Movie: IMovie
    {
        [JsonProperty(PropertyName = "language")]
        [JsonConverter(typeof(StringEnumConverter))]
        public Language Language { get; set; }

        [JsonProperty(PropertyName = "location")]
        public string Location { get; set; }

        [JsonProperty(PropertyName = "plot")]
        public string Plot { get; set; }

        [JsonProperty(PropertyName = "poster")]
        public string Poster { get; set; }

        [JsonProperty(PropertyName = "soundEffects")]
        public string[] SoundEffects { get; set; }

        [JsonProperty(PropertyName = "stills")]
        public string[] Stills { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "imdbID")]
        public string imdbID { get; set; }

        [JsonProperty(PropertyName = "listingType")]
        [JsonConverter(typeof(StringEnumConverter))]
        public ListingType listingType { get; set; }

        [JsonProperty(PropertyName = "imdbRating")]
        public string imdbRating { get; set; }
    }
}
