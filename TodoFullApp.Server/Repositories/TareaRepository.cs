using TodoFullApp.Server.Data;
using TodoFullApp.Server.Models.Entities;
using TodoFullApp.Server.Repositories.Interfaces;

namespace TodoFullApp.Server.Repositories
{
  public class TareaRepository : ITareaRepository
  {
    private readonly TaskDbContext _context;

    public TareaRepository(TaskDbContext context)
    {
      _context = context;
    }


    public Tarea? GetOne(Guid id)
    {
      var tarea = _context.Tareas.Find(id);
      if (tarea == null) return null;
      return tarea;
    }

    public IEnumerable<Tarea> GetAll() => [.. _context.Tareas];

    public void Add(Tarea task)
    {
      _context.Tareas.Add(task);
      _context.SaveChanges();
    }

    public void UpdateTitle(Guid id, string title)
    {
      var tarea = GetOne(id);
      if (tarea == null) return;
      tarea.Titulo = title;
      _context.SaveChanges();
    }

    public void UpdateCategory(Guid id, string category)
    {
      var tarea = GetOne(id);
      if (tarea == null) return;
      tarea.Categoria = category;
      _context.SaveChanges();
    }

    public void ToggleTask(Guid id)
    {
      var tarea = GetOne(id);
      if (tarea == null) return;
      tarea.Completada = !tarea.Completada;
      _context.SaveChanges();
    }


    public void Delete(Guid id)
    {
      var tarea = GetOne(id);
      if (tarea == null) return;
      _context.Tareas.Remove(tarea);
      _context.SaveChanges();
    }
  }
}
