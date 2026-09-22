namespace noodle_flow_ramen.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty; // Tonkotsu, Miso, Shoyu, Entradas, Bebidas
        public int SpicinessLevel { get; set; } // 0: None, 1: Mild, 2: Medium, 3: Hot
        public bool IsChefSpecial { get; set; }
        public bool IsPopular { get; set; }
        public bool IsVegetarian { get; set; }
        public string BadgeText { get; set; } = string.Empty;
        public List<string> Ingredients { get; set; } = new List<string>();
        public string IconSvg { get; set; } = string.Empty;
    }
}
