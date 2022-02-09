using System.Collections.Generic;
using Threeo.Api.ViewModels;

namespace Threeo.Api.DB
{
    public class MockDB
    {

    static List<RegisterUserViewModel> listUser = new List<RegisterUserViewModel>();


        public void Add(RegisterUserViewModel register)
        {
            listUser.Add(register);
        }
    }

}