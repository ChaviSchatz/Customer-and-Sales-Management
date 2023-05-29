public interface ITokenService
{
    Task AddUserRefreshTokens(UserRefreshToken usersToken);
    Task DeleteUserRefreshTokens(string userId, string refreshToken);
    Task<UserRefreshToken> GetSavedRefreshTokens(string userId, string refreshToken);
}