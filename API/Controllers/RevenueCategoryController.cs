using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class RevenueCategoriesController(IRevenueCategoryRepository revenueCategoryRepository) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetRevenueCategories()
    {
        var categories = await revenueCategoryRepository.GetAllCategories();
        return Ok(categories);
    }
    
    [HttpPost]
    public async Task<IActionResult> AddRevenueCategory([FromBody] RevenueCategory revenueCategory)
    {
        if (string.IsNullOrEmpty(revenueCategory.Name))
        {
            return BadRequest("Revenue Category name cannot be empty");
        }

        var newCategory = await revenueCategoryRepository.AddCategoryAsync(revenueCategory.Name);
        return CreatedAtAction(nameof(GetRevenueCategories), new { id = newCategory.Id }, newCategory);
    }
}