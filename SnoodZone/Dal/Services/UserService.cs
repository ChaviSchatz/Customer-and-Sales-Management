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
       return _users.ReplaceOneAsync(Builders<User>.Filter.Eq(u => u.Id, user.Id), user);
    }

    public Task<User> GetUserById(string id)
    {
        return _users.Find(u => u.Id == id).FirstOrDefaultAsync();
    }
}

