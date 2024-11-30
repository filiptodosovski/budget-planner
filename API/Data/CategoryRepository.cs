using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class CategoryRepository(DataContext context) : ICategoryRepository
{
    public async Task<List<Category>> GetAllCategories()
    {
        return await context.Categories.ToListAsync();
    }
    
    public async Task<Category> AddCategoryAsync(string categoryName)
    {
        var category = new Category { Name = categoryName };
        context.Categories.Add(category);
        await context.SaveChangesAsync();
        return category;
    }
}