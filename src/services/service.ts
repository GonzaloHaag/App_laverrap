import { supabaseClient } from "@/supabase";
import type { ApiResponse } from "@/types/api";
import type { ApiResponseServices, Service } from "@/types/service";

export const createService = async ({
  userId,
  service,
}: {
  userId: string;
  service: Service;
}): Promise<ApiResponse> => {
  if (!userId) {
    return {
      status: false,
      message: "El usuario es requerido",
    };
  }
  try {
    const { error } = await supabaseClient.from("services").insert({
      ...service, // viene sin el id, que lo cree supabase
      user_id: userId,
    });
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }

    return {
      status: true,
      message: "Servicio creado",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error al crear el servicio",
    };
  }
};
export const getAllServices = async ({
  userId,
  searchValue,
}: {
  userId: string;
  searchValue: string;
}): Promise<ApiResponseServices> => {
    console.log(searchValue);
  if (!userId) {
    return {
      status: false,
      message: "El usuario es requerido",
    };
  }
  try {
    const query = supabaseClient
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (searchValue !== "") {
      query.ilike("name", `%${searchValue}%`);
    }
    const { error, data } = await query;

    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
    return {
      status: true,
      message: "Servicios obtenidos",
      services: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error al obtener servicios",
    };
  }
};
