using API.DTO;
using API.Models;

namespace API.Interfaces;

public interface IRevenueRepository
{
    Task<Revenue> AddRevenueAsync(Revenue revenue);
    
    Task<IEnumerable<Revenue>> GetAllRevenueAsync();
    
    Task<Revenue?> UpdateRevenueAsync(int id, Revenue updatedRevenue);
    
    Task<bool> DeleteRevenueAsync(int id);

    Task<List<GroupedRevenueResultDto>> GetGroupedRevenues();
}