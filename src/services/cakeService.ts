import type { Cake } from '../data/cakes';
import { cakesData } from '../data/cakes';

// This service demonstrates how you would fetch data from a real API
export class CakeService {
  // Simulate API call with delay
  static async getAllCakes(): Promise<Cake[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would be:
    // const response = await fetch('/api/cakes');
    // return response.json();
    
    return cakesData;
  }

  static async getCakesByType(type: string): Promise<Cake[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (type === 'all') {
      return cakesData;
    }
    
    return cakesData.filter(cake => cake.type === type);
  }

  static async getCakeById(id: number): Promise<Cake | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const cake = cakesData.find(cake => cake.id === id);
    return cake || null;
  }

  // Example of how to add a new cake (for future use)
  static async createCake(cakeData: Omit<Cake, 'id'>): Promise<Cake> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newCake: Cake = {
      id: Math.max(...cakesData.map(c => c.id)) + 1,
      ...cakeData
    };
    
    // In a real app, this would be:
    // const response = await fetch('/api/cakes', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(cakeData)
    // });
    // return response.json();
    
    return newCake;
  }
}
