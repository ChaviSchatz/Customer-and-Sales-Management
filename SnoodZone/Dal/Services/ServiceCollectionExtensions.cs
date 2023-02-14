
using Microsoft.Extensions.DependencyInjection;
using System.ComponentModel.Design;

public static class ServiceCollectionExtensions
    {
    public static void AddTest(this IServiceCollection services)
    {
        services.AddSingleton<IDBConnection, DBConnection>();
        services.AddSingleton<IUserService, UserService>();
    }
}

