
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
    {

    private readonly IUserActions _userActions;
    private readonly IJWTManagerRepository jWTManager;
    private readonly ITokenActions toknActions;

    public UsersController(IUserActions userActions, IJWTManagerRepository jWTManager, ITokenActions toknActions)
    {
        _userActions = userActions;
        this.jWTManager = jWTManager;
        this.toknActions = toknActions;
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("authenticate")]
    public async Task<IActionResult> AuthenticateAsync(AuthModel usersdata)
    {
        var validUserId = await jWTManager.UserAuthenticate(usersdata);

        if (validUserId == null)
        {
            return Unauthorized("Incorrect username or password!");
        }

        var token = await jWTManager.GenerateUserToken(usersdata);

        if (token == null)
        {
            return Unauthorized("Invalid Attempt!");
        }

        // saving refresh token to the db
        UserRefreshTokenDTO obj = new UserRefreshTokenDTO
        {
            RefreshToken = token.RefreshToken,
            UserId = validUserId,
            Email = usersdata.Email,
        };

        await toknActions.AddUserRefreshTokens(obj);
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

