
using MongoDB.Bson.IO;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Dynamic;
using System.Text.Json;

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

    [Route("{userId}")]//לשנות את ה url חובה!!!!!
    [HttpGet]
    public async Task<UserDTO> GetUserById(string userId)
    {
        return await _userActions.GetUserById(userId);
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

    [Route("-")]//לשנות את ה url חובה!!!!!
    [HttpPost]
    public async Task<UserDTO> GetUserByEmailAndPassword(UserSimpleModel user)
    {
        return await _userActions.GetUserByEmailAndPassword(user.Email, user.Password);
    }

    

}

