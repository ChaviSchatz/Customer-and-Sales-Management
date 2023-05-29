public interface ITokenActions
{
    Task AddUserRefreshTokens(UserRefreshTokenDTO usersToken);
    Task DeleteUserRefreshTokens(string userId, string refreshToken);
    Task<UserRefreshToken> GetSavedRefreshTokens(string userId, string refreshToken);
}