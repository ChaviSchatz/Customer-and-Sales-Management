
using Microsoft.Extensions.DependencyInjection;
using System.ComponentModel.Design;

public static class ServiceCollectionDal
    {
    public static void AddTestDal(this IServiceCollection services)
    {
        services.AddSingleton<IDBConnection, DBConnection>();
        services.AddSingleton<IUserService, UserService>();
    }
}

