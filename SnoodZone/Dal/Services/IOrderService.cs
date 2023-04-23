
public interface IOrderService
{
    Task CreateOrder(Order order);
    Task<List<Order>> GetNewOrdersAsync();
    Task<List<Order>> GetOrdersByDatesAsync(DateTime from, DateTime to);
    Task<List<Order>> GetOrdersByPriceAsync(double price);
    Task<List<Order>> GetOrdersByUserAsync(string id);
    Task UpdateStatus(Order order);
    Task<List<Order>> GetAllOrdersAsync();
}