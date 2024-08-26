namespace TodoFullApp.Server.DTOs
{
  public class TareaDto
  {
    public Guid Id { get; set; }
    public required string Titulo { get; set; }
    public required string Categoria { get; set; }
    public bool Completada { get; set; } = false;
    public Guid UsuarioId { get; set; }
  }
}
