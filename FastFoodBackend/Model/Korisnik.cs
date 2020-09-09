using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastFoodBackend.Model
{
    public class Korisnik
    {
        public int KorisnikID { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string fullname { get; set; }
        public string address { get; set; }
        public string role { get; set; }
    }
}
