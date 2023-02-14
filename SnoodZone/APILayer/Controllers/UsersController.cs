
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
    

    }

