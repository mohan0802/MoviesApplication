using DataAccess.Abstraction.AbstractModels;
using DataAccess.Abstraction.Enums;
using DataAccess.Abstraction.Repository;
using DataAccess.Json.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataAccess.Json.Tests
{
    [TestClass]
    public class Movie_DevTests
    {
        public IMovieRepository movieRepository;

        public Movie_DevTests()
        {
            Setup();
        }

        private void Setup()
        {
            movieRepository = MovieRepository.Create();
        }

        [TestMethod]
        public async Task GetAllMovies_Result_NotNull()
        {
            #region Arrange
            ICollection<IMovie> movies = new List<IMovie>();
            #endregion Arrange

            #region Act
            movies = await movieRepository.GetAllMovies().ConfigureAwait(false);
            #endregion Act

            #region Assert
            Assert.IsNotNull(movies);
            #endregion Assert

        }

        [TestMethod]
        public async Task GetAllMovies_Result_NotEmpty()
        {
            #region Arrange
            ICollection<IMovie> movies = new List<IMovie>();
            #endregion Arrange

            #region Act
            movies = await movieRepository.GetAllMovies().ConfigureAwait(false);
            #endregion Act

            #region Assert
            Assert.IsTrue(movies.Count > 0);
            #endregion Assert

        }

    }
}
