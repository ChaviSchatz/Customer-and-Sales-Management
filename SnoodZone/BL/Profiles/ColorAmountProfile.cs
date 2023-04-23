
internal class ColorAmountProfile : Profile
{
	public ColorAmountProfile()
	{
        CreateMap<ColorAmount, ColorAmountDTO>().ReverseMap();
    }
}

