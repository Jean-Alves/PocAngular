using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Threeo.Api.Interfaces;
using Threeo.Api.Models;
using Threeo.Api.Repository.Repo;
using Threeo.Api.ViewModels;

namespace Threeo.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : MainController
    {
        private readonly IConfiguration _configuration;
        public AuthController(INotification notification, IConfiguration configuration) : base(notification)
        {
            _configuration = configuration;
        }

        [HttpPost()]
        [Route("login")]
        public ActionResult<dynamic> Authenitcate([FromBody] LoginUserViewModel model)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            //somente como teste, o banco esta estatico
            var user = UserRepository.Get(model.Email, model.Password);

            if (user == null)
            {
                NotifyError("Usuário ou senha inválidos");
                return CustomResponse(model);
            }
            var token = GenerateToken(user);

            return CustomResponse(token);
        }
        [HttpGet]
        [Route("anonymous")]
        [AllowAnonymous]
        public string Anonymous() => "Anônimo";

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);

        [HttpGet]
        [Route("employee")]
        [Authorize(Roles = "employee,manager")]
        public string Employee() => "Funcionário";

        [HttpGet]
        [Route("manager")]
        [Authorize(Roles = "manager")]
        public IActionResult Manager()
        {
            return Ok(new { message = "gerente" });
        }

        private LoginResponseViewModel GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            //gera uma chave com base em um algoritmo simetrico
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
            //gera a assinatura digital do token usando o algoritmo Hmac e a chave privada
            var credenciais = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //define declarações do usuário
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
             };

            var issuer = _configuration["TokenConfiguration:Issuer"];
            var audience = _configuration["TokenConfiguration:audience"];
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = issuer,
                Audience = audience,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = credenciais,
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);


            return new LoginResponseViewModel
            {
                AccessToken = tokenHandler.WriteToken(token),
                ExpiresIn = TimeSpan.FromHours(8).TotalSeconds,
                UserToken = new UserTokenViewModel
                {
                    Id = user.Id,
                    Name = user.UserName,
                    Claims = claims.Select(c => new ClaimViewModel { Type = c.Type, Value = c.Value }),
                }
            };
        }

    }
}