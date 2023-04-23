
    internal class SnoodProfile : Profile
{
    public SnoodProfile()
    {
        CreateMap<Snood, SnoodDTO>()
             .ForMember(s => s.ColorAmount,
                           option =>
                           option.MapFrom(src => src.ColorAmount))
            .ReverseMap();

    }
}

