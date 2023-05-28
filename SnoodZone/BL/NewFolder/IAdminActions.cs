public interface IAdminActions
{
    Task CreateNewAdmin(AdminDTO admin);
    Task<AdminDTO> GetAdminByEmailAndPassword(string email, string password);
    Task<AdminDTO> GetAdminById(string id);
    Task UpdateAdmin(AdminDTO admin);
}