public interface IInventoryActions
{
    Task CreateNewItem(ItemDTO item);
    Task DeleteItem(string id);
    Task<List<ItemDTO>> GetInventory();
    Task<List<ItemDTO>> GetInventoryInStock();
    Task UpdateItem(ItemDTO item);
}