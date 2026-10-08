const API_URL = "http://localhost:8000/images";

export interface UsuarioBasico {
  id: number;
  name: string;
  email: string;
}

export interface ImagenFeedback {
  id: number;
  id_usuario: number;
  url_img: string;
  comentario: string;
  usuario: UsuarioBasico;
}

export const imageService = {
  async obtenerImagenes(): Promise<ImagenFeedback[]> {
    const token = localStorage.getItem('token');

    const response = await fetch(API_URL, {
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

    return response.json();
  },
};