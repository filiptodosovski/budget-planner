using API.Models;

namespace API.Interfaces;

public interface IRevenueCategoryRepository
{
    Task<List<RevenueCategory>> GetAllCategories();
    
    Task<RevenueCategory> AddCategoryAsync(string categoryName);
}