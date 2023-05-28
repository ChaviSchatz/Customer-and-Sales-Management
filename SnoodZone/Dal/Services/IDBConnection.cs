public interface IDBConnection
{
    IMongoCollection<Admin> AdminsCollection { get; }
    string AdminsCollectionName { get; set; }
    MongoClient Client { get; }
    string DbName { get; }
    IMongoCollection<Item> InventoryCollection { get; }
    string InventoryCollectionName { get; set; }
    IMongoCollection<Order> OrdersCollection { get; }
    string OrdersCollectionName { get; }
    IMongoCollection<User> UsersCollection { get; }
    string UsersCollectionName { get; }

    string GetConnectionString(string dbName);
}