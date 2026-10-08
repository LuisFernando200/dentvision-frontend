const API_URL = 'http://localhost:8000';

export interface ResultadoPredict {
  imagenUrl: string;
  diagnostico: string | null;
  porcentaje: string | null;
}

export async function analizarImagen(file: File): Promise<ResultadoPredict> {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // NO pongas Content-Type manual, fetch lo arma solo con el boundary
    },
    body: formData,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(`Error ${response.status}: ${texto}`);
  }

  const diagnostico =
    response.headers.get('diagnostico') ||
    response.headers.get('x-diagnostico') ||
    response.headers.get('X-Diagnostico') ||
    null;
  const porcentaje =
    response.headers.get('porcentaje') ||
    response.headers.get('x-porcentaje') ||
    response.headers.get('X-Porcentaje') ||
    null;

  const blob = await response.blob();
  const imagenUrl = URL.createObjectURL(blob);

  return { imagenUrl, diagnostico, porcentaje };
}