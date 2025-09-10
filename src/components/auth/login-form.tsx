import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { loginUser } from "@/services/auth";
import { LoaderCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginFormInput {
    email: string;
    password: string;
}
export const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginFormInput>({
        mode: 'onSubmit'
    });
    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        const response = await loginUser({ email: data.email, password: data.password });
        if (!response.status) {
            console.log(response.message)
            return;
        }
        navigate('/')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="space-y-1">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            disabled={isSubmitting}
                            placeholder="m@example.com"
                            {...register('email', { required: { value: true, message: 'El email es requerido' } })}
                        />
                    </div>
                    {
                        errors.email?.type === 'required' && (
                            <span className="text-sm text-red-600">{errors.email.message}</span>
                        )
                    }
                </div>
                <div className="space-y-1">
                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="password">Contraseña</Label>
                            <a
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                                Olvidaste tu contraseña?
                            </a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            disabled={isSubmitting}
                            {...register('password', {
                                required: { value: true, message: 'La contraseña es requerida' },
                                minLength: {value:6, message:'La contraseña debe tener minimo 6 caracteres'}
                            })}
                        />
                    </div>
                    {
                        errors.password && (
                            <span className="text-sm text-red-600">{errors.password?.message}</span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : 'Ingresar'}
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                        Ingresar con Google <svg width="256" height="262" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
                    </Button>
                </div>
            </div>
            <div className="mt-4 text-center text-sm">
                Aún no tienes cuenta?
                <a href="#" className="underline underline-offset-4 ml-2">
                    Registrarse
                </a>
            </div>
        </form>
    )
}
