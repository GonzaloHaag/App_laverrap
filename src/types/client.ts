import type { ApiResponse } from "./api";
import type { Database } from "./database";

export type Client = Database["public"]["Tables"]["clients"]["Row"];

export interface ApiResponseClients extends ApiResponse {
    clients?:Client[]
}