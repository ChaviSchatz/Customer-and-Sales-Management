public interface IAdminService
{
    Task CreateAdmin(Admin admin);
    Task UpdateAdmin(Admin admin);
    Task<Admin> GetAdminById(string id);
    Task<List<Admin>> GetAdminsAsync();
}