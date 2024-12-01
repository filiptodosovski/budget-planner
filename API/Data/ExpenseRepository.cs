using API.DTO;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ExpenseRepository(DataContext context) : IExpenseRepository
{
    public async Task<Expense> AddExpenseAsync(Expense expense)
    {
        context.Expenses.Add(expense);
        await context.SaveChangesAsync();
        return expense;
    }
    
    public async Task<IEnumerable<Expense>> GetAllExpensesAsync()
    {
        return await context.Expenses
            .OrderBy(e => e.CreatedAt)  
            .ToListAsync();
    }

    
    public async Task<Expense?> UpdateExpenseAsync(int id, Expense updatedExpense)
    {
        var existingExpense = await context.Expenses.FindAsync(id);
        if (existingExpense == null)
        {
            return null; 
        }
        
        existingExpense.Amount = updatedExpense.Amount;
        existingExpense.Month = updatedExpense.Month;
        existingExpense.Category = updatedExpense.Category;
        existingExpense.Year = updatedExpense.Year;
        existingExpense.Type = updatedExpense.Type;

        await context.SaveChangesAsync();
        return existingExpense;
    }


    public async Task<bool> DeleteExpenseAsync(int id)
    {
        var expense = await context.Expenses.FindAsync(id);
        if (expense == null)
        {
            return false; 
        }

        context.Expenses.Remove(expense);
        await context.SaveChangesAsync();
        return true; 
    }
    
    public async Task<List<GroupedExpenseResultDto>> GetGroupedExpenses()
    {
        var expenses = await context.Expenses.ToListAsync();

        // Group by year and month
        var groupedExpenses = expenses
            .GroupBy(e => new { e.Year, e.Month })
            .Select(group => new GroupedExpenseResultDto
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

        return groupedExpenses;
    }

}