
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
    {
    private readonly IOrderActions _orderActions;
    public OrdersController(IOrderActions orderActions)
    {
        this._orderActions = orderActions;
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
}

