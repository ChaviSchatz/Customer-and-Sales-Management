
public class UserActions : IUserActions
{
    private readonly IUserService _userService;

    public UserActions(IUserService userService)
    {
        _userService = userService;
    }

    public Task CreateNewUser(User user)
    {
        return _userService.CreateUser(user);
    }

    public Task<List<User>> GetAllUsers()
    {
        return _userService.GetUsersAsync();
    }

    public Task UpdateUser(User user)///לשאול את המורה אם להחזיר ערך וכיצד לעשות זאת
    {
       return _userService.UpdateUser(user);
    }

    public async Task<bool> UserAuthentication(string email, string password)
    {
        var usersList = await _userService.GetUsersAsync();
        var result = usersList.Where(u => u.EmailAddress == email && u.Password== password).FirstOrDefault();
        if (result == null) return false;
        return true;
    }

    public async Task<User> GetUserByEmailAndPassword(string email, string password)
    {
        var usersList = await _userService.GetUsersAsync();
        var result = usersList
            .Where(u => u.EmailAddress == email && u.Password == password)
            .FirstOrDefault();
        if (result == null) return null;
        return result;
    }



}

