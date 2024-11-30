using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ExpenseController(IExpenseRepository expenseRepository) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<Expense>> CreateExpense([FromBody] Expense expense)
    {
        if (expense == null)
        {
            return BadRequest();
        }

        var addedExpense = await expenseRepository.AddExpenseAsync(expense);

        return CreatedAtAction(nameof(CreateExpense), new { id = addedExpense.Id }, addedExpense);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllExpenses()
    {
        var expenses = await expenseRepository.GetAllExpensesAsync();
        return Ok(expenses);
    }
}