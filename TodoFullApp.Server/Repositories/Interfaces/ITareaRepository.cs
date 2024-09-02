using TodoFullApp.Server.Models.Entities;

namespace TodoFullApp.Server.Repositories.Interfaces
{
  public interface ITareaRepository
  {
    Tarea? GetOne(Guid id);
    IEnumerable<Tarea> GetAll();
    void Add(Tarea task);
    void UpdateTitulo(Guid id, string titulo);
    void UpdateCategoria(Guid id, string categoria);
    void ToggleTask(Guid id);
    void Delete(Guid id);
  }
}
