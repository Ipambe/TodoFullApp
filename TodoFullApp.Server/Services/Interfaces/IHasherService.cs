namespace TodoFullApp.Server.Services.Interfaces
{
  public interface IHasherService
  {
    string Sha256Encrypt(string text);
    string PasswordHasher(string password);
    bool CompareHashedToPlain(string hashedPassword, string password);
  }
}
