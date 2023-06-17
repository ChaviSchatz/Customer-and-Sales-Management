public interface IOrderActions
{
    Task CreateNewOrder(OrderDTO order);
    Task<List<OrderDTO>> GetOrdersByUserAsync(string id);
    Task<List<OrderDTO>> GetAllOrders();
    Task UpdateOrder(OrderDTO order);
    Task<List<OrderDTO>> GetOrdersByDatesAsync(DateTime from, DateTime to);

}