import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export const MainLayout = () => {
    const { session } = useAuth();
    return (
        <>
            {
                session ?
                    <main>
                        <Outlet />
                    </main>
                    :
                    <Navigate to={'/autenticacion/ingreso'} />
            }
        </>
    )
}