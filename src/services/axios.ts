import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });
  const { "nextauth.token": token } = parseCookies(ctx);
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
