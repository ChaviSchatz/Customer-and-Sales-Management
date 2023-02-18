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

    public Task CreateUser(User user)//לזכור הצפנת סיסמה
    {
        return _users.InsertOneAsync(user);
    }

    public Task UpdateUser(User user)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Password , user.Password);
        return _users.ReplaceOneAsync(filter, user, options: new ReplaceOptions { IsUpsert = true });
    }

}

