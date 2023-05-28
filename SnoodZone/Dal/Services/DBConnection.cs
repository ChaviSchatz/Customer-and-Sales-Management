
using Microsoft.Extensions.Configuration;

public class DBConnection : IDBConnection
{
    private readonly IMongoDatabase _db;

    ///פה נוסיף כל פעם עוד אוספים
    public string UsersCollectionName { get; private set; } = "users";
    public string OrdersCollectionName { get; private set; } = "orders";
    public string InventoryCollectionName { get; set; } = "inventory";
    public string AdminsCollectionName { get; set; } = "Admins";

    public string DbName { get; private set; }

    private IConfiguration _config;

    public MongoClient Client { get; private set; }

    public IMongoCollection<User> UsersCollection { get; private set; }
    public IMongoCollection<Order> OrdersCollection { get; private set; }
    public IMongoCollection<Item> InventoryCollection { get; private set; }
    public IMongoCollection<Admin> AdminsCollection { get; private set; }


    public DBConnection(IConfiguration config)
    {
        _config = config;
        Client = new MongoClient(GetConnectionString("MongoDB"));
        DbName = "SnoodZone";
        _db = Client.GetDatabase(DbName);

        UsersCollection = _db.GetCollection<User>(UsersCollectionName);
        OrdersCollection = _db.GetCollection<Order>(OrdersCollectionName);
        InventoryCollection = _db.GetCollection<Item>(InventoryCollectionName);
        AdminsCollection = _db.GetCollection<Admin>(AdminsCollectionName);
    }
    public string GetConnectionString(string dbName)
    {
        return _config.GetConnectionString(dbName);
    }
}

