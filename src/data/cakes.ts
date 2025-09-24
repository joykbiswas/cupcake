export interface Cake {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  images: string;
}

export const cakesData: Cake[] = [
  {
    "id": 1,
    "name": "Classic Chocolate Cake",
    "type": "Chocolate",
    "description": "Rich and moist chocolate sponge layered with creamy chocolate ganache.",
    "price": 25.99,
    "images": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1050&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 2,
    "name": "Red Velvet Cake",
    "type": "Velvet",
    "description": "Soft red velvet sponge with tangy cream cheese frosting.",
    "price": 29.50,
    "images": "https://media.istockphoto.com/id/1867271848/photo/beautiful-colorful-cake-at-baby-shower-celebration.jpg?s=2048x2048&w=is&k=20&c=APOqHcRLJnp771bolXPwAVIdHmVoDnEdzkq6XylTXAU="
  },
  {
    "id": 3,
    "name": "Strawberry Delight Cake",
    "type": "Fruit",
    "description": "Fresh strawberry sponge with whipped cream and real strawberry slices.",
    "price": 27.75,
    "images": "https://plus.unsplash.com/premium_photo-1661266841331-e2169199de65?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dz"
  },
  {
    "id": 4,
    "name": "Black Forest Cake",
    "type": "Chocolate & Fruit",
    "description": "Layers of chocolate sponge, whipped cream, and cherries topped with chocolate shavings.",
    "price": 30.00,
    "images": "https://images.unsplash.com/photo-1602351447937-745cb720612f?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 5,
    "name": "Lemon Zest Cake",
    "type": "Citrus",
    "description": "Light lemon sponge cake with tangy lemon curd and buttercream frosting.",
    "price": 24.50,
    "images": "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];
