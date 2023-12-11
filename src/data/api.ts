import { env } from "@/env";

export default function api({ path, init }: { path: string, init?:RequestInit }) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl);
  
  return fetch(url,init)
}