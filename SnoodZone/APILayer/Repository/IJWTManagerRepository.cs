namespace APILayer.Repository
{
    public interface IJWTManagerRepository
    {
        Task<AdminDTO> AdminAuthenticate(AuthModel adminData);
        Tokens GenerateAdminRefreshToken(AdminDTO adminsData);
        Tokens GenerateAdminToken(AdminDTO adminsData);
        Tokens GenerateJWTAdminTokens(AdminDTO admin);
        Tokens GenerateJWTUserTokens(UserDTO user);
        string GenerateStringRefreshToken();
        Tokens GenerateUserRefreshToken(UserDTO usersData);
        Tokens GenerateUserToken(UserDTO usersData);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
        Task<UserDTO> UserAuthenticate(AuthModel users);
    }
}