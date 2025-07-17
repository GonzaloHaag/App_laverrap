import { Outlet } from "react-router-dom"
export const AuthLayout = () => {
    return (
        <main className="w-full min-h-svh flex justify-center p-6">
            <Outlet />
        </main>
    )
}