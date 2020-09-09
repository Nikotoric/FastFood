using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastFoodBackend.Model
{
    public class Narudzba
    {

        public long NarudzbaID { get; set; }

        public string brojNarudzbe { get; set; }

        public int? KorisnikID { get; set; }

        public string nacinPlacanja { get; set; }

        public string nacinIsporuke { get; set; }

        public decimal? ukupanIznos { get; set; }

    }
}
