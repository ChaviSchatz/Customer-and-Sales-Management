namespace APILayer.Repository
{
    public interface IJWTManagerRepository
    {
        Tokens Authenticate(UserSimpleModel users);
    }
}
