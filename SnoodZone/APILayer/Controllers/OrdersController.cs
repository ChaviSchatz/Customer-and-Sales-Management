using APILayer.Repository;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
    {
    private readonly IOrderActions _orderActions;
    private readonly IJWTManagerRepository jWTManager;

    public OrdersController(IOrderActions orderActions, IJWTManagerRepository jWTManager)
    {
        this._orderActions = orderActions;
        this.jWTManager = jWTManager;
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("authenticate")]
    public async Task<IActionResult> Authenticate(UserSimpleModel usersdata)
    {
        var token = await jWTManager.Authenticate(usersdata);

        if (token == null)
        {
            return Unauthorized();
        }

        return Ok(token);
    }

    [HttpPost]
    public async void Create(OrderDTO order)
    {
        await _orderActions.CreateNewOrder(order);
    }

    [HttpGet]
    public async Task<List<OrderDTO>> GetAllOrders()
    {
         return await _orderActions.GetAllOrders();
    }

    [HttpGet]
    [Route("search")]
    public async Task<List<OrderDTO>> GetAllOrders(DateTime from, DateTime to)
    {
        return await _orderActions.GetOrdersByDatesAsync(from, to);
    }

    [HttpGet]
    [Route("{userId}")]

    public async Task<List<OrderDTO>> GetUsersOrders(string userId)
    {
        return await _orderActions.GetOrdersByUserAsync(userId);
    }

    [HttpPut]
    public async void Update(OrderDTO order)
    {
        await _orderActions.UpdateOrder(order);
    }
}

