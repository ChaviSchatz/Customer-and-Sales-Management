public interface IDBConnection
{
    IMongoCollection<Admin> AdminsCollection { get; }
    string AdminsCollectionName { get;}
    MongoClient Client { get; }
    string DbName { get; }
    IMongoCollection<Item> InventoryCollection { get; }
    string InventoryCollectionName { get; }
    IMongoCollection<Order> OrdersCollection { get; }
    string OrdersCollectionName { get; }
    IMongoCollection<User> UsersCollection { get; }
    string UsersCollectionName { get; }
    IMongoCollection<UserRefreshToken> TokensCollection { get;}
    string TokensCollectionName { get;}
    string GetConnectionString(string dbName);
}