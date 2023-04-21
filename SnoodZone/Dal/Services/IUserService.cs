public interface IUserService
{
    Task CreateUser(User user);
    Task<List<User>> GetUsersAsync();
    Task UpdateUser(User user);
    Task<User> GetUserById(string id);
}