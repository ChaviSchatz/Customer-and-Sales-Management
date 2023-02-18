
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
    {

    private readonly IUserActions _userActions;
    public UsersController(IUserActions userActions)
    {
        _userActions = userActions;
    }

    [HttpGet]
    public async Task<List<User>> GetAllUsers()
    {
        return await _userActions.GetAllUsers();
    }
    [HttpPost]
    public async void Create(User user)
    {
        await _userActions.CreateNewUser(user);
    }

    [HttpPut]
    public async void UpdateUser(User user)
    {
        await _userActions.UpdateUser(user);
    }

    [Route("/login")]
    [HttpGet]
    public async Task<bool> GetUserAuthentication(string email, string password)
    {
       return await _userActions.UserAuthentication(email, password);
    }

    [Route("/userDetails")]
    [HttpGet]
    public async Task<User> GetUserByEmailAndPassword(string email, string password)
    {
        return await _userActions.GetUserByEmailAndPassword(email, password);
    }

    }

