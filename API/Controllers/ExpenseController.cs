using API.Interfaces;
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
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateExpense(int id, Expense expense)
    {
        var updatedExpense = await expenseRepository.UpdateExpenseAsync(id, expense);
        if (updatedExpense == null)
        {
            return NotFound($"Expense with ID {id} not found.");
        }

        return Ok(updatedExpense);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteExpense(int id)
    {
        var isDeleted = await expenseRepository.DeleteExpenseAsync(id);
        if (!isDeleted)
        {
            return NotFound($"Expense with ID {id} not found.");
        }

        return NoContent();
    }
    
    [HttpGet("grouped")]
    public async Task<IActionResult> GetAllGroupedExpenses()
    {
        try
        {
            var groupedExpenses = await expenseRepository.GetGroupedExpenses();
            return Ok(groupedExpenses);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while fetching grouped expenses.", error = ex.Message });
        }
    }
}