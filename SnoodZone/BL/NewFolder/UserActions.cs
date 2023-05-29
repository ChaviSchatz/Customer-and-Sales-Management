


public class UserActions : IUserActions
{
    private readonly IUserService _userService;

    private IMapper mapper;


    public UserActions(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        this.mapper = mapper;
    }

    public Task CreateNewUser(UserDTO user)
    { 
        User userForDal = mapper.Map<UserDTO, User>(user);
        return _userService.CreateUser(userForDal);
    }

    public async Task<List<UserDTO>> GetAllUsers()
    {
        List<User> results = await _userService.GetUsersAsync();
        List<UserDTO> users = new();
        foreach (User item in results)
        {
            users.Add(mapper.Map<User, UserDTO>(item));
        }
        return users;
    }

    public Task UpdateUser(UserDTO user)///לשאול את המורה אם להחזיר ערך וכיצד לעשות זאת
    {
        User userForDal = mapper.Map<UserDTO, User>(user);
        return _userService.UpdateUser(userForDal);
    }

    public async Task<bool> UserAuthentication(string email, string password)
    {
        var usersList = await _userService.GetUsersAsync();
        var result = usersList.Where(u => u.EmailAddress == email && u.Password == password).FirstOrDefault();
        if (result == null) return false;
        return true;
    }

    public async Task<UserDTO> GetUserByEmailAndPassword(string email, string password)
    {
        var usersList = await _userService.GetUsersAsync();
        var result = usersList
            .Where(u => u.EmailAddress == email && u.Password == password)
            .FirstOrDefault();
        if (((User)result).Id == null) return null;
        return mapper.Map<User, UserDTO>(result);
    }

    public async Task<UserDTO> GetUserById(string id)
    {
        User result = await _userService.GetUserById(id);
        if (result == null) return null;

        return mapper.Map<User, UserDTO>(result);
    }


}

