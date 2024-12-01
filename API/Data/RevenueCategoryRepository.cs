using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class RevenueCategoryRepository(DataContext context) : IRevenueCategoryRepository
{
    public async Task<List<RevenueCategory>> GetAllCategories()
    {
        return await context.RevenueCategories.ToListAsync();
    }
    
    public async Task<RevenueCategory> AddCategoryAsync(string categoryName)
    {
        var category = new RevenueCategory { Name = categoryName };
        context.RevenueCategories.Add(category);
        await context.SaveChangesAsync();
        return category;
    }
}