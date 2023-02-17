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

    //public async Task<User> GetUserById(string id)
    //{
    //    var result = await _users.FindAsync(u => u.Id == id) ;///change!!!!
    //    return result.FirstOrDefault();
    //}

    public Task CreateUser(User user)
    {
        return _users.InsertOneAsync(user);
    }

    public Task UpdateUser(User user)
    {
        var filter = Builders<User>.Filter.Eq(field: "Id", user.Id);
        return _users.ReplaceOneAsync(filter, user, options: new ReplaceOptions { IsUpsert = true });
    }

}

