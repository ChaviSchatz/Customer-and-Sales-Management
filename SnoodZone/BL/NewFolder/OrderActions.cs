
public class OrderActions : IOrderActions
{
    private readonly IOrderService _OrderServices;

    private IMapper mapper;

    public OrderActions(IOrderService _OrderServices, IMapper mapper)
    {
        this._OrderServices = _OrderServices;
        this.mapper = mapper;
    }

    public async Task<List<OrderDTO>> GetOrdersByUserAsync(string id)
    {
        List<Order> results = await _OrderServices.GetOrdersByUserAsync(id);

        List<OrderDTO> orders = new();
        foreach (Order item in results)
        {
            orders.Add(mapper.Map<Order, OrderDTO>(item));
        }
        return orders;
    }

    public Task CreateNewOrder(OrderDTO order)
    {
        Order orderForDal = mapper.Map<OrderDTO, Order>(order);
        return _OrderServices.CreateOrder(orderForDal);
    }

    public async Task<List<OrderDTO>> GetAllOrders()
    {
        DateTime now = DateTime.Now;
        List<Order> results = await _OrderServices
            .GetOrdersByDatesAsync(now.AddMonths(-3), now);
        List<OrderDTO> orders = new();
        foreach (Order item in results)
        {
            orders.Add(mapper.Map<Order, OrderDTO>(item));
        }
        return orders;
    }
}

