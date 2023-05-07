
public class OrderActions : IOrderActions
{
    public readonly double TAX = 0.17;

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
        int price = 0;
        int allAmount = 0;
        order.OrderDetails.Details.ForEach(o =>
        {
            int amount = 0;
            o.ColorAmount.ForEach(c =>
            {
                amount += c.Amount;
            });
            price += o.Price * amount;
            allAmount += amount;

        });
        order.OrderDetails.PriceBeforeTax = price;
        order.OrderDetails.AmountOfSnoods = allAmount;
        order.OrderDetails.PriceAfterTax = price + (price * TAX);
        Order orderForDal = mapper.Map<OrderDTO, Order>(order);
        return _OrderServices.CreateOrder(orderForDal);
    }

    public async Task<List<OrderDTO>> GetAllOrders()
    {
        List<Order> results = await _OrderServices.GetAllOrdersAsync();
        List<OrderDTO> orders = new();
        foreach (Order item in results)
        {
            orders.Add(mapper.Map<Order, OrderDTO>(item));
        }
        return orders;
    }

    public Task UpdateOrder(OrderDTO order)
    {

        Order orderForDal = mapper.Map<OrderDTO, Order>(order);
        int price = 0;
        int allAmount = 0;
        order.OrderDetails.Details.ForEach(o =>
        {
            int amount = 0;
            o.ColorAmount.ForEach(c =>
            {
                amount += c.Amount;
            });
            price += o.Price * amount;
            allAmount += amount;

        });
        order.OrderDetails.PriceBeforeTax = price;
        order.OrderDetails.AmountOfSnoods = allAmount;
        order.OrderDetails.PriceAfterTax = allAmount + allAmount * TAX;

        return _OrderServices.UpdateOrder(orderForDal);
    }

    public async Task<List<OrderDTO>> GetOrdersByDatesAsync(DateTime from, DateTime to)
    {
        List<Order> results = await _OrderServices.GetOrdersByDatesAsync(from, to);
        List<OrderDTO> orders = new();
        foreach (Order item in results)
        {
            orders.Add(mapper.Map<Order, OrderDTO>(item));
        }
        return orders;
    }
}

