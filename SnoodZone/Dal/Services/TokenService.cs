
public class TokenService : ITokenService
{
    private readonly IMongoCollection<UserRefreshToken> tokens;
    public TokenService(IDBConnection db)
    {
        tokens = db.TokensCollection;
    }
    public Task AddUserRefreshTokens(UserRefreshToken usersToken)
    {
        return tokens.InsertOneAsync(usersToken);
    }

    public Task DeleteUserRefreshTokens(string userId, string refreshToken)
    {
        var f1 = Builders<UserRefreshToken>.Filter.Eq(t => t.Id, userId);
        var f2 = Builders<UserRefreshToken>.Filter.Eq(t => t.RefreshToken, refreshToken);
        return tokens.DeleteOneAsync(f1 & f2);
    }

    public Task<UserRefreshToken> GetSavedRefreshTokens(string userId, string refreshToken)
    {
        return tokens.Find(a => a.UserId == userId && a.RefreshToken == refreshToken).FirstOrDefaultAsync();
    }
}

