using TodoFullApp.Server.Models.Entities;

namespace TodoFullApp.Server.Repositories.Interfaces
{
  public interface ITareaRepository
  {
    Tarea? GetOne(Guid id);
    IEnumerable<Tarea> GetAll();
    void Add(Tarea task);
    void UpdateTitle(Guid id, string title);
    void UpdateCategory(Guid id, string category);
    void ToggleTask(Guid id);
    void Delete(Guid id);
  }
}
