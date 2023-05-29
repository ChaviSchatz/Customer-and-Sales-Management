using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using APILayer.Repository;
using Microsoft.AspNetCore.Identity;
using System;

public static class MyServiceAuthentication
    {
    public static void MyAddAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        //services.AddIdentity<IdentityUser, IdentityRole>(options => {
        //    options.Password.RequireUppercase = true; // on production add more secured options
        //    options.Password.RequireDigit = true;
        //    options.SignIn.RequireConfirmedEmail = true;
        //}).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
        services.AddAuthorization(options =>
        {
            options.AddPolicy("RequireAdministratorRole",
            policy => policy.RequireRole("Admin"));

            options.AddPolicy("RequireUserRole",
            policy => policy.RequireRole("User"));
        });

        services.AddAuthentication(x => {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o => {
            var Key = Encoding.UTF8.GetBytes(configuration["JWT:Key"]);
            o.SaveToken = true;
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false, // on production make it true
                ValidateAudience = false, // on production make it true
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["JWT:Issuer"],
                ValidAudience = configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Key),
                ClockSkew = TimeSpan.Zero
            };
            o.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context => {
                    if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                    {
                        context.Response.Headers.Add("IS-TOKEN-EXPIRED", "true");
                    }
                    return Task.CompletedTask;
                }
            };
        });

        //services.AddAuthentication(x =>
        //{
        //    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //}).AddJwtBearer(o =>
        //{
        //    var Key = Encoding.UTF8.GetBytes(configuration["JWT:Key"]);
        //    o.SaveToken = true;
        //    o.TokenValidationParameters = new TokenValidationParameters
        //    {
        //        ValidateIssuer = false,
        //        ValidateAudience = false,
        //        ValidateLifetime = true,
        //        ValidateIssuerSigningKey = true,
        //        ValidIssuer = configuration["JWT:Issuer"],
        //        ValidAudience = configuration["JWT:Audience"],
        //        IssuerSigningKey = new SymmetricSecurityKey(Key)
                
        //    };
        //});

        services.AddSingleton<IJWTManagerRepository, JWTManagerRepository>();
        ///
    }
}

