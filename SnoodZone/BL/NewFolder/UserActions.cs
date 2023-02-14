
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

    //public async Task<bool> CheckId(string id)
    //{
    //    var users = await _userService.GetUsersAsync();
    //    var result = users.Where(u => u.ObjId == id).FirstOrDefault();
    //    if (result == null)
    //    {
    //        return true;
    //    }
    //    return false;
    //}
}

