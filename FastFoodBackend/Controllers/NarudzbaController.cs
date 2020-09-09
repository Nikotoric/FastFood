using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FastFoodBackend.DB;
using FastFoodBackend.Dto;
using FastFoodBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FastFoodBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NarudzbaController : ControllerBase
    {
        AppDbContext _context;
        public NarudzbaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetNarudzba()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var rola = identity.Claims.ToList()[1].Value;
            if (rola == "user")
                return Forbid();

            var data = _context.Narudzba;
            return Ok(data);
        }

        [HttpGet("id")]
        public IActionResult GetNarudzba([FromRoute]int id)
        {
            var data = _context.Narudzba.FirstOrDefault(o => o.NarudzbaID == id);
            return Ok(data);
        }

        [HttpPost]
        public IActionResult PostNarudzba([FromBody]NarudzbaDto narudzba)
        {

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userId = identity.Claims.ToList()[0].Value;
            
            Narudzba nar = new Narudzba
            {
                KorisnikID = int.Parse(userId),
                brojNarudzbe = narudzba.brojNarudzbe,
                nacinIsporuke = narudzba.nacinIsporuke,
                nacinPlacanja = narudzba.nacinPlacanje,
                ukupanIznos = narudzba.ukupanIznos
            };

            _context.Narudzba.Add(nar);
            _context.SaveChanges();

            

            foreach(var stavka in narudzba.stavkeNarudzbe)
            {
                StavkeNarudzbe sn = new StavkeNarudzbe()
                {
                    ArtikalID = stavka.ArtikalID,
                    Kolicina = stavka.Kolicina,
                    NarudzbaID = nar.NarudzbaID
                };

                _context.StavkeNarudzbe.Add(sn);
                _context.SaveChanges();
            }

            
            return Ok();
        }

        [HttpPut]
        public IActionResult PutNarudzba([FromBody]Narudzba narudzba)
        {
            _context.Narudzba.Update(narudzba);
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("id")]
        public IActionResult DeleteNarudzba([FromRoute]int id)
        {
            var data = _context.Narudzba.FirstOrDefault(o => o.NarudzbaID == id);
            _context.Narudzba.Remove(data);
            _context.SaveChanges();
            return Ok();
        }
    }

}