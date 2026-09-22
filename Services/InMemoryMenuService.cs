using noodle_flow_ramen.Models;

namespace noodle_flow_ramen.Services
{
    public class InMemoryMenuService : IMenuService
    {
        private readonly List<MenuItem> _menuItems = new()
        {
            // TONKOTSU
            new MenuItem
            {
                Id = 1,
                Name = "Tonkotsu Black Garlic",
                Description = "Denso y cremoso caldo de cerdo cocinado durante 18 horas, servido con aceite de ajo negro (Mayu), chashu frito, huevo nitamago marinado, brotes de bambú y cebollín fresco.",
                Price = 13900m,
                Category = "Tonkotsu",
                SpicinessLevel = 1,
                IsChefSpecial = true,
                IsPopular = true,
                IsVegetarian = false,
                BadgeText = "Chef Special 🔥",
                Ingredients = new List<string> { "Caldo Tonkotsu", "Mayu Garlic", "Chashu de Cerdo", "Nitamago Egg", "Menma" }
            },
            new MenuItem
            {
                Id = 2,
                Name = "Tonkotsu Classic Supreme",
                Description = "Nuestra receta tradicional con caldo ultra sedoso de hueso de cerdo, tiras de pork belly glaseado, alga nori crocante y fideos artesanales ondulados de grosor medio.",
                Price = 12900m,
                Category = "Tonkotsu",
                SpicinessLevel = 0,
                IsChefSpecial = false,
                IsPopular = true,
                IsVegetarian = false,
                BadgeText = "Más Vendido 👑",
                Ingredients = new List<string> { "Caldo 18 hrs", "Chashu Glaseado", "Huevo Marinado", "Nori", "Cebollín" }
            },
            new MenuItem
            {
                Id = 3,
                Name = "Spicy Tonkotsu Red Dragon",
                Description = "Para amantes del picante. Caldo tonkotsu infusionado con pasta de chiles tostados japoneses, aceite de sésamo picante, carne molida spicy y toques de jengibre.",
                Price = 14500m,
                Category = "Tonkotsu",
                SpicinessLevel = 3,
                IsChefSpecial = false,
                IsPopular = false,
                IsVegetarian = false,
                BadgeText = "Spicy Extra 🌶️🌶️🌶️",
                Ingredients = new List<string> { "Chili Paste", "Kikurage", "Carne Molida Spicy", "Sésamo Tostado" }
            },

            // MISO
            new MenuItem
            {
                Id = 4,
                Name = "Hokkaido Spicy Miso",
                Description = "Mezcla secreta de miso rojo y blanco de Hokkaido con fondo de pollo campesino, mantequilla de ajo, choclo dulce salteado, chashu y naruto.",
                Price = 13200m,
                Category = "Miso",
                SpicinessLevel = 2,
                IsChefSpecial = true,
                IsPopular = true,
                IsVegetarian = false,
                BadgeText = "Tradición Hokkaido 🍜",
                Ingredients = new List<string> { "Miso Orgánico", "Mantequilla de Ajo", "Choclo Sweet Corn", "Narutomaki" }
            },
            new MenuItem
            {
                Id = 5,
                Name = "Miso Vegetarian Harmony",
                Description = "Delicioso caldo vegetal a base de hongo Shiitake caramelizado, miso fermentado, tofu frito marinado en soya dulce, bok choy, brotes de soya y fideos sin huevo.",
                Price = 11900m,
                Category = "Miso",
                SpicinessLevel = 0,
                IsChefSpecial = false,
                IsPopular = false,
                IsVegetarian = true,
                BadgeText = "100% Veggie 🌱",
                Ingredients = new List<string> { "Shiitake Broth", "Tofu Frito", "Bok Choy", "Brotes de Soya", "Sesame Oil" }
            },

            // SHOYU
            new MenuItem
            {
                Id = 6,
                Name = "Tokyo Classic Shoyu",
                Description = "Caldo cristalino y ligero de pollo y dashi de alga kombu con reducción de salsa de soya añejada, pechuga de pollo sous-vide, huevo pochado y retoños de bambú.",
                Price = 12500m,
                Category = "Shoyu",
                SpicinessLevel = 0,
                IsChefSpecial = false,
                IsPopular = true,
                IsVegetarian = false,
                BadgeText = "Clásico Tokyo 🎌",
                Ingredients = new List<string> { "Dashi Kombu", "Soya Añejada", "Pollo Sous-vide", "Menma Bamboo" }
            },
            new MenuItem
            {
                Id = 7,
                Name = "Truffle Shoyu Umami",
                Description = "Una experiencia sofisticada. Caldo de ave y dashi aromatizado con aceite de trufa negra fresca, champiñones Rey Oyster sellados y láminas fina de Chashu.",
                Price = 15900m,
                Category = "Shoyu",
                SpicinessLevel = 0,
                IsChefSpecial = true,
                IsPopular = false,
                IsVegetarian = false,
                BadgeText = "Edición Gourmet ✨",
                Ingredients = new List<string> { "Trufa Negra", "King Oyster Mushroom", "Dashi Umami", "Chashu Premium" }
            },

            // ENTRADAS (Starters)
            new MenuItem
            {
                Id = 8,
                Name = "Gyoza Artesanal (5 uds)",
                Description = "Empanaditas japonesas al vapor y doradas a la plancha rellenas de cerdo especiado, col china y jengibre. Acompañadas de salsa ponzu casera.",
                Price = 6900m,
                Category = "Entradas",
                SpicinessLevel = 0,
                IsChefSpecial = false,
                IsPopular = true,
                IsVegetarian = false,
                BadgeText = "Favorito 🥟",
                Ingredients = new List<string> { "Cerdo", "Col China", "Jengibre", "Salsa Ponzu" }
            },
            new MenuItem
            {
                Id = 9,
                Name = "Karaage Chicken Bites",
                Description = "Crujientes trozos de muslo de pollo marinados en soya, jengibre y sake, fritos al estilo japonés con mayonesa spicy sriracha.",
                Price = 7500m,
                Category = "Entradas",
                SpicinessLevel = 1,
                IsChefSpecial = false,
                IsPopular = true,
                IsVegetarian = false,
                BadgeText = "Crispy 🍗",
                Ingredients = new List<string> { "Pollo Marinado", "Sake", "Spicy Mayo", "Limón" }
            },
            new MenuItem
            {
                Id = 10,
                Name = "Edamame al Sésamo y Sal Marina",
                Description = "Vainas de soya al vapor salteadas con aceite de sésamo tostado, togarashi ligero y escamas de sal marina fina.",
                Price = 5200m,
                Category = "Entradas",
                SpicinessLevel = 1,
                IsChefSpecial = false,
                IsPopular = false,
                IsVegetarian = true,
                BadgeText = "Entrada Veggie 🌱",
                Ingredients = new List<string> { "Edamame", "Sal Marina", "Togarashi", "Sésamo" }
            },

            // BEBIDAS (Drinks)
            new MenuItem
            {
                Id = 11,
                Name = "Ramune Tradicional Japonesa",
                Description = "Bebida gaseosa japonesa icónica con canica en la botella. Sabores: Original Soda o Melón Dulce.",
                Price = 3800m,
                Category = "Bebidas",
                SpicinessLevel = 0,
                IsChefSpecial = false,
                IsPopular = true,
                IsVegetarian = true,
                BadgeText = "Importado 🥤",
                Ingredients = new List<string> { "Bebida Gaseosa Japonesa" }
            },
            new MenuItem
            {
                Id = 12,
                Name = "Matcha Iced Latte Artesanal",
                Description = "Té verde Matcha orgánico Uji batido al momento con leche cremosa (opción leche vegetal disponible) y almíbar de azúcar morena.",
                Price = 4500m,
                Category = "Bebidas",
                SpicinessLevel = 0,
                IsChefSpecial = true,
                IsPopular = true,
                IsVegetarian = true,
                BadgeText = "Matcha Uji 🍵",
                Ingredients = new List<string> { "Matcha Uji", "Leche Cremosa", "Brown Sugar" }
            },
            new MenuItem
            {
                Id = 13,
                Name = "Cerveza Asahi Super Dry (330ml)",
                Description = "Cerveza lager japonesa ultra refrescante con acabado limpio y seco, ideal para maridar con ramen tonkotsu.",
                Price = 4900m,
                Category = "Bebidas",
                SpicinessLevel = 0,
                IsChefSpecial = false,
                IsPopular = false,
                IsVegetarian = true,
                BadgeText = "Cerveza Japonesa 🍺",
                Ingredients = new List<string> { "Cerveza Asahi Importada" }
            }
        };

        public IEnumerable<MenuItem> GetAll() => _menuItems;

        public IEnumerable<MenuItem> GetByCategory(string category)
        {
            if (string.IsNullOrWhiteSpace(category) || category.Equals("Todos", StringComparison.OrdinalIgnoreCase))
            {
                return _menuItems;
            }
            return _menuItems.Where(i => i.Category.Equals(category, StringComparison.OrdinalIgnoreCase));
        }

        public MenuItem? GetById(int id) => _menuItems.FirstOrDefault(i => i.Id == id);

        public IEnumerable<string> GetCategories() => new[] { "Todos", "Tonkotsu", "Miso", "Shoyu", "Entradas", "Bebidas" };

        public IEnumerable<MenuItem> GetChefSpecials() => _menuItems.Where(i => i.IsChefSpecial || i.IsPopular).Take(4);
    }
}
