
public class DBConnection : IDBConnection
{
    private readonly IMongoDatabase _db;

    ///פה נוסיף כל פעם עוד אוספים
    public string UsersCollectionName { get; private set; } = "users";

    public string DbName { get; private set; }
    public MongoClient Client { get; private set; }

    public IMongoCollection<User> UsersCollection { get; private set; }

    public DBConnection()
    {
        Client = new MongoClient("mongodb://localhost:27017");
        DbName = "SnoodZone";
        _db = Client.GetDatabase(DbName);

        UsersCollection = _db.GetCollection<User>(UsersCollectionName);
    }
}

