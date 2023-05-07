
public class OrderService : IOrderService
{
    private readonly IMongoCollection<Order> _orders;
    public OrderService(IDBConnection db)
    {
        _orders = db.OrdersCollection;
    }

    public async Task<List<Order>> GetAllOrdersAsync()
    {
        return await _orders.Find(_ => true).ToListAsync();
    }
    public async Task<List<Order>> GetOrdersByUserAsync(string id)
    {
        return await _orders.Find(o => o.UserId == id).ToListAsync();
    }
    public async Task<List<Order>> GetNewOrdersAsync()
    {
        return await _orders.Find(o => o.Status == false).ToListAsync();
    }
    public Task UpdateStatus(Order order)
    {
        var filter = Builders<Order>.Filter.Eq(o => o.Id, order.Id);
        return _orders.ReplaceOneAsync(filter, order);
    }
    public async Task<List<Order>> GetOrdersByDatesAsync(DateTime from, DateTime to)
    {
        return await _orders.Find(o => o.OrderDetails.Date.Date >= from.Date && o.OrderDetails.Date.Date <= to.Date).ToListAsync();
    }
    public async Task<List<Order>> GetOrdersByPriceAsync(double price)
    {
        List<Order> orders = await _orders.Find(o => o.OrderDetails.PriceAfterTax >= price).ToListAsync();
        orders.Sort((o1, o2) => o1.OrderDetails.Date.CompareTo(o2.OrderDetails.Date));
        return orders;
    }

    public Task CreateOrder(Order order)
    {
        Order orderWithMongoId = new Order()
        {
            UserId = order.UserId,
            OrderDetails = order.OrderDetails,
            Status = order.Status,
        };
        return _orders.InsertOneAsync(orderWithMongoId);
    }

    public Task UpdateOrder(Order order)
    {

        return _orders.ReplaceOneAsync(Builders<Order>.Filter.Eq(s => s.Id, order.Id), order);

    }

}
