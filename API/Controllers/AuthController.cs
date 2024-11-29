using API.Models;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.DTO;
using API.Services.Auth;

namespace API.Controllers
{
    public class AuthController(IAuthRepository authRepository, ILoginService loginService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            if (string.IsNullOrEmpty(registerDto.UserName) || string.IsNullOrEmpty(registerDto.Password))
            {
                return BadRequest("Username and password are required.");
            }

            var existingUser = await authRepository.GetUserByUsername(registerDto.UserName);

            if (existingUser != null)
            {
                return Conflict("Username already exists.");
            }

            var user = new User
            {
                UserName = registerDto.UserName,
                Password = registerDto.Password
            };

            bool userCreated = await authRepository.CreateUser(user);

            if (userCreated)
            {
                return Ok("User registered successfully.");
            }

            return BadRequest("Error registering user.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            try
            {
                var token = await loginService.LoginAsync(loginDto.UserName, loginDto.Password);
                return Ok(new { Token = token, loginDto.UserName });
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}