


public class UserActions : IUserActions
{
    private readonly IUserService _userService;

    private IMapper iMapperFromUserDTOToUser;
    private IMapper iMapperFromUserToUserDTO;

    public UserActions(IUserService userService)
    {
        _userService = userService;

        var configFromUserDTOToUser = new MapperConfiguration(cfg => {
            cfg.CreateMap<UserDTO, User>();
        });
        iMapperFromUserDTOToUser = configFromUserDTOToUser.CreateMapper();

        var configFromUserToUserDTO = new MapperConfiguration(cfg => {
            cfg.CreateMap<User, UserDTO>();
        });
        iMapperFromUserToUserDTO = configFromUserToUserDTO.CreateMapper();
    }

    public Task CreateNewUser(UserDTO user)
    { 
        User userForDal = iMapperFromUserDTOToUser.Map<UserDTO, User>(user);
        return _userService.CreateUser(userForDal);
    }

    public async Task<List<UserDTO>> GetAllUsers()
    {
        List<User> results = await _userService.GetUsersAsync();
        List<UserDTO> users = new();
        foreach (User item in results)
        {
            users.Add(iMapperFromUserToUserDTO.Map<User, UserDTO>(item));
        }
        return users;
    }

    public Task UpdateUser(UserDTO user)///לשאול את המורה אם להחזיר ערך וכיצד לעשות זאת
    {
        User userForDal = iMapperFromUserDTOToUser.Map<UserDTO, User>(user);
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
        if (result == null) return null;

        return iMapperFromUserToUserDTO.Map<User, UserDTO>(result);
    }

    public async Task<UpdateResult> InsertNewOrderToUsersOrdersList(string userId, UserOrderDTO newOrder)
    {
        UserOrder orderForDal = iMapperFromUserDTOToUser.Map<UserOrderDTO, UserOrder>(newOrder);
        return await _userService.InsertNewOrder(userId, orderForDal);
    }


}

