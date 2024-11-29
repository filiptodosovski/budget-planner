using API.Models;

namespace API.Services.Auth;

public interface ITokenService
{
    string CreateToken(User user);
}