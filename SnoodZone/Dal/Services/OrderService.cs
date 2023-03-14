
    public class OrderService
    {
    private readonly IMongoCollection<Order> _orders;
    public OrderService(IDBConnection db)
    {
        _orders = db.OrdersCollection;
    }

    public async Task<List<Order>> GetOrdersByUserAsync(string id)
    {
        return await _orders.Find(o => o.UserId == id).ToListAsync();
    }
    //public Task CreateUser(User user)//לזכור הצפנת סיסמה
    //{
    //    User userWithMongoId = new User()
    //    {
    //        Name = user.Name,
    //        Password = user.Password,
    //        Address = user.Address,
    //        EmailAddress = user.EmailAddress,
    //        Orders = user.Orders,
    //        PhoneNumber = user.PhoneNumber,
    //        StoreName = user.StoreName
    //    };
    //    return _users.InsertOneAsync(userWithMongoId);
    //}

}
