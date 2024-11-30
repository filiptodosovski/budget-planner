using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using API.DTO;

namespace API.Controllers;

    public class MonthController : BaseApiController
    {
        [HttpGet]
        public ActionResult<MonthResponseDTO> GetMonths()
        {
            var months = new List<string>
            {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            };
            
            string currentMonth = DateTime.Now.ToString("MMMM");
            
            var response = new MonthResponseDTO
            {
                Months = months,
                CurrentMonth = currentMonth
            };

            return Ok(response);
        }
    }
