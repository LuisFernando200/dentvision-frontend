const API_URL = "http://localhost:8000";

export async function subirImagen(
  imagen: File,
  comentario: string
) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("imagen", imagen);
  formData.append("comentario", comentario);

  const response = await fetch(`${API_URL}/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Error al subir imagen");
  }

  return await response.json();
}