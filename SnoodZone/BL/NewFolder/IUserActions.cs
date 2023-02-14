public interface IUserActions
{
    Task CreateNewUser(User user);
    Task<List<User>> GetAllUsers();
}