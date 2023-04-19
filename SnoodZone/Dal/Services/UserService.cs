public class UserService : IUserService
{
    private readonly IMongoCollection<User> _users;
    public UserService(IDBConnection db)
    {
        _users = db.UsersCollection;
    }
    public async Task<List<User>> GetUsersAsync()
    {
        return await _users.Find(_ => true).ToListAsync();
    }
    public Task CreateUser(User user)//לזכור הצפנת סיסמה
    {
        User userWithMongoId = new User() { Name = user.Name, Password = user.Password,
            Address = user.Address,EmailAddress = user.EmailAddress,
             PhoneNumber = user.PhoneNumber, StoreName = user.StoreName};
        return _users.InsertOneAsync(userWithMongoId);
    }

    public Task UpdateUser(User user)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Id , user.Id);
        _users.DeleteOneAsync(filter);
        return CreateUser(user);
    }

    /// <summary>
    /// insert new order to the user by his id,
    /// to the list of his orders.
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="newOrder"></param>
    /// <returns></returns>
    //public Task<UpdateResult> InsertNewOrder(string userId, UserOrder newOrder)
    //{
    //    var filter = Builders<User>.Filter.Where(u => u.Id == userId);
    //    var data = Builders<User>.Update.Push(f =>
    //    f.Orders, newOrder);
    //    return _users.UpdateOneAsync(filter, data);

    //}
}

