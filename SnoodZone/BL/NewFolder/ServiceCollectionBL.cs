


public static class ServiceCollectionBL
    {
    public static void AddTestBL(this IServiceCollection services)
    {
        services.AddSingleton<IUserActions, UserActions>();
        
    }
}

