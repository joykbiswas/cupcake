export interface Cake {
    id: number;
    name: string;
    price: number;
    rating: number;
    category: string;
    image: string;
    inStock: boolean
    description: string;
    tags: string[]
  }

// Mock JSON data for cakes
export const cakesData : Cake[] = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    price: 25.99,
    category: "chocolate",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    description: "Rich and moist chocolate cake with chocolate frosting",
    inStock: true,
    tags: ["chocolate", "classic", "birthday"]
  },
  {
    id: 2,
    name: "Vanilla Bean Cheesecake",
    price: 32.50,
    category: "cheesecake",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
    description: "Creamy vanilla cheesecake with graham cracker crust",
    inStock: true,
    tags: ["vanilla", "cheesecake", "creamy"]
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    price: 28.99,
    category: "specialty",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
    description: "Classic red velvet with cream cheese frosting",
    inStock: true,
    tags: ["red velvet", "cream cheese", "classic"]
  },
  {
    id: 4,
    name: "Strawberry Shortcake",
    price: 24.99,
    category: "fruit",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    description: "Fresh strawberries with fluffy sponge cake",
    inStock: true,
    tags: ["strawberry", "fruit", "fresh"]
  },
  {
    id: 5,
    name: "Lemon Drizzle Cake",
    price: 22.50,
    category: "citrus",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
    description: "Zesty lemon cake with sweet lemon glaze",
    inStock: true,
    tags: ["lemon", "citrus", "zesty"]
  },
  {
    id: 6,
    name: "Black Forest Cake",
    price: 35.99,
    category: "specialty",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    description: "Chocolate sponge with cherries and whipped cream",
    inStock: true,
    tags: ["chocolate", "cherry", "whipped cream"]
  },
  {
    id: 7,
    name: "Carrot Cake",
    price: 26.99,
    category: "specialty",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop",
    description: "Moist carrot cake with cream cheese frosting and walnuts",
    inStock: true,
    tags: ["carrot", "cream cheese", "walnuts"]
  },
  {
    id: 8,
    name: "Tiramisu Cake",
    price: 38.50,
    category: "specialty",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    description: "Italian-inspired coffee-flavored dessert cake",
    inStock: true,
    tags: ["coffee", "italian", "mascarpone"]
  },
  {
    id: 9,
    name: "Funfetti Birthday Cake",
    price: 27.99,
    category: "birthday",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    description: "Colorful sprinkle cake perfect for celebrations",
    inStock: true,
    tags: ["funfetti", "birthday", "colorful"]
  },
  {
    id: 10,
    name: "Chocolate Lava Cake",
    price: 15.99,
    category: "chocolate",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
    description: "Warm chocolate cake with molten center",
    inStock: true,
    tags: ["chocolate", "lava", "warm"]
  },
  {
    id: 11,
    name: "Blueberry Muffin Cake",
    price: 23.50,
    category: "fruit",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=400&h=300&fit=crop",
    description: "Giant muffin-style cake loaded with fresh blueberries",
    inStock: true,
    tags: ["blueberry", "muffin", "fruit"]
  },
  {
    id: 12,
    name: "Coconut Layer Cake",
    price: 31.99,
    category: "tropical",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400&h=300&fit=crop",
    description: "Multi-layer cake with coconut cream and shredded coconut",
    inStock: true,
    tags: ["coconut", "tropical", "layers"]
  },
  {
    id: 13,
    name: "Pineapple Upside Down Cake",
    price: 24.99,
    category: "fruit",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    description: "Classic upside-down cake with caramelized pineapple",
    inStock: false,
    tags: ["pineapple", "caramel", "classic"]
  },
  {
    id: 14,
    name: "Espresso Chocolate Cake",
    price: 33.99,
    category: "chocolate",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=300&fit=crop",
    description: "Rich chocolate cake with espresso buttercream",
    inStock: true,
    tags: ["espresso", "chocolate", "coffee"]
  },
  {
    id: 15,
    name: "Lemon Raspberry Cake",
    price: 29.50,
    category: "fruit",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    description: "Tangy lemon cake with fresh raspberry filling",
    inStock: true,
    tags: ["lemon", "raspberry", "tangy"]
  },
  {
    id: 16,
    name: "German Chocolate Cake",
    price: 34.99,
    category: "chocolate",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    description: "Rich chocolate cake with coconut pecan frosting",
    inStock: true,
    tags: ["german chocolate", "coconut", "pecan"]
  },
  {
    id: 17,
    name: "Banana Bread Cake",
    price: 21.99,
    category: "fruit",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop",
    description: "Moist banana cake with cream cheese frosting",
    inStock: true,
    tags: ["banana", "moist", "cream cheese"]
  },
  {
    id: 18,
    name: "Orange Creamsicle Cake",
    price: 26.50,
    category: "citrus",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&h=300&fit=crop",
    description: "Orange-flavored cake with vanilla cream layers",
    inStock: true,
    tags: ["orange", "vanilla", "creamy"]
  },
  {
    id: 19,
    name: "Mint Chocolate Chip Cake",
    price: 30.99,
    category: "specialty",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    description: "Refreshing mint cake with chocolate chips",
    inStock: true,
    tags: ["mint", "chocolate chip", "refreshing"]
  },
  {
    id: 20,
    name: "Peach Cobbler Cake",
    price: 25.50,
    category: "fruit",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    description: "Rustic cake with fresh peaches and crumb topping",
    inStock: true,
    tags: ["peach", "cobbler", "rustic"]
  }
];

