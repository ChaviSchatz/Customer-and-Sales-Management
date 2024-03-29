﻿public static class ServiceCollectionBL
{
    public static void AddTestBL(this IServiceCollection services)
    {
        services.AddSingleton<IUserActions, UserActions>();
        services.AddSingleton<IOrderActions, OrderActions>();
        services.AddSingleton<IInventoryActions, InventoryActions>();
        services.AddSingleton<IAdminActions, AdminActions>();
        services.AddSingleton<ITokenActions, TokenActions>();

        services.AddAutoMapper(typeof(AddressProfile),
                               typeof(OrderProfile),
                               typeof(OrderDetailsProfile),
                               typeof(SnoodProfile),
                               typeof(UserProfile),
                               typeof(ColorAmountProfile),
                               typeof(ItemProfile),
                               typeof(AdminProfile),
                               typeof(TokenProfile));

        services.AddTestDal();
    }
}

