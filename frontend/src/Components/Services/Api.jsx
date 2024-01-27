import Axios from "axios";
const API_URL = "http://localhost:8000";

export async function GetMain() {
  const response = await Axios.get(`${API_URL}/home`);
  return response.data;
}

export async function SearchData(searchTerm, limit) {
  const response = await Axios.get(`${API_URL}/home/${searchTerm}`, limit);
  return response.data;
}

export async function EditTitle(id, modifiedTitle) {
  const response = await Axios.put(`${API_URL}/home/${id}`, {
    title: modifiedTitle,
  });
  return response.data;
}

export async function DeleteFilm(id) {
  const response = await Axios.delete(`${API_URL}/home/${id}`);
  return response.data;
}

export async function GetUserData() {
  const r = await Axios.get(`${API_URL}/register`);
  return r.data;
}

export async function UploadImage(image) {
  try {
    const response = await Axios.post("http://localhost:8000/films", image, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
