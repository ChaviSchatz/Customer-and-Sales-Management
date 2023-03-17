
    internal class UserOrderProfile : Profile
    {
    public UserOrderProfile()
    {
        CreateMap<UserOrder, UserOrderDTO>().ReverseMap();
    }
}

