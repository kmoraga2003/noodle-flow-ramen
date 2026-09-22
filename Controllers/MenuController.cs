using Microsoft.AspNetCore.Mvc;
using noodle_flow_ramen.Services;

namespace noodle_flow_ramen.Controllers
{
    public class MenuController : Controller
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        public IActionResult Index(string category = "Todos")
        {
            var items = _menuService.GetByCategory(category);
            ViewBag.CurrentCategory = category;
            ViewBag.Categories = _menuService.GetCategories();
            return View(items);
        }

        [HttpGet]
        public IActionResult GetItemJson(int id)
        {
            var item = _menuService.GetById(id);
            if (item == null) return NotFound();
            return Json(item);
        }
    }
}
