using EdgeSharp.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace EdgeSharp.Shared.Data
{
    public class MovieContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=MvcMovie.db");

        public DbSet<Movie> Movie { get; set; }
    }
}
