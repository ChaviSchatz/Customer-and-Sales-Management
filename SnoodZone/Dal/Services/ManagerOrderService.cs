
public class ManagerOrderService : IManagerOrderService
{
    private readonly IMongoCollection<ManagerOrder> _orders;
    public ManagerOrderService(IDBConnection db)
    {
        _orders = db.OrdersCollection;
    }

    public async Task<List<ManagerOrder>> GetOrdersByUserAsync(string id)
    {
        return await _orders.Find(o => o.UserId == id).ToListAsync();
    }
    public async Task<List<ManagerOrder>> GetNewOrdersAsync()
    {
        return await _orders.Find(o => o.Status == false).ToListAsync();
    }
    public Task UpdateStatus(ManagerOrder order)
    {
        var filter = Builders<ManagerOrder>.Filter.Eq(o => o.Id, order.Id);
        return _orders.ReplaceOneAsync(filter, order);

    }
    public async Task<List<ManagerOrder>> GetOrdersByDatesAsync(DateTime from, DateTime to)
    {
        return await _orders.Find(o => o.Order.Date.Date >= from.Date && o.Order.Date.Date <= to.Date).ToListAsync();
    }
    public async Task<List<ManagerOrder>> GetOrdersByPriceAsync(double price)
    {
        List<ManagerOrder> orders = await _orders.Find(o => o.Order.PriceAfterTax >= price).ToListAsync();
        orders.Sort((o1, o2) => o1.Order.Date.CompareTo(o2.Order.Date));
        return orders;
    }

    public Task CreateOrder(ManagerOrder order)
    {
        ManagerOrder orderWithMongoId = new ManagerOrder()
        {
            UserId = order.UserId,
            Order = order.Order,
            Status = order.Status,
            StoreName = order.StoreName,
            UserName = order.UserName
        };
        return _orders.InsertOneAsync(orderWithMongoId);
    }

}
