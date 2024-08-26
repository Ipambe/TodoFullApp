using TodoFullApp.Server.Models.Entities;

namespace TodoFullApp.Server.Services.Interfaces
{
  public interface IAuthService
  {
    string AuthenticateUser(string username, string password);
    string GenerateToken(Usuario user);
  }
}
