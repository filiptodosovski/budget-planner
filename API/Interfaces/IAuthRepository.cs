using API.Models;

namespace API.Interfaces;

public interface IAuthRepository
{
    Task<User> GetUserByUsername(string username);
    Task<bool> CreateUser(User user);
}