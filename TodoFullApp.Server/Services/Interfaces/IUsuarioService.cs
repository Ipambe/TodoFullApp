using TodoFullApp.Server.Models.Entities;

namespace TodoFullApp.Server.Services.Interfaces
{
  public interface IUsuarioService
  {
    void Register(string username, string password);
    Usuario GetById(Guid id);
  }
}
