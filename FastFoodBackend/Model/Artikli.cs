using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FastFoodBackend.Model
{
    public class Artikli
    {
        [Key]
        public int ArtikalID { get; set; }

        public string imeArtikla { get; set; }

        public Nullable<decimal> cijena { get; set; }

        public Nullable<int> tipArtikla { get; set; }


    }
}
