
    internal class ItemProfile : Profile
    {
    public ItemProfile()
    {
        CreateMap<Item, ItemDTO>().ReverseMap();
    }
    }

