import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout } from "@/layouts";
import { ClientsPage, HomePage, LoginPage, RegisterPage, ServicesPage, WashedPage } from "@/pages";

export const router = createBrowserRouter([
    {
        path:"/auth",
        Component:AuthLayout,
        children: [
            { path:"login", Component: LoginPage },
            { path:"register", Component: RegisterPage }
        ]
    },
    {
        path:'/',
        Component:MainLayout,
        children: [
            { index:true, Component: HomePage },
            { path:'servicios', Component: ServicesPage },
            { path:'clientes', Component: ClientsPage },
            { path:"lavados", Component: WashedPage }
        ]
    },
    { path:'*', element:<div>Not found page</div> }
])