public interface ITokenService
{
    Task AddUserRefreshTokens(UserRefreshToken usersToken);
    Task DeleteUserRefreshTokens(string id);
    Task<UserRefreshToken> GetSavedRefreshTokens(string id);
}