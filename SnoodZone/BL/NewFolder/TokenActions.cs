
public class TokenActions : ITokenActions
{
    private readonly ITokenService tokenService;

    private IMapper mapper;

    public TokenActions(ITokenService tokenService, IMapper mapper)
    {
        this.tokenService = tokenService;
        this.mapper = mapper;
    }

    public Task AddUserRefreshTokens(UserRefreshTokenDTO usersToken)
    {
        UserRefreshToken usersTokenForDal = mapper.Map<UserRefreshTokenDTO, UserRefreshToken>(usersToken);
        return tokenService.AddUserRefreshTokens(usersTokenForDal);
    }

    public Task DeleteUserRefreshTokens(string id)
    {
        return tokenService.DeleteUserRefreshTokens(id);
    }

    public Task<UserRefreshToken> GetSavedRefreshTokens(string id)
    {
        return tokenService.GetSavedRefreshTokens(id);
    }
}

