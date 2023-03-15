
using MongoDB.Driver;

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
    public async Task<List<UserDTO>> GetAllUsers()
    {
        return await _userActions.GetAllUsers();
    }

    [HttpPost]
    public async void Create(UserDTO user)
    {
        await _userActions.CreateNewUser(user);
    }

    [HttpPut]
    public async void UpdateUser(UserDTO user)
    {
        await _userActions.UpdateUser(user);
    }

    //[Route("/login")]
    //[HttpGet]
    //public async Task<bool> GetUserAuthentication(string email, string password)
    //{
    //   return await _userActions.UserAuthentication(email, password);
    //}

    [Route("/userDetails")]//לשנות את ה url חובה!!!!!
    [HttpGet]
    public async Task<UserDTO> GetUserByEmailAndPassword(string email, string password)
    {
        return await _userActions.GetUserByEmailAndPassword(email, password);
    }

    [Route("/order")]
    [HttpPut]
    public async Task<UpdateResult> AddOrder(string id, UserOrderDTO newOrder)
    {
        return await _userActions.InsertNewOrderToUsersOrdersList(id, newOrder);
    }

}

