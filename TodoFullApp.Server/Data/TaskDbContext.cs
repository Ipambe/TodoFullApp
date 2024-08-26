using Microsoft.EntityFrameworkCore;
using TodoFullApp.Server.Models.Entities;

namespace TodoFullApp.Server.Data
{
  public class TaskDbContext : DbContext
  {
    public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
    {
    }

    public DbSet<Tarea> Tareas { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Tarea>()
          .HasOne<Usuario>()
          .WithMany()
          .HasForeignKey(t => t.UsuarioId)
          .OnDelete(DeleteBehavior.Cascade);

      base.OnModelCreating(modelBuilder);
    }

  }
}
