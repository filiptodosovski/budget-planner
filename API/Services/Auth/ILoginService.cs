namespace API.Services.Auth;

    public interface ILoginService
    {
        Task<string> LoginAsync(string email, string password);
    }
