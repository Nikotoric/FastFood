using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FastFoodBackend.DB;
using FastFoodBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FastFoodBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ArtikliController : ControllerBase
    {

        AppDbContext _context;
        public ArtikliController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetArtikli()
        {
            var data =_context.Artikli.ToList();
            return Ok(data);
        }

        [HttpGet("id")]
        public IActionResult GetArtikli([FromRoute]int id)
        {
            var data = _context.Artikli.FirstOrDefault(o => o.ArtikalID ==  id);
            return Ok(data);
        }

        [HttpPost]
        public IActionResult PostArtikli([FromBody]Artikli artikal)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var rola = identity.Claims.ToList()[1].Value;
            if (rola == "user")
                return Forbid();

            _context.Artikli.Add(artikal);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public IActionResult PutArtikli([FromBody]Artikli artikal)
        {
            _context.Artikli.Update(artikal);
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("id")]
        public IActionResult DeleteArtikli([FromRoute]int id)
        {
            var data = _context.Artikli.FirstOrDefault(o => o.ArtikalID == id);
            _context.Artikli.Remove(data);
            _context.SaveChanges();
            return Ok();
        }
    }
}