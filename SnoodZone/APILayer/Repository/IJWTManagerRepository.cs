namespace APILayer.Repository
{
    public interface IJWTManagerRepository
    {
        Task<Tokens> Authenticate(UserSimpleModel users);
    }
}
