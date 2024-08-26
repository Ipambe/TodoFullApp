using System.Security.Cryptography;
using System.Text;
using TodoFullApp.Server.Services.Interfaces;

namespace TodoFullApp.Server.Services
{
  public class HasherService : IHasherService
  {
    private const int SaltSize = 128 / 8;
    private const int KeySize = 256 / 8;
    private const int Iterations = 10000;
    private static readonly HashAlgorithmName _hashAlgorithmName = HashAlgorithmName.SHA256;
    private const char Delimeter = ';';

    public string Sha256Encrypt(string text)
    {
      using (SHA256 sha256 = SHA256.Create())
      {
        byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(text));

        var builder = new StringBuilder();
        for (int i = 0; i < bytes.Length; i++)
        {
          builder.Append(bytes[i].ToString("x2"));
        }

        return builder.ToString();
      }
    }

    public string PasswordHasher(string password)
    {
      var salt = RandomNumberGenerator.GetBytes(SaltSize);
      var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, _hashAlgorithmName, KeySize);

      return string.Join(Delimeter, Convert.ToBase64String(salt), Convert.ToBase64String(hash));
    }

    public bool CompareHashedToPlain(string hashedPassword, string inputPassword)
    {
      var aux = hashedPassword.Split(Delimeter);
      var salt = Convert.FromBase64String(aux[0]);
      var hash = Convert.FromBase64String(aux[1]);

      var hashedInputPassword = Rfc2898DeriveBytes.Pbkdf2(inputPassword, salt, Iterations, _hashAlgorithmName, KeySize);

      return CryptographicOperations.FixedTimeEquals(hash, hashedInputPassword);
    }
  }
}
