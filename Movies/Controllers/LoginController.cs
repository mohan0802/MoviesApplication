using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Movies.Controllers
{
    [Route("api/Login")]
    [Produces("application/json")]
    public class LoginController : Controller
    {
        [HttpPost("GetLoginToken/{emailId}/{password}")]
        public string GetLoginToken(string emailId, string password)
        {

            byte[] email = Encoding.UTF8.GetBytes(emailId);
            byte[] pwd = Encoding.UTF8.GetBytes(password);

            var randomNumber = new byte[email.Length + pwd.Length];

            string token = string.Empty;

            using (var rand = RandomNumberGenerator.Create())
            {
                rand.GetBytes(randomNumber);

                token = Convert.ToBase64String(randomNumber);
            }

            return token;

        }
    }
}
