
    public class DBConnection
    {
    private readonly IMongoDatabase _db;
    public string UsersCollectionName { get; private set; } = "users";
}

