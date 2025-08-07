import { supabaseClient } from "@/supabase"
import type { ApiResponse } from "@/types";

export const loginUser = async({ email, password }:{ email:string, password:string }): Promise<ApiResponse> => {
    if(!email || !password) {
        return {
            status:false,
            message:'Todos los campos son requeridos'
        }
    }
    if(password.trim().length < 6) {
        return {
            status:false,
            message:'La contraseña debe tener minimo 6 caracteres'
        }
    }
    try {
        const { error } = await supabaseClient.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim()
        });
        if(error) throw error;

        return {
            status:true,
            message:'Ingreso exitoso'
        }
    } catch (error:unknown) {
        return {
            status:false,
            message: error instanceof Error ? error.message : 'Error al iniciar sesión'
        }
    }
}

export const logoutUser = async():Promise<ApiResponse> => {
    try {
        const {error} = await supabaseClient.auth.signOut();
        if(error) throw error

        return {
            status:true,
            message:'Logout exitoso'
        }
    } catch (error) {
        return {
            status:false,
            message: error instanceof Error ? error.message : 'Error al cerrar sesión'
        }
    }
}