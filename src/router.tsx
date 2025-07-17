import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout } from "@/layouts";
import { HomePage, LoginPage, RegisterPage, ServicesPage } from "@/pages";

export const router = createBrowserRouter([
    {
        path:"/autenticacion",
        Component:AuthLayout,
        children: [
            { path:"ingreso", Component: LoginPage },
            { path:"registro", Component: RegisterPage }
        ]
    },
    {
        path:'/',
        Component:MainLayout,
        children: [
            { index:true, Component: HomePage },
            { path:'servicios', Component: ServicesPage }
        ]
    },
    { path:'*', element:<div>Not found page</div> }
])