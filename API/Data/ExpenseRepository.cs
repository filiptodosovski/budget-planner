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
        return await context.Expenses.ToListAsync();
    }
}