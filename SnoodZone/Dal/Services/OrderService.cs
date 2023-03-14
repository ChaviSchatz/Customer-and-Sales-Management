
    public class OrderService
    {
    private readonly IMongoCollection<Order> _orders;
    public OrderService(IDBConnection db)
    {
        _orders = db.OrdersCollection;
    }

    public async Task<List<Order>> GetOrdersByUserAsync(string id)
    {
        return await _orders.Where(o => o.UserId == id).ToListAsync();
    }
}
