namespace APILayer.Repository
{
    public interface IJWTManagerRepository
    {
        Task<bool> AdminAuthenticate(AuthModel adminData);
        Task<Tokens> GenerateAdminRefreshToken(AuthModel adminsData);
        Task<Tokens> GenerateAdminToken(AuthModel adminsData);
        Task<Tokens> GenerateJWTAdminTokens(AuthModel adminsData);
        Task<Tokens> GenerateJWTUserTokens(AuthModel usersData);
        string GenerateStringRefreshToken();
        Task<Tokens> GenerateUserRefreshToken(AuthModel usersData);
        Task<Tokens> GenerateUserToken(AuthModel usersData);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
        Task<bool> UserAuthenticate(AuthModel users);
    }
}