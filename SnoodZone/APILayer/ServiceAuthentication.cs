using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using APILayer.Repository;
using Microsoft.AspNetCore.Identity;

public static class MyServiceAuthentication
    {
    public static void MyAddAuthentication(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddAuthorization(options =>
        {
            options.AddPolicy("RequireAdministratorRole",
            policy => policy.RequireRole("Admin"));

            options.AddPolicy("RequireUserRole",
            policy => policy.RequireRole("User"));
        });

        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            var Key = Encoding.UTF8.GetBytes(configuration["JWT:Key"]);
            o.SaveToken = true;
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["JWT:Issuer"],
                ValidAudience = configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Key)
                
            };
        });

        services.AddSingleton<IJWTManagerRepository, JWTManagerRepository>();
        ///
    }
}

