using APILayer.Repository;
using Microsoft.AspNetCore.Authorization;

namespace APILayer.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IJWTManagerRepository jWTManager;
        private readonly IAdminActions adminActions;

        public AdminController(IJWTManagerRepository jWTManager, IAdminActions adminActions)
        {
            this.jWTManager = jWTManager;
            this.adminActions = adminActions;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> Authenticate(AuthModel admindata)
        {
            var token = await jWTManager.AdminAuthenticate(admindata);

            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost]
        public async void Create(AdminDTO admin)
        {
            await adminActions.CreateNewAdmin(admin);
        }
    }
}
