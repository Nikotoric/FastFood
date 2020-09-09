using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FastFoodBackend.DB;
using FastFoodBackend.Dto;
using FastFoodBackend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FastFoodBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KorisnikController : ControllerBase
    {
        AppDbContext _context;
        public KorisnikController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
          
            return Ok();
        }


        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] Korisnik korinik)
        {
            if(_context.Korisnik.FirstOrDefault(o=>o.username == korinik.username) != null)
                return Forbid() ;
            korinik.role = "user";
            _context.Korisnik.Add(korinik);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {

            var user = _context.Korisnik.FirstOrDefault(o => o.username == dto.Username && o.password == dto.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            var claims = new List<Claim>();
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.KorisnikID.ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.role));

            var siningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecurityKey"));


           

            var token = new JwtSecurityToken(
                issuer: "http://oec.com",
                audience: "http://oec.com",
                expires: DateTime.UtcNow.AddMinutes(10),
                claims: claims,
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(siningKey, SecurityAlgorithms.HmacSha256)
                );

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token),role = user.role });
            
        }
    }
}