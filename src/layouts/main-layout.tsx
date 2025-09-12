import { Header } from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
const queryClient = new QueryClient();
export const MainLayout = () => {
    const { session } = useAuth();
    if (session) {
        return (
            <>
                <Header />
                <QueryClientProvider client={ queryClient }>
                    <main className="bg-accent min-h-[calc(100svh-4rem)]">
                        <div className="h-full container mx-auto p-4">
                            <Outlet />
                            <Toaster position="top-right" duration={2000} richColors={true} />
                        </div>
                    </main>
                </QueryClientProvider>
            </>
        )
    }
    return (
        <Navigate to={'/auth/login'} />
    )
}