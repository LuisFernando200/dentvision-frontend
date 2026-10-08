const API_URL = 'http://localhost:8000';

export interface Perfil {
  id: number;
  name: string;
  email: string;
  rol: string;
}

export interface ActualizarPerfilPayload {
  name?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}

function extraerMensajeError(err: any): string {
  if (!err?.detail) return 'Error desconocido';

  // HTTPException normal: detail es un string
  if (typeof err.detail === 'string') return err.detail;

  // Error de validación de Pydantic: detail es un array de {loc, msg, type}
  if (Array.isArray(err.detail)) {
    return err.detail.map((e: any) => e.msg).join(', ');
  }

  return 'Error desconocido';
}

export async function obtenerPerfil(): Promise<Perfil> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  if (!response.ok) throw new Error('No se pudo cargar el perfil');

  return response.json();
}

export async function actualizarPerfil(payload: ActualizarPerfilPayload): Promise<Perfil> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(extraerMensajeError(err));
  }

  return response.json();
}