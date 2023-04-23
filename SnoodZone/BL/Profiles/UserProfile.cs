
    internal class UserProfile : Profile
    {
    public UserProfile()
    {
        CreateMap<UserDTO , User>()
               .ForMember(u => u.Address,
                           option =>
                           option.MapFrom(src => src.Address))
        .ReverseMap();
    }
}

