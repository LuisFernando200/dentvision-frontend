import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  username: string;
  rol: string;
  exp: number;
}

export function getRolFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.rol;
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  return getRolFromToken() === 'admin';
}