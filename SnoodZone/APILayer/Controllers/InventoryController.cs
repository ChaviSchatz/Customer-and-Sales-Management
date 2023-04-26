
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
    private readonly IInventoryActions inventoryActions;
    public InventoryController(IInventoryActions inventoryActions)
    {
        this.inventoryActions = inventoryActions;
    }

    [HttpGet]
    [Route("all")]///חובה לשנות url!!!
    public async Task<List<ItemDTO>> GetInventory()
    {
        return await inventoryActions.GetInventory();
    }

    [HttpGet]
    public async Task<List<ItemDTO>> GetInventoryInStock()
    {
        return await inventoryActions.GetInventoryInStock();
    }

    [HttpPost]
    public async void Create(ItemDTO item)
    {
        await inventoryActions.CreateNewItem(item);
    }

    [HttpPut]
    public async void Update(ItemDTO item)
    {
        await inventoryActions.UpdateItem(item);
    }

    [HttpDelete]
    [Route("{id}")]
    public async void Delete(string id)
    {
        await inventoryActions.DeleteItem(id);
    }

}

