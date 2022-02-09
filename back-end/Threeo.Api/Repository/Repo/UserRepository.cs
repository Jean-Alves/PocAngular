using System;
using System.Collections.Generic;
using System.Linq;
using Threeo.Api.Models;

namespace Threeo.Api.Repository.Repo
{
    public static class UserRepository
    {
       public static  User Get(string email,string password)
        {
            var users = new List<User>
            {
                new (){Id = 1,UserName="THREEO",Password="threeo",Role ="manager",Email = "threeo@threeo.com"},
                new (){Id = 1,UserName="eduardo",Password="threeo",Role ="employee",Email="eduardo@threeo.com"}
            };

            return users
                .FirstOrDefault(x => x.Email.ToLower() == email.ToLower() && x.Password == password);
        }

       
    }
}
