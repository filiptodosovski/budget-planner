using API.Interfaces;

namespace API.Services.Auth;

    public class LoginService(
        IAuthRepository authRepository,
        IPasswordHasher passwordHasher,
        ITokenService tokenService)
        : ILoginService
    {
        public async Task<string> LoginAsync(string username, string password)
        {
            var user = await authRepository.GetUserByUsername(username.ToLower());

            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }

            bool verified = passwordHasher.Verify(password, user.Password);

            if (!verified)
            {
                throw new UnauthorizedAccessException("Invalid password");
            }

            return tokenService.CreateToken(user);
        }
    }
