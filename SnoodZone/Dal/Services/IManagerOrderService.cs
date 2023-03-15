
public interface IManagerOrderService
{
    Task CreateOrder(ManagerOrder order);
    Task<List<ManagerOrder>> GetNewOrdersAsync();
    Task<List<ManagerOrder>> GetOrdersByDatesAsync(DateTime from, DateTime to);
    Task<List<ManagerOrder>> GetOrdersByPriceAsync(double price);
    Task<List<ManagerOrder>> GetOrdersByUserAsync(string id);
    Task UpdateStatus(ManagerOrder order);
}