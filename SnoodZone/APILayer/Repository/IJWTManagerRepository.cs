namespace APILayer.Repository
{
    public interface IJWTManagerRepository
    {
        Task<Tokens> UserAuthenticate(AuthModel users);
        Task<Tokens> AdminAuthenticate(AuthModel users);
    }
}
