
public class InventoryActions : IInventoryActions
{
    private readonly IInventoryService itemService;

    private IMapper mapper;

    public InventoryActions(IInventoryService itemService, IMapper mapper)
    {
        this.itemService = itemService;
        this.mapper = mapper;
    }

    public Task CreateNewItem(ItemDTO item)
    {
        Item itemForDal = mapper.Map<ItemDTO, Item>(item);
        return itemService.CreateNewItem(itemForDal);
    }

    public async Task<List<ItemDTO>> GetInventoryInStock()
    {
        List<Item> results = await itemService.GetInventoryAsync();
        List<ItemDTO> inventory = new();
        foreach (Item item in results)
        {
            if (item.InStock)
            {
                inventory.Add(mapper.Map<Item, ItemDTO>(item));
            }
        }
        return inventory;
    }

    public async Task<List<ItemDTO>> GetInventory()
    {
        List<Item> results = await itemService.GetInventoryAsync();
        List<ItemDTO> inventory = new();
        foreach (Item item in results)
        {
            inventory.Add(mapper.Map<Item, ItemDTO>(item));
        }
        return inventory;
    }

    public Task UpdateItem(ItemDTO item)
    {
        Item itemForDal = mapper.Map<ItemDTO, Item>(item);
        return itemService.UpdateItem(itemForDal);
    }
    public Task DeleteItem(string id)///לשאול את המורה אם להחזיר ערך וכיצד לעשות זאת
    {
        return itemService.DeleteItem(id);
    }


}

