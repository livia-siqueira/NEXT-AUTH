import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  api.interceptors.request.use(async (config) => {
    const { "nextauth.token": token } = parseCookies(ctx);
    console.log(config);
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    
  });

  return api;
}
