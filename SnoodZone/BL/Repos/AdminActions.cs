
public class AdminActions : IAdminActions
{
    private readonly IAdminService adminService;

    private IMapper mapper;

    public AdminActions(IAdminService adminService, IMapper mapper)
    {
        this.adminService = adminService;
        this.mapper = mapper;
    }

    public Task CreateNewAdmin(AdminDTO admin)
    {
        Admin adminForDal = mapper.Map<AdminDTO, Admin>(admin);
        return adminService.CreateAdmin(adminForDal);
    }
    public Task UpdateAdmin(AdminDTO admin)
    {
        Admin adminForDal = mapper.Map<AdminDTO, Admin>(admin);
        return adminService.UpdateAdmin(adminForDal);
    }

    public async Task<AdminDTO> GetAdminByEmailAndPassword(string email, string password)
    {
        var adminsList = await adminService.GetAdminsAsync();
        var result = adminsList
            .Where(u => u.EmailAddress == email && u.Password == password)
            .FirstOrDefault();
        if (result == null) return null;

        return mapper.Map<Admin, AdminDTO>(result);
    }

    public async Task<AdminDTO> GetAdminById(string id)
    {
        Admin result = await adminService.GetAdminById(id);
        if (result == null) return null;

        return mapper.Map<Admin, AdminDTO>(result);
    }
}

