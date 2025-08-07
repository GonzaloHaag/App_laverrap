import type { ApiResponse } from "./api";
import type { Database } from "./database";

export type Service = Database['public']['Tables']['services']['Row']
export type ServiceCategory = Database['public']['Enums']['services_category']
export type ServiceStatus = Database['public']['Enums']['services_status']
export interface ApiResponseServices extends ApiResponse {
    services?:Service[]
}