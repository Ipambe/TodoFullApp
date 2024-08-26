namespace TodoFullApp.Server.Models.Entities
{
  public class Tarea
  {
    public Guid Id { get; set; }
    public required string Titulo { get; set; }
    public required string Categoria { get; set; }
    public bool Completada { get; set; } = false;
    public Guid UsuarioId { get; set; }
  }
}
