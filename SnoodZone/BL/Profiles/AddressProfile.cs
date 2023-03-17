
    internal class AddressProfile : Profile
    {
    public AddressProfile()
    {
        CreateMap<Address, AddressDTO>().ReverseMap();
    }
}

