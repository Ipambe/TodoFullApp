using TodoFullApp.Server.Data;
using TodoFullApp.Server.Models.Entities;
using TodoFullApp.Server.Repositories.Interfaces;

namespace TodoFullApp.Server.Repositories
{
  public class UsuarioRepository : IUsuarioRepository
  {
    private readonly TaskDbContext _context;

    public UsuarioRepository(TaskDbContext context)
    {
      _context = context;
    }

    public Usuario? GetByName(string userName)
    {
      return _context.Usuarios
                 .FirstOrDefault(u => u.UserName == userName);
    }

    public void Add(Usuario user)
    {
      _context.Usuarios.Add(user);
      _context.SaveChanges();
    }

    public void Update(Usuario user)
    {
      if (user == null)
      {
        throw new ArgumentNullException(nameof(user), "El usuario no puede ser nulo.");
      }

      var existingUser = _context.Usuarios.Find(user.Id);

      if (existingUser == null)
      {
        throw new KeyNotFoundException("Usuario no encontrado.");
      }

      existingUser.UserName = user.UserName;
      existingUser.PasswordHash = user.PasswordHash;

      _context.SaveChanges();
    }

    public void Delete(Guid id)
    {
      var existingUser = _context.Usuarios.Find(id);

      if (existingUser == null)
      {
        throw new KeyNotFoundException("Usuario no encontrado.");
      }
      _context.Usuarios.Remove(existingUser);

      _context.SaveChanges();
    }

    public Usuario GetById(Guid id)
    {
      return _context.Usuarios.Find(id) ?? throw new KeyNotFoundException("Usuario no encontrado.");
    }
  }
}
