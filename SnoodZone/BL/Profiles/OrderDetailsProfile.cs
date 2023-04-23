
    internal class OrderDetailsProfile : Profile
{
	public OrderDetailsProfile()
	{
        CreateMap<OrderDetails, OrderDetailsDTO>()
             .ForMember(orderDetail => orderDetail.Details,
                           option =>
                           option.MapFrom(src => src.Details))
            .ReverseMap();
    }
}

