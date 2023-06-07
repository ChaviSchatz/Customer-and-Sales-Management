

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
    {
    private readonly IOrderActions _orderActions;

    public OrdersController(IOrderActions orderActions)
    {
        this._orderActions = orderActions;
    }

    [Authorize(Roles = "User")]
    [HttpPost]
    public async void Create(OrderDTO order)
    {
        await _orderActions.CreateNewOrder(order);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<List<OrderDTO>> GetAllOrders(DateTime from, DateTime to)
    {
        DateTime dt = new DateTime();
        if (from != dt && to != dt)
        {
            return await _orderActions.GetOrdersByDatesAsync(from, to);
        }
        return await _orderActions.GetAllOrders();
    }


    [Authorize(Roles = "Admin, User")]
    [HttpGet]
    [Route("{userId}")]
    public async Task<List<OrderDTO>> GetUsersOrders(string userId)
    {
        return await _orderActions.GetOrdersByUserAsync(userId);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async void Update(OrderDTO order)
    {
        await _orderActions.UpdateOrder(order);
    }
}

