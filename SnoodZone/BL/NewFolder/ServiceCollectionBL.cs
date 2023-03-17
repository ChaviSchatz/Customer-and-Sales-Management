public static class ServiceCollectionBL
    {
    public static void AddTestBL(this IServiceCollection services)
    {
        services.AddSingleton<IUserActions, UserActions>();
        services.AddAutoMapper(typeof(AddressProfile));
        services.AddAutoMapper(typeof(UserOrderProfile));
        services.AddAutoMapper(typeof(UserProfile));

        services.AddTestDal();
    }
}

