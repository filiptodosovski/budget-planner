using API.DTO;
using API.Models;

namespace API.Interfaces;

public interface IExpenseRepository
{
    Task<Expense> AddExpenseAsync(Expense expense);
    
    Task<IEnumerable<Expense>> GetAllExpensesAsync();
    
    Task<Expense?> UpdateExpenseAsync(int id, Expense updatedExpense);
    
    Task<bool> DeleteExpenseAsync(int id);

    Task<List<GroupedExpenseResultDto>> GetGroupedExpenses();
}