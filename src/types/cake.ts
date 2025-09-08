export interface Cake {
    _id: string ;
    name: string;
    price: number;
    rating: number;
    category: string;
    images: string;
    inStock: boolean
    description: string;
    tags: string[];
    sizes?: string;
  }
