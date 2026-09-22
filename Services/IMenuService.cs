using noodle_flow_ramen.Models;

namespace noodle_flow_ramen.Services
{
    public interface IMenuService
    {
        IEnumerable<MenuItem> GetAll();
        IEnumerable<MenuItem> GetByCategory(string category);
        MenuItem? GetById(int id);
        IEnumerable<string> GetCategories();
        IEnumerable<MenuItem> GetChefSpecials();
    }
}
