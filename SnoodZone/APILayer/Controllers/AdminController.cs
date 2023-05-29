

using Microsoft.AspNetCore.Identity;

namespace APILayer.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IJWTManagerRepository jWTManager;
        private readonly IAdminActions adminActions;

        private readonly ITokenActions tokenActions;

        public AdminController(IJWTManagerRepository jWTManager, IAdminActions adminActions, ITokenActions tokenActions)
        {
            this.jWTManager = jWTManager;
            this.adminActions = adminActions;
            this.tokenActions = tokenActions;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> AuthenticateAsync(AuthModel admindata)
        {
            var validAdmin = await jWTManager.AdminAuthenticate(admindata);

            if (validAdmin == null)
            {
                return Unauthorized("Incorrect username or password!");
            }

            var token = jWTManager.GenerateAdminToken(validAdmin);

            if (token == null)
            {
                return Unauthorized("Invalid Attempt!");
            }

            // saving refresh token to the db
            UserRefreshTokenDTO obj = new UserRefreshTokenDTO
            {
                RefreshToken = token.RefreshToken,
                UserId = validAdmin.Id,
                Email = admindata.Email,
            };

            await tokenActions.AddUserRefreshTokens(obj);
            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh(Tokens token)
        {
            var principal = jWTManager.GetPrincipalFromExpiredToken(token.Token);
            var adminId = principal.Claims.Where(c => c.Type == "mongoId").Single().Value;
            AdminDTO admin = await adminActions.GetAdminById(adminId);
            //retrieve the saved refresh token from database
            var savedRefreshToken = await tokenActions.GetSavedRefreshTokens(adminId, token.RefreshToken);

            if (savedRefreshToken.RefreshToken != token.RefreshToken)
            {
                return Unauthorized("Invalid attempt!");
            }

            var newJwtToken = jWTManager.GenerateAdminRefreshToken(admin);

            if (newJwtToken == null)
            {
                return Unauthorized("Invalid attempt!");
            }

            // saving refresh token to the db
            UserRefreshTokenDTO obj = new UserRefreshTokenDTO
            {
                RefreshToken = newJwtToken.RefreshToken,
                UserId = admin.Id,
                Email = admin.EmailAddress,
            };

            await tokenActions.DeleteUserRefreshTokens(admin.Id, token.RefreshToken);
            await tokenActions.AddUserRefreshTokens(obj);

            return Ok(newJwtToken);
        }

        [AllowAnonymous]
        [HttpPost]
        public async void Create(AdminDTO admin)
        {
            await adminActions.CreateNewAdmin(admin);
        }
    }
}
