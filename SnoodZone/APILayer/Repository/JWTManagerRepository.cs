using Microsoft.IdentityModel.Tokens;
using System.ComponentModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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
        public async Task<bool> UserAuthenticate(AuthModel users)
        {
            UserDTO user = await userActions.GetUserByEmailAndPassword(users.Email, users.Password);
            if (user == null)
            {
                return false;
            }
            return true;
            //var tokenHandler = new JwtSecurityTokenHandler();
            //var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new Claim[]
            //  {
            //    new Claim("mongoId", user.Id),
            //    new Claim(ClaimTypes.Email, users.Email),
            //    new Claim(ClaimTypes.Role, "User"),
            //  }),
            //    Expires = DateTime.UtcNow.AddMinutes(1),
            //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            //};
            //var token = tokenHandler.CreateToken(tokenDescriptor);
            //return new Tokens { Token = tokenHandler.WriteToken(token) };
        }
        public async Task<bool> AdminAuthenticate(AuthModel adminData)
        {
            AdminDTO admin = await adminActions.GetAdminByEmailAndPassword(adminData.Email, adminData.Password);
            if (admin == null)
            {
                return false;
            }
            return true;
            //var tokenHandler = new JwtSecurityTokenHandler();
            //var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new Claim[]
            //  {
            //    new Claim("mongoId", admin.Id),
            //    new Claim(ClaimTypes.Email, admin.EmailAddress),
            //    new Claim(ClaimTypes.Role, "Admin"),
            //  }),
            //    Expires = DateTime.UtcNow.AddMinutes(15),
            //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            //};
            //var token = tokenHandler.CreateToken(tokenDescriptor);
            //return new Tokens { Token = tokenHandler.WriteToken(token) };
        }

        public Task<Tokens> GenerateUserToken(AuthModel usersData)
        {
            return GenerateJWTUserTokens(usersData);
        }

        public async Task<Tokens> GenerateJWTUserTokens(AuthModel usersData)
        {
            try
            {
                UserDTO user = await userActions.GetUserByEmailAndPassword(usersData.Email, usersData.Password);

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                  {
                    new Claim("mongoId", user.Id),
                    new Claim(ClaimTypes.Email, user.EmailAddress),
                    new Claim(ClaimTypes.Role, "User"),
                  }),
                    Expires = DateTime.Now.AddMinutes(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var refreshToken = GenerateStringRefreshToken();
                return new Tokens { Token = tokenHandler.WriteToken(token), RefreshToken = refreshToken };
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Task<Tokens> GenerateUserRefreshToken(AuthModel usersData)
        {
            return GenerateJWTUserTokens(usersData);
        }

        public Task<Tokens> GenerateAdminToken(AuthModel adminsData)
        {
            return GenerateJWTAdminTokens(adminsData);
        }
        public async Task<Tokens> GenerateJWTAdminTokens(AuthModel adminsData)
        {
            try
            {
                AdminDTO admin = await adminActions.GetAdminByEmailAndPassword(adminsData.Email, adminsData.Password);

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
                    Expires = DateTime.Now.AddMinutes(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var refreshToken = GenerateStringRefreshToken();
                return new Tokens { Token = tokenHandler.WriteToken(token), RefreshToken = refreshToken };
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public Task<Tokens> GenerateAdminRefreshToken(AuthModel adminsData)
        {
            return GenerateJWTAdminTokens(adminsData);
        }
        public string GenerateStringRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var Key = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Key),
                ClockSkew = TimeSpan.Zero
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            JwtSecurityToken jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }
            return principal;
        }


    }
}
