using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class RevenueController(IRevenueRepository revenueRepository) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<Revenue>> CreateRevenue([FromBody] Revenue revenue)
    {
        if (revenue == null)
        {
            return BadRequest();
        }

        var addedExpense = await revenueRepository.AddRevenueAsync(revenue);

        return CreatedAtAction(nameof(CreateRevenue), new { id = addedExpense.Id }, addedExpense);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllRevenues()
    {
        var revenues = await revenueRepository.GetAllRevenueAsync();
        return Ok(revenues);
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateRevenue(int id, Revenue revenue)
    {
        var updatedRevenue = await revenueRepository.UpdateRevenueAsync(id, revenue);
        if (updatedRevenue == null)
        {
            return NotFound($"Revenue with ID {id} not found.");
        }

        return Ok(updatedRevenue);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteRevenues(int id)
    {
        var isDeleted = await revenueRepository.DeleteRevenueAsync(id);
        if (!isDeleted)
        {
            return NotFound($"Revenue with ID {id} not found.");
        }

        return NoContent();
    }
    
    [HttpGet("grouped")]
    public async Task<IActionResult> GetAllGroupedRevenues()
    {
        try
        {
            var groupedRevenues = await revenueRepository.GetGroupedRevenues();
            return Ok(groupedRevenues);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while fetching grouped revenues.", error = ex.Message });
        }
    }
}