
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

    public Task DeleteUserRefreshTokens(string id)
    {
        return tokens.DeleteOneAsync(Builders<UserRefreshToken>.Filter.Eq(t => t.Id, id));
    }

    public Task<UserRefreshToken> GetSavedRefreshTokens(string id)
    {
        return tokens.Find(a => a.Id == id).FirstOrDefaultAsync();
    }
}

