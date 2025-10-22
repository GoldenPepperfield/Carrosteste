// Mock database para simular persistência de dados
import type { Utilizador, Vendedor, Comprador, Administrador, Denuncia, Anuncio } from "../types";

// Storage keys
const USERS_KEY = "autopremium_users";
const DENUNCIAS_KEY = "autopremium_denuncias";
const ANUNCIOS_KEY = "autopremium_anuncios";

// Initialize default admin if not exists
export function initializeDatabase() {
  const users = getAllUsers();
  if (users.length === 0) {
    const admin: Administrador = {
      id_utilizador: 1,
      nome: "Administrador",
      email: "admin@autopremium.pt",
      password: "admin123",
      tipo: "administrador",
      fotografia: undefined,
      data_registro: new Date(),
    };
    saveUser(admin);
  }
}

// Users
export function getAllUsers(): Utilizador[] {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

export function saveUser(user: Utilizador): void {
  const users = getAllUsers();
  const existingIndex = users.findIndex(u => u.id_utilizador === user.id_utilizador);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUserByEmail(email: string): Utilizador | null {
  const users = getAllUsers();
  return users.find(u => u.email === email) || null;
}

export function deleteUser(id: number): void {
  const users = getAllUsers();
  const filtered = users.filter(u => u.id_utilizador !== id);
  localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
}

export function generateUserId(): number {
  const users = getAllUsers();
  if (users.length === 0) return 1;
  return Math.max(...users.map(u => u.id_utilizador)) + 1;
}

// Denúncias
export function getAllDenuncias(): Denuncia[] {
  const data = localStorage.getItem(DENUNCIAS_KEY);
  if (!data) return [];
  const denuncias = JSON.parse(data);
  // Convert date strings back to Date objects
  return denuncias.map((d: any) => ({
    ...d,
    data_denuncia: new Date(d.data_denuncia),
  }));
}

export function saveDenuncia(denuncia: Denuncia): void {
  const denuncias = getAllDenuncias();
  const existingIndex = denuncias.findIndex(d => d.id_denuncia === denuncia.id_denuncia);
  
  if (existingIndex >= 0) {
    denuncias[existingIndex] = denuncia;
  } else {
    denuncias.push(denuncia);
  }
  
  localStorage.setItem(DENUNCIAS_KEY, JSON.stringify(denuncias));
}

export function generateDenunciaId(): number {
  const denuncias = getAllDenuncias();
  if (denuncias.length === 0) return 1;
  return Math.max(...denuncias.map(d => d.id_denuncia)) + 1;
}

export function updateDenunciaStatus(id: number, status: Denuncia['status']): void {
  const denuncias = getAllDenuncias();
  const denuncia = denuncias.find(d => d.id_denuncia === id);
  if (denuncia) {
    denuncia.status = status;
    localStorage.setItem(DENUNCIAS_KEY, JSON.stringify(denuncias));
  }
}

// Anúncios
export function getAllAnuncios(): Anuncio[] {
  const data = localStorage.getItem(ANUNCIOS_KEY);
  if (!data) return [];
  const anuncios = JSON.parse(data);
  return anuncios.map((a: any) => ({
    ...a,
    data_publicacao: new Date(a.data_publicacao),
    data_atualizacao: a.data_atualizacao ? new Date(a.data_atualizacao) : undefined,
  }));
}

export function saveAnuncio(anuncio: Anuncio): void {
  const anuncios = getAllAnuncios();
  const existingIndex = anuncios.findIndex(a => a.id_anuncio === anuncio.id_anuncio);
  
  if (existingIndex >= 0) {
    anuncios[existingIndex] = anuncio;
  } else {
    anuncios.push(anuncio);
  }
  
  localStorage.setItem(ANUNCIOS_KEY, JSON.stringify(anuncios));
}

export function generateAnuncioId(): number {
  const anuncios = getAllAnuncios();
  if (anuncios.length === 0) return 1;
  return Math.max(...anuncios.map(a => a.id_anuncio)) + 1;
}

export function getAnunciosByVendedor(vendedorId: number): Anuncio[] {
  const anuncios = getAllAnuncios();
  return anuncios.filter(a => a.id_vendedor === vendedorId);
}

export function deleteAnuncio(id: number): void {
  const anuncios = getAllAnuncios();
  const filtered = anuncios.filter(a => a.id_anuncio !== id);
  localStorage.setItem(ANUNCIOS_KEY, JSON.stringify(filtered));
}
