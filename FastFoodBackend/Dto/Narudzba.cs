using FastFoodBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastFoodBackend.Dto
{
    public class NarudzbaDto
    {
            public List<StavkeNarudzbe> stavkeNarudzbe { get; set; }
            public string brojNarudzbe { get; set; }
            public string nacinPlacanje { get; set; }
            public string nacinIsporuke { get; set; }
            public decimal ukupanIznos { get; set; }
            public int userId { get; set; }


    }
}
