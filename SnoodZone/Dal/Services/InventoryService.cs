
public class InventoryService : IInventoryService
{
    private readonly IMongoCollection<Item> inventory;
    public InventoryService(IDBConnection db)
    {
        inventory = db.InventoryCollection;
    }

    public async Task<List<Item>> GetInventoryAsync()
    {
        return await inventory.Find(_ => true).ToListAsync();
    }
    public Task CreateNewItem(Item item)
    {
        Item itemWithMongoId = new Item() { Code = item.Code,
        Colors = item.Colors, Description = item.Description, 
            InStock = item.InStock, Price = item.Price
        };
        return inventory.InsertOneAsync(itemWithMongoId);
    }

    public Task UpdateItem(Item item)
    {
        return inventory.ReplaceOneAsync(Builders<Item>.Filter.Eq(s => s.Id, item.Id), item);
    }
    public Task DeleteItem(string id)
    {
        return inventory.DeleteOneAsync(Builders<Item>.Filter.Eq(s => s.Id, id));
    }
}

