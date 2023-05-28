
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
    {

    private readonly IUserActions _userActions;
    private readonly IJWTManagerRepository jWTManager;

    public UsersController(IUserActions userActions, IJWTManagerRepository jWTManager)
    {
        _userActions = userActions;
        this.jWTManager = jWTManager;
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("authenticate")]
    public async Task<IActionResult> Authenticate(AuthModel usersdata)
    {
        var token = await jWTManager.UserAuthenticate(usersdata);

        if (token == null)
        {
            return Unauthorized();
        }
        return Ok(token);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<List<UserDTO>> GetAllUsers()
    {
        return await _userActions.GetAllUsers();
    }

    [Authorize(Roles = "Admin, User")]
    [Route("{mongoId}")]
    [HttpGet]
    public async Task<UserDTO> GetUserById(string mongoId)
    {
        //ClaimsPrincipal principal = new ClaimsPrincipal();
        //var mongoId = principal.Claims.Where(c => c.Type == "mongoId").Single().Value;
        return await _userActions.GetUserById(mongoId);
    }

    [AllowAnonymous]
    [HttpPost]
    public async void Create(UserDTO user)
    {
        await _userActions.CreateNewUser(user);
    }

    [Authorize(Roles = "User")]
    [HttpPut]
    public async void UpdateUser(UserDTO user)
    {
        await _userActions.UpdateUser(user);
    }
}

