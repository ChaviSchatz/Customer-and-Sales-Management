public class UserService
    {
    private readonly IMongoCollection<User> _users;
    public UserService(Ioption<DBSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(
            DatabaseSettings.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            DatabaseSettings.DatabaseName);

        _users = mongoDatabase.GetCollection<User>(
            DatabaseSettings.UsersCollectionName);
    }

    public async Task<List<User>> GetUsersAsync()
    {
        return await _users.Find(_ => true).ToListAsync();
    }

}

