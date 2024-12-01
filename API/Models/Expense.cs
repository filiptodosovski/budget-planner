namespace API.Models;

public class Expense
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string Month { get; set; }
    public string Category { get; set; }
    public int Year { get; set; }
    public string Type { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
}