using TodoFullApp.Server.Models.Entities;

namespace TodoFullApp.Server.Repositories.Interfaces
{
  public interface IUsuarioRepository
  {
    Usuario? GetByName(string userName);
    void Add(Usuario user);
    void Update(Usuario user);
    void Delete(Guid id);
    Usuario GetById(Guid id);
  }
}
