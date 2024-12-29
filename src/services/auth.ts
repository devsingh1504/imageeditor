// Authentication service to handle user security
import { User } from '../types';

// In production, replace with real authentication service
export class AuthService {
  private static instance: AuthService;
  
  private constructor() {}
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  getUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  requireAuth(): boolean {
    if (!this.isAuthenticated()) {
      throw new Error('Authentication required');
    }
    return true;
  }
}