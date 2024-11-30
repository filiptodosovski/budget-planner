using API.Models;

public interface IExpenseRepository
{
    Task<Expense> AddExpenseAsync(Expense expense);
    
    Task<IEnumerable<Expense>> GetAllExpensesAsync();
}