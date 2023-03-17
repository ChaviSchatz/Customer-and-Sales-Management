
    internal class UserProfile : Profile
    {
    public UserProfile()
    {
        CreateMap<User, UserDTO>()
               .ForMember(u => u.Address,
                           option =>
                           option.MapFrom(src => new AddressProfile()))
               .ForMember(u => u.Orders,
                            option =>
                            option.MapFrom(src => new UserOrderProfile()));
      //.ReverseMap().ForMember(u => u.Address,
      //                     option =>
      //                     option.MapFrom(src => new AddressProfile()))
      //         .ForMember(u => u.Orders,
      //                      option =>
      //                      option.MapFrom(src => new UserOrderProfile()));
    }
}

