using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using TodoFullApp.Server.Models.Entities;
using TodoFullApp.Server.Repositories;
using TodoFullApp.Server.Repositories.Interfaces;
using TodoFullApp.Server.Services.Interfaces;

namespace TodoFullApp.Server.Services
{
  public class UsuarioService : IUsuarioService
  {
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IHasherService _hasherService;

    public UsuarioService(IUsuarioRepository usuarioRepository,IHasherService hasherService)
    {
      _usuarioRepository = usuarioRepository;
      _hasherService = hasherService;
    }

    public void Register(string username, string password)
    {
      if (string.IsNullOrWhiteSpace(username)) throw new ArgumentException("El nombre de usuario no puede estar vacío.");
      if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("La contraseña no puede estar vacía.");

      var userExists = _usuarioRepository.GetByName(username);
      if (userExists != null) throw new InvalidOperationException("El usuario ya existe.");

      var passwordHash = _hasherService.PasswordHasher(password);

      var user = new Usuario
      {
        UserName = username,
        PasswordHash = passwordHash
      };

      _usuarioRepository.Add(user);
    }

    public Usuario GetById(Guid id)
    {
      return _usuarioRepository.GetById(id);
    }
  }
}
