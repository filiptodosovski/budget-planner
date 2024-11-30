using API.Models;

namespace API.Interfaces;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllCategories();
    
    Task<Category> AddCategoryAsync(string categoryName);
}