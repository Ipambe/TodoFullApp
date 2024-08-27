using System.Security.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoFullApp.Server.DTOs;
using TodoFullApp.Server.Services.Interfaces;

namespace TodoFullApp.Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly IUsuarioService _usuarioService;
    private readonly IAuthService _authService;

    public AuthController(IUsuarioService usuarioService, IAuthService authService)
    {
      _usuarioService = usuarioService;
      _authService = authService;
    }

    [HttpPost]
    [Route("register")]
    public IActionResult Register([FromBody] UsuarioDto user)
    {
      try
      {
        _usuarioService.Register(user.Username, user.Password);
        return Ok(new { message = "Usuario registrado exitosamente" });
      }
      catch (ArgumentException ex)
      {
        return BadRequest(new { error = ex.Message });
      }
      catch (InvalidOperationException ex)
      {
        return Conflict(new { error = ex.Message });
      }
      catch
      {
        return StatusCode(500, new { error = "Ocurrió un error inesperado." });
      }
    }

    [HttpPost]
    [Route("login")]
    public IActionResult Login([FromBody] UsuarioDto user)
    {
      try
      {
        var token = _authService.AuthenticateUser(user.Username, user.Password);
        var expirationTime = DateTime.UtcNow.AddHours(8);
        var cookieOptions = new CookieOptions
        {
          HttpOnly = true,
          Secure = true,
          SameSite = SameSiteMode.Strict,
          Expires = expirationTime
        };

        HttpContext.Response.Cookies.Append("AuthToken", token, cookieOptions);

        return NoContent();
      }
      catch (UnauthorizedAccessException ex)
      {
        return NotFound(new { error = ex.Message });
      }
      catch (InvalidCredentialException ex)
      {
        return Unauthorized(new { error = ex.Message });
      }
      catch (ArgumentException ex)
      {
        return BadRequest(new { error = ex.Message });
      }
      catch
      {
        return StatusCode(500, new { error = "Ocurrió un error inesperado." });
      }
    }

    [HttpPost]
    [Route("logout")]
    public IActionResult Logout()
    {
      try
      {
        HttpContext.Response.Cookies.Delete("AuthToken");
        return NoContent();
      }
      catch
      {
        return StatusCode(500, new { error = "Ocurrió un error inesperado durante el logout." });
      }
    }

    [HttpGet]
    [Route("verify")]
    public IActionResult Verify()
    {
      var isAuthenticated = HttpContext.User.Identity?.IsAuthenticated;
      if (isAuthenticated == null || isAuthenticated == false) return Unauthorized();
      return Ok();
    }
  }
}
