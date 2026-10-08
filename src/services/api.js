const API = "http://localhost:8000";
 
export async function obtenerPosts () {
    const response = await fetch(`${API}/api/vi/posts/`);

    if(!response.ok){
        throw new Error("Error al obtener los posts");
    }

    return await response.json()
}
