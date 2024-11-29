using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Helpers;

    public class RegisterProfile : Profile
    {
        public RegisterProfile()
        {
            CreateMap<RegisterDTO, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName)) 
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password));
        }
    }
