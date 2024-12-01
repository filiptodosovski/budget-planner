using API.DTO;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class RevenueRepository(DataContext context) : IRevenueRepository
{
    public async Task<Revenue> AddRevenueAsync(Revenue revenue)
    {
        context.Revenue.Add(revenue);
        await context.SaveChangesAsync();
        return revenue;
    }
    
    public async Task<IEnumerable<Revenue>> GetAllRevenueAsync()
    {
        return await context.Revenue
            .OrderBy(e => e.CreatedAt)  
            .ToListAsync();
    }

    
    public async Task<Revenue?> UpdateRevenueAsync(int id, Revenue updatedRevenue)
    {
        var existingRevenue = await context.Revenue.FindAsync(id);
        if (existingRevenue == null)
        {
            return null; 
        }
        
        existingRevenue.Amount = updatedRevenue.Amount;
        existingRevenue.Month = updatedRevenue.Month;
        existingRevenue.Category = updatedRevenue.Category;
        existingRevenue.Year = updatedRevenue.Year;
        existingRevenue.Type = updatedRevenue.Type;

        await context.SaveChangesAsync();
        return existingRevenue;
    }


    public async Task<bool> DeleteRevenueAsync(int id)
    {
        var revenue = await context.Revenue.FindAsync(id);
        if (revenue == null)
        {
            return false; 
        }

        context.Revenue.Remove(revenue);
        await context.SaveChangesAsync();
        return true; 
    }
    
    public async Task<List<GroupedRevenueResultDto>> GetGroupedRevenues()
    {
        var revenues = await context.Revenue.ToListAsync();
        
        var groupedRevenue = revenues
            .GroupBy(e => new { e.Year, e.Month })
            .Select(group => new GroupedRevenueResultDto
            {
                Year = group.Key.Year,
                Month = group.Key.Month,
                Expenses = group.Select(e => new ExpenseDto
                {
                    Id = e.Id,
                    Amount = e.Amount,
                    Category = e.Category,
                    Type = e.Type
                }).ToList()
            })
            .OrderBy(result => result.Year)
            .ThenBy(result => result.Month) // Ensure proper ordering
            .ToList();

        return groupedRevenue;
    }

}