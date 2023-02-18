public interface IUserActions
{
    Task CreateNewUser(User user);
    Task<List<User>> GetAllUsers();
    public Task UpdateUser(User user);
    public Task<bool> UserAuthentication(string email, string password);
    public Task<User> GetUserByEmailAndPassword(string email, string password);

}