
public class AdminService : IAdminService
{
    private readonly IMongoCollection<Admin> admins;
    public AdminService(IDBConnection db)
    {
        admins = db.AdminsCollection;
    }

    public Task CreateAdmin(Admin admin)
    {
        admin.Id = null;
        return admins.InsertOneAsync(admin);
    }

    public Task UpdateAdmin(Admin admin)
    {
        return admins.ReplaceOneAsync(Builders<Admin>.Filter.Eq(u => u.Id, admin.Id), admin);
    }

    public Task<Admin> GetAdminById(string id)
    {
        return admins.Find(a => a.Id == id).FirstOrDefaultAsync();
    }
    public async Task<List<Admin>> GetAdminsAsync()
    {
        return await admins.Find(_ => true).ToListAsync();
    }
}

