// Mock authentication system
import type { Utilizador } from "../types";

export function getCurrentUser(): Utilizador | null {
  const userStr = localStorage.getItem('current_user');
  if (!userStr) return null;
  return JSON.parse(userStr);
}

export function setCurrentUser(user: Utilizador | null) {
  if (user) {
    localStorage.setItem('current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('current_user');
  }
}

export function logout() {
  setCurrentUser(null);
}

export function isVendedor(user: Utilizador | null): boolean {
  return user?.tipo === 'vendedor';
}

export function isComprador(user: Utilizador | null): boolean {
  return user?.tipo === 'comprador';
}

export function isAdmin(user: Utilizador | null): boolean {
  return user?.tipo === 'administrador';
}
