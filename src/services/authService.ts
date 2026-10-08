const API = "http://localhost:8000";

export async function login(email: string, password: string) {
  const response = await fetch(`${API}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Correo o contraseña incorrectos");
  }

  return await response.json();
}