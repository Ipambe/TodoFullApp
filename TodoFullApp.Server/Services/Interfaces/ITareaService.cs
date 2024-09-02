using TodoFullApp.Server.DTOs;
using TodoFullApp.Server.Models.Entities;

namespace TodoFullApp.Server.Services.Interfaces
{
  public interface ITareaService
  {
    IEnumerable<TareaDto> GetAll(Guid id);
    void Add(Tarea tarea);
    void UpdateTitulo(Guid id, string titulo);
    void UpdateCategoria(Guid id, string categoria);
    void ToggleComplete(Guid id);
    void DeleteOne(Guid id);
    void DeleteMany(IEnumerable<Guid> ids);
  }
}
