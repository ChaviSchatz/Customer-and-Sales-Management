public interface IInventoryService
{
    Task CreateNewItem(Item item);
    Task DeleteItem(string id);
    Task<List<Item>> GetInventoryAsync();
    Task UpdateItem(Item item);
}