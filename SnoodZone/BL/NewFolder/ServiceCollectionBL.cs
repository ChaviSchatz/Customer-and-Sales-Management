public static class ServiceCollectionBL
{
    public static void AddTestBL(this IServiceCollection services)
    {
        services.AddSingleton<IUserActions, UserActions>();
        services.AddSingleton<IOrderActions, OrderActions>();

        services.AddAutoMapper(typeof(AddressProfile),
                               typeof(OrderProfile),
                               typeof(OrderDetailsProfile),
                               typeof(SnoodProfile),
                               typeof(UserProfile),
                               typeof(ColorAmountProfile));

        services.AddTestDal();
    }
}

