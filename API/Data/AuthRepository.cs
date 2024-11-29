using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using API.Services.Auth;

namespace API.Data;

    public class AuthRepository(DataContext context, IPasswordHasher passwordHasher)
        : IAuthRepository
    {
        public async Task<User> GetUserByUsername(string username)
        {
            return await context.Users
                .FirstOrDefaultAsync(u => u.UserName == username); 
        }

        public async Task<bool> CreateUser(User user)
        {
            var hashedPassword = passwordHasher.HashPassword(user.Password);
            user.Password = hashedPassword;
            
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return true;
        }
    }
