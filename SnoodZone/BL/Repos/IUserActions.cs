public interface IUserActions
{
    Task CreateNewUser(UserDTO user);
    Task<List<UserDTO>> GetAllUsers();
    public Task UpdateUser(UserDTO user);
    public Task<bool> UserAuthentication(string email, string password);
    public Task<UserDTO> GetUserByEmailAndPassword(string email, string password);
    Task<UserDTO> GetUserById(string id);

}