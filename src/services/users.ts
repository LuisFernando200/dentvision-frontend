const API_URL = 'http://localhost:8000';

export interface Usuario {
  id: number;
  name: string;
  email: string;
  rol: 'admin' | 'estudiante';
}

interface PaginatedUsers {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_prev: boolean;
  has_next: boolean;
  order_by: string;
  direction: string;
  items: Usuario[];
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  if (response.status === 403) {
    throw new Error('No tienes permisos para ver esta información');
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const data: PaginatedUsers = await response.json();
  return data.items;
}