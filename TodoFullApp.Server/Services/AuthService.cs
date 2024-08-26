using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TodoFullApp.Server.Models.Entities;
using TodoFullApp.Server.Repositories.Interfaces;
using TodoFullApp.Server.Services.Interfaces;

namespace TodoFullApp.Server.Services
{
  public class AuthService : IAuthService
  {
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IHasherService _hasherService;
    private readonly IConfiguration _configuration;

    public AuthService(IUsuarioRepository usuarioRepository, IHasherService hasherService, IConfiguration configuration)
    {
      _usuarioRepository = usuarioRepository;
      _hasherService = hasherService;
      _configuration = configuration;
    }

    public string AuthenticateUser(string username, string password)
    {
      var usuario = _usuarioRepository.GetByName(username) ?? throw new UnauthorizedAccessException("El usuario no existe.");
      if (!_hasherService.CompareHashedToPlain(usuario.PasswordHash, password))
        throw new InvalidCredentialException("Contraseña incorrecta");
      return GenerateToken(usuario);
    }

    public string GenerateToken(Usuario user)
    {
      var userClaims = new[]
      {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.UserName)
      };

      var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));
      var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

      var jwtConfig = new JwtSecurityToken(
        claims: userClaims,
        expires: DateTime.UtcNow.AddHours(8),
        signingCredentials: credentials
      );

      return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
    }
  }
}
