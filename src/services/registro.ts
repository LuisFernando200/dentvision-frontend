// const API = "http://localhost:8000";

// export async function registro(name: string, email: string, password:string){
//   const response = await fetch(`${API}/users/create_user`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: name,
//       email: email,
//       password: password
//     }),
//   });

//   const data = await response.json();

//   return data;
// };

const API = "http://localhost:8000";

export async function registro(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error("Error al registrar usuario");
  }

  return await response.json();
}