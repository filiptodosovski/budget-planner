using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CategoriesController(ICategoryRepository categoryRepository) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await categoryRepository.GetAllCategories();
        return Ok(categories);
    }
    
    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] Category category)
    {
        if (string.IsNullOrEmpty(category.Name))
        {
            return BadRequest("Category name cannot be empty");
        }

        var newCategory = await categoryRepository.AddCategoryAsync(category.Name);
        return CreatedAtAction(nameof(GetCategories), new { id = newCategory.Id }, newCategory);
    }
}