using Microsoft.IdentityModel.Tokens;
using System.ComponentModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APILayer.Repository
{
    public class JWTManagerRepository : IJWTManagerRepository
    {
        private readonly IConfiguration iconfiguration;
        private readonly IUserActions userActions;
        private readonly IAdminActions adminActions;


        public JWTManagerRepository(IConfiguration iconfiguration, IUserActions userActions, IAdminActions adminActions)
        {
            this.iconfiguration = iconfiguration;
            this.userActions = userActions;
            this.adminActions = adminActions;
        }
        public async Task<Tokens> UserAuthenticate(AuthModel users)
        {
            UserDTO user = await userActions.GetUserByEmailAndPassword(users.Email, users.Password);
            if(user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
                new Claim("mongoId", user.Id),
                new Claim(ClaimTypes.Email, users.Email),
                new Claim(ClaimTypes.Role, "User"),
              }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Tokens { Token = tokenHandler.WriteToken(token) };
        }
        public async Task<Tokens> AdminAuthenticate(AuthModel adminData)
        {
            AdminDTO admin = await adminActions.GetAdminByEmailAndPassword(adminData.Email, adminData.Password);
            if (admin == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
                new Claim("mongoId", admin.Id),
                new Claim(ClaimTypes.Email, admin.EmailAddress),
                new Claim(ClaimTypes.Role, "Admin"),
              }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Tokens { Token = tokenHandler.WriteToken(token) };
        }

    }
}
