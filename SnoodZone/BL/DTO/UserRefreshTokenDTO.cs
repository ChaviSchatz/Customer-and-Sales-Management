
    public class UserRefreshTokenDTO
    {
    public string Id { get; set; }
    public string UserId { get; set; }
    public string Email { get; set; }
    public string RefreshToken { get; set; }
    public bool IsActive { get; set; } = true;
}

