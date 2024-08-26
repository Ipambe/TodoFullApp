using TodoFullApp.Server.DTOs;
using TodoFullApp.Server.Models.Entities;

namespace TodoFullApp.Server.Services.Interfaces
{
  public interface ITareaService
  {
    IEnumerable<TareaDto> GetAll(Guid id);
    void Add(Tarea tarea);
    void UpdateTitle(Guid id, string title);
    void UpdateCategory(Guid id, string category);
    void ToggleComplete(Guid id);
    void DeleteOne(Guid id);
    void DeleteMany(IEnumerable<Guid> ids);
  }
}
