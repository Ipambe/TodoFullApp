
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.IdentityModel.Tokens;
using TodoFullApp.Server.Data;
using TodoFullApp.Server.Repositories;
using TodoFullApp.Server.Repositories.Interfaces;
using TodoFullApp.Server.Services;
using TodoFullApp.Server.Services.Interfaces;

namespace TodoFullApp.Server
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      // Add services to the container.

      builder.Services.AddControllers();
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();

      builder.Services.AddDbContext<TaskDbContext>(options =>
      {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
      });

      builder.Services.AddScoped<ITareaRepository, TareaRepository>();
      builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
      builder.Services.AddScoped<IAuthService, AuthService>();
      builder.Services.AddScoped<IHasherService, HasherService>();
      builder.Services.AddScoped<IUsuarioService, UsuarioService>();
      builder.Services.AddScoped<ITareaService, TareaService>();

      builder.Services.AddAuthentication(config =>
      {
        config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      }).AddJwtBearer(config =>
      {
        config.RequireHttpsMetadata = false;
        config.SaveToken = true;
        config.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          ValidateIssuer = false,
          ValidateAudience = false,
          ValidateLifetime = true,
          ClockSkew = TimeSpan.Zero,
          IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]!)
          )
        };
        config.Events = new JwtBearerEvents
        {
          OnMessageReceived = context =>
          {
            var token = context.Request.Cookies["AuthToken"];
            if (!string.IsNullOrEmpty(token))
            {
              context.Token = token;
            }

            return Task.CompletedTask;
          }
        };
      });

      var app = builder.Build();

      app.UseDefaultFiles();
      app.UseStaticFiles();

      // Configure the HTTP request pipeline.
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseHttpsRedirection();

      app.UseAuthentication();
      app.UseAuthorization();


      app.MapControllers();

      app.MapFallbackToFile("/index.html");

      app.Run();
    }
  }
}
