/* eslint-disable no-unused-vars */
import Axios from "axios";
const API_URL = "https://films-backend.vercel.app";

export async function GetMain() {
  const response = await Axios.get(`${API_URL}/home`);
  return response.data;
}

export async function Gemini(data) {
  const result = await Axios.post(`${API_URL}/gemini`, {
    data,
  });
  return result.data;
}

export async function ForgotPassword(data) {
  const r = await Axios.post(`${API_URL}/register/forgot`, {
    data,
  });
  return r.data;
}

export async function UserData() {
  const r = await Axios.get(`${API_URL}/register`);
  return r.data;
}

export async function DeleteUsers(id) {
  const response = await Axios.delete(`${API_URL}/register/${id}`);
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
    const response = await Axios.post(`${API_URL}/films`, image, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function GetComments() {
  try {
    const comments = await Axios.get(`${API_URL}/comments`);
    return comments.data;
  } catch (err) {
    console.error(err);
  }
}

export async function AddComments(id, msg) {
  try {
    const comments = await Axios.put(`${API_URL}/home/comment/${id}`, {
      newComment: msg,
    });
    return comments.data;
  } catch (err) {
    console.error(err);
  }
}

export async function DelComments(id) {
  try {
    const comments = await Axios.get(`${API_URL}/comments/${id}`);
    return comments.data;
  } catch (err) {
    console.error(err);
  }
}

export async function YTSDefault() {
  try {
    const data = await Axios.get("https://yts.mx/api/v2/list_movies.json");
    return data.data.data.movies;
  } catch (err) {
    console.error(err);
  }
}
