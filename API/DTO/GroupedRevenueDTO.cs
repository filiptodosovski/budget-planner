namespace API.DTO;

public class GroupedRevenueResultDto
{
    public int Year { get; set; }
    public string Month { get; set; }
    public List<RevenueDto> Revenues { get; set; }
}

public class RevenueDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string Category { get; set; }
    public string Type { get; set; }
}