import axios from "axios";
const apiUrl = import.meta.env.VITE_API
export async function checkStatus(URL: string) {
    const fullUrl = `${apiUrl}/public/check`;
  console.log("Отправляем запрос на:", fullUrl);
  try {
    const response = await axios.post("api/public/check", { url: URL });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}