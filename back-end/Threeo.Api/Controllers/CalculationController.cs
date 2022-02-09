using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Threeo.Api.Interfaces;
using Threeo.Api.ViewModels;

namespace Threeo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculationController : MainController
    {
        public CalculationController(INotification notification):base(notification)
        
        {

        }
        [HttpPost()]
        [Route("operations")]
        [Authorize(Roles = "manager")]
        public ActionResult<dynamic> operations([FromBody] OperationViewModel model)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);
            var result = 0;
            switch (model.Operation)
            {
                case 1:
                    {
                        result = model.Number1 + model.Number2;
                        break;
                    }
                case 2:
                    {
                        result = model.Number1 - model.Number2;
                        break;
                    }
                case 3:
                    {
                        result = model.Number1 * model.Number2;
                        break;
                    }
                case 4:
                    {
                        result = model.Number1 / model.Number2;
                        break;
                    }
            }

            return CustomResponse(result);
        }
    }
}