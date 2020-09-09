using FastFoodBackend.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastFoodBackend.DB
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext() : base() { }
        private readonly ILoggerFactory _loggerFactory;


        public AppDbContext(DbContextOptions<AppDbContext> options, ILoggerFactory loggerFactory)
            : base(options)
        {
            _loggerFactory = loggerFactory;
        }

        public DbSet<Korisnik> Korisnik { get; set; }

        public DbSet<Artikli> Artikli { get; set; }

        public DbSet<Narudzba> Narudzba { get; set; }
        public DbSet<StavkeNarudzbe> StavkeNarudzbe { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLoggerFactory(_loggerFactory);
        }

    }
}
