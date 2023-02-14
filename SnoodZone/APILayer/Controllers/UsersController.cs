
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
    {

    private readonly IUserActions _userActions;
    public UsersController(IUserActions userActions)
    {
        _userActions = userActions;
    }

    [HttpPost]
    public async void Create(User user)
    {
        await _userActions.CreateNewUser(user);
    } 
    

    }

