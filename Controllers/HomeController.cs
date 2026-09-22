using Microsoft.AspNetCore.Mvc;
using noodle_flow_ramen.Services;

namespace noodle_flow_ramen.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMenuService _menuService;

        public HomeController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        public IActionResult Index()
        {
            var chefSpecials = _menuService.GetChefSpecials();
            return View(chefSpecials);
        }

        public IActionResult Contact()
        {
            return View();
        }
    }
}
