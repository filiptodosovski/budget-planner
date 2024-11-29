using Microsoft.AspNetCore.Identity;

namespace API.Models;

public class User 
{
    public int Id { get; set; }
    
    public required string UserName { get; set; }
    
    public required string Password { get; set; }
}