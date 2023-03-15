﻿public interface IDBConnection
{
    MongoClient Client { get; }
    string DbName { get; }
    IMongoCollection<User> UsersCollection { get; }
    string UsersCollectionName { get; }
    IMongoCollection<ManagerOrder> OrdersCollection { get; }
    string OrdersCollectionName { get; }
}