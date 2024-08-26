namespace TodoFullApp.Server.Models.Entities
{
  public class Usuario
  {
    public Guid Id { get; set; }
    public required string UserName { get; set; }
    public required string PasswordHash { get; set; }
  }
}
