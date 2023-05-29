
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

    public Task DeleteUserRefreshTokens(string userId, string refreshToken)
    {
        return tokenService.DeleteUserRefreshTokens(userId, refreshToken);
    }

    public Task<UserRefreshToken> GetSavedRefreshTokens(string userId, string refreshToken)
    {
        return tokenService.GetSavedRefreshTokens(userId, refreshToken);
    }
}

