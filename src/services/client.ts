import { supabaseClient } from "@/supabase";
import type { ApiResponse } from "@/types/api";
import type { ApiResponseClients, Client } from "@/types/client";

interface ApiResponseClient extends ApiResponse {
  client?: Client;
}
export const createClient = async ({
  userId,
  client,
}: {
  userId: string;
  client: Client;
}): Promise<ApiResponseClient> => {
  if (!userId) {
    return {
      status: false,
      message: "El usuario es requerido",
    };
  }
  try {
    const { data, error } = await supabaseClient
      .from("clients")
      .insert({
        ...client, // viene sin el id, que lo cree supabase
        user_id: userId,
      })
      .select()
      .single();
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }

    return {
      status: true,
      message: "Cliente creado",
      client: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error al crear el cliente",
    };
  }
};

export const getAllClients = async ({
  userId,
  searchValue,
}: {
  userId: string;
  searchValue: string;
}): Promise<ApiResponseClients> => {
  if (!userId) {
    return {
      status: false,
      message: "El usuario es requerido",
    };
  }
  try {
    const query = supabaseClient
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (searchValue !== "") {
      query.or(`name.ilike.%${searchValue}%,patent.ilike.%${searchValue}%`);
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
      message: "Clientes obtenidos",
      clients: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error al obtener clientes",
    };
  }
};

export const deleteClientById = async ({
  userId,
  clientId,
}: {
  userId: string;
  clientId: number;
}): Promise<ApiResponse> => {
  if (!userId) {
    return {
      status: false,
      message: "El usuario es requerido",
    };
  }
  try {
    // Primero busco el cliente
    const { data: client, error: errorGetClient } = await supabaseClient
      .from("clients")
      .select(`id,user_id`)
      .eq("user_id", userId)
      .eq("id", clientId)
      .single();
    if (errorGetClient) {
      return {
        status: false,
        message: errorGetClient.message,
      };
    }
    if (!client) {
      return {
        status: false,
        message: "El cliente no pudo ser encontrado",
      };
    }
    // Se encontro el cliente
    const { error } = await supabaseClient
      .from("clients")
      .delete()
      .eq("id", client.id)
      .eq("user_id", client.user_id);
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
    return {
      status: true,
      message: "Cliente eliminado exitosamente",
    };
  } catch (error) {
    return {
      status: false,
      message: "Error en el servidor al borrar cliente" + error,
    };
  }
};
