
using Microsoft.AspNetCore.Identity;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
    {

    private readonly IUserActions _userActions;
    private readonly IJWTManagerRepository jWTManager;
    private readonly ITokenActions tokenActions;

    public UsersController(IUserActions userActions, IJWTManagerRepository jWTManager, ITokenActions tokenActions)
    {
        _userActions = userActions;
        this.jWTManager = jWTManager;
        this.tokenActions = tokenActions;
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("authenticate")]
    public async Task<IActionResult> AuthenticateAsync(AuthModel usersdata)
    {
        var validUser = await jWTManager.UserAuthenticate(usersdata);

        if (validUser == null)
        {
            return Unauthorized("Incorrect username or password!");
        }

        var token =  jWTManager.GenerateUserToken(validUser);

        if (token == null)
        {
            return Unauthorized("Invalid Attempt!");
        }

        // saving refresh token to the db
        UserRefreshTokenDTO obj = new UserRefreshTokenDTO
        {
            RefreshToken = token.RefreshToken,
            UserId = validUser.Id,
            Email = usersdata.Email,
        };

        await tokenActions.AddUserRefreshTokens(obj);
        return Ok(new { user = validUser, token = token });
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Refresh(Tokens token)
    {
        var principal = jWTManager.GetPrincipalFromExpiredToken(token.Token);
        var userId = principal.Claims.Where(c => c.Type == "mongoId").Single().Value;
        UserDTO user = await _userActions.GetUserById(userId);
        //retrieve the saved refresh token from database
        var savedRefreshToken = await tokenActions.GetSavedRefreshTokens(userId, token.RefreshToken);

        if (savedRefreshToken.RefreshToken != token.RefreshToken)
        {
            return Unauthorized("Invalid attempt!");
        }

        var newJwtToken = jWTManager.GenerateUserRefreshToken(user);

        if (newJwtToken == null)
        {
            return Unauthorized("Invalid attempt!");
        }

        // saving refresh token to the db
        UserRefreshTokenDTO obj = new UserRefreshTokenDTO
        {
            RefreshToken = newJwtToken.RefreshToken,
            UserId = user.Id,
            Email = user.EmailAddress,
        };

        await tokenActions.DeleteUserRefreshTokens(user.Id, token.RefreshToken);
        await tokenActions.AddUserRefreshTokens(obj);

        return Ok(newJwtToken);
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

