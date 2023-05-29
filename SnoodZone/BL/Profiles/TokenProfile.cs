
    public class TokenProfile : Profile
    {
    public TokenProfile()
    {
        CreateMap<UserRefreshToken, UserRefreshTokenDTO>().ReverseMap();
    }
}

