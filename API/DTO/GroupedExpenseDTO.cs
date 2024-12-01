namespace API.DTO;

public class GroupedExpenseResultDto
{
    public int Year { get; set; }
    public string Month { get; set; }
    public List<ExpenseDto> Expenses { get; set; }
}

public class ExpenseDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string Category { get; set; }
    public string Type { get; set; }
}

