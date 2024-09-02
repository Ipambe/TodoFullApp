using TodoFullApp.Server.DTOs;
using TodoFullApp.Server.Models.Entities;
using TodoFullApp.Server.Repositories.Interfaces;
using TodoFullApp.Server.Services.Interfaces;

namespace TodoFullApp.Server.Services
{
  public class TareaService : ITareaService
  {
    private readonly ITareaRepository _tareaRepository;

    public TareaService(ITareaRepository tareaRepository)
    {
      _tareaRepository = tareaRepository;
    }

    public IEnumerable<TareaDto> GetAll(Guid id)
    {
      if (id == Guid.Empty)
        throw new ArgumentException("El ID de usuario no puede estar vacío.", nameof(id));

      var tareas = _tareaRepository.GetAll();
      return tareas
        .Where(tarea => tarea.UsuarioId == id)
        .Select(tarea => new TareaDto
        {
          Id = tarea.Id,
          Titulo = tarea.Titulo,
          Categoria = tarea.Categoria,
          Completada = tarea.Completada,
          UsuarioId = tarea.UsuarioId
        });
    }

    public void Add(Tarea tarea)
    {
      _tareaRepository.Add(tarea);
    }

    public void UpdateTitulo(Guid id, string titulo)
    {
      _tareaRepository.UpdateTitulo(id, titulo);
    }

    public void UpdateCategoria(Guid id, string categoria)
    {
      _tareaRepository.UpdateCategoria(id, categoria);
    }

    public void ToggleComplete(Guid id)
    {
      _tareaRepository.ToggleTask(id);
    }


    public void DeleteOne(Guid id)
    {
      _tareaRepository.Delete(id);
    }

    public void DeleteMany(IEnumerable<Guid> ids)
    {
      foreach (var guidId in ids)
      {
        _tareaRepository.Delete(guidId);
      }
    }
  }
}
