using Microsoft.EntityFrameworkCore;
namespace EKNM_Bottleshelf.Models
{
    public class ContextBH : DbContext
    {
        public DbSet<Liquid> Liquids { get; set; }
        public DbSet<Dry> Dries { get; set; }
        public DbSet<Cocktail> Cocktails { get; set; }
        public void ApplicationContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=bottleshelf;Username=postgres;Password=24121999");
        }
    }
}
