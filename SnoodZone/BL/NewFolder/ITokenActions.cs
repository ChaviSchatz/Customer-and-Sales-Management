public interface ITokenActions
{
    Task AddUserRefreshTokens(UserRefreshTokenDTO usersToken);
    Task DeleteUserRefreshTokens(string id);
    Task<UserRefreshToken> GetSavedRefreshTokens(string id);
}