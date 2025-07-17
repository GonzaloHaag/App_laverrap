import { LoginForm } from "@/components";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginPage() {
    return (
        <div className="w-full max-w-sm">
            <Card>
                <CardHeader>
                    <CardTitle>Bienvenido</CardTitle>
                    <CardDescription className="text-pretty">
                        Ingresá tus credenciales para acceder al sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}