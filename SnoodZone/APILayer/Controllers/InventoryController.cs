using Microsoft.AspNetCore.Authorization;

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
    private readonly IInventoryActions inventoryActions;
    public InventoryController(IInventoryActions inventoryActions)
    {
        this.inventoryActions = inventoryActions;
    }

    //[HttpGet]
    //[Route("all")]///חובה לשנות url!!!
    //public async Task<List<ItemDTO>> GetInventory()
    //{
    //    return await inventoryActions.GetInventory();
    //}

    [HttpGet]
    public async Task<List<ItemDTO>> GetInventoryInStock()
    {
        return await inventoryActions.GetInventoryInStock();
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async void Create(ItemDTO item)
    {
        await inventoryActions.CreateNewItem(item);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async void Update(ItemDTO item)
    {
        await inventoryActions.UpdateItem(item);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [Route("{id}")]
    public async void Delete(string id)
    {
        await inventoryActions.DeleteItem(id);
    }

}

