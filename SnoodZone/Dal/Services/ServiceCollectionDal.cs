
public static class ServiceCollectionDal
{
    public static void AddTestDal(this IServiceCollection services)
    {
        services.AddSingleton<IDBConnection, DBConnection>();
        services.AddSingleton<IUserService, UserService>();
        services.AddSingleton<IOrderService, OrderService>();
    }


}

