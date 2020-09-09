using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastFoodBackend.Model
{
    public class StavkeNarudzbe
    {

        public long StavkeNarudzbeID { get; set; }
        public long? NarudzbaID { get; set; }
        public int? ArtikalID { get; set; }
        public int? Kolicina { get; set; }
    }
}
