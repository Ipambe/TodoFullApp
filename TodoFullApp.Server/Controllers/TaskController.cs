using System.Runtime.Versioning;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoFullApp.Server.DTOs;
using TodoFullApp.Server.Models.Entities;
using TodoFullApp.Server.Services.Interfaces;

namespace TodoFullApp.Server.Controllers
{
  [ApiController]
  [Authorize]
  [Route("api/[controller]")]
  public class TaskController : Controller
  {
    private readonly ITareaService _tareaService;

    public TaskController(ITareaService tareaService)
    {
      _tareaService = tareaService;
    }

    [HttpGet]
    public IActionResult Get()
    {
      var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      if (string.IsNullOrEmpty(userId)) return Unauthorized("Usuario no autenticado.");
      return Ok(_tareaService.GetAll(Guid.Parse(userId)));
    }

    [HttpPost]
    public IActionResult Create([FromBody] TareaCreateDto tareaDto)
    {
      if (tareaDto == null || string.IsNullOrWhiteSpace(tareaDto.Titulo))
        return BadRequest("Los datos de la tarea no son válidos.");

      var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

      var tarea = new Tarea
      {
        Titulo = tareaDto.Titulo,
        Categoria = tareaDto.Categoria,
        UsuarioId = Guid.Parse(userId!),
      };

      _tareaService.Add(tarea);
      return NoContent();
    }

    [HttpPut]
    [Route("titulo/{id}")]
    public IActionResult UpdateTitulo(Guid id, [FromBody] TareaUpdateDto payload)
    {
      _tareaService.UpdateTitulo(id, payload.Payload);
      return NoContent();
    }

    [HttpPut]
    [Route("categoria/{id}")]
    public IActionResult UpdateCategoria(Guid id, [FromBody] TareaUpdateDto payload)
    {
      _tareaService.UpdateCategoria(id, payload.Payload);
      return NoContent();
    }

    [HttpPut]
    [Route("complete/{id}")]
    public IActionResult ToggleTask(Guid id)
    {
      _tareaService.ToggleComplete(id);
      return NoContent();
    }

    [HttpDelete]
    [Route("{id}")]
    public IActionResult DeleteOne(Guid id)
    {
      try
      {
        _tareaService.DeleteOne(id);
        return NoContent();
      }
      catch (KeyNotFoundException)
      {
        return NotFound($"No se encontró una tarea con el ID: {id}.");
      }
      catch
      {
        return StatusCode(500, "Ocurrió un error al intentar eliminar la tarea.");
      }
    }

    [HttpDelete]
    public IActionResult DeleteMany([FromBody] IEnumerable<Guid> ids)
    {
      if (ids == null || !ids.Any())
      {
        return BadRequest("Debe proporcionar al menos un ID.");
      }

      try
      {
        _tareaService.DeleteMany(ids);
        return NoContent();
      }
      catch
      {
        return StatusCode(500, "Ocurrió un error al intentar eliminar las tareas.");
      }
    }
  }
}
