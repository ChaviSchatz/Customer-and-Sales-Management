
    internal class OrderProfile : Profile
    {
    public OrderProfile()
    {
        CreateMap<Order, OrderDTO>()
             .ForMember(o => o.OrderDetails,
                           option =>
                           option.MapFrom(src => src.OrderDetails))
            .ReverseMap();
    }
}

