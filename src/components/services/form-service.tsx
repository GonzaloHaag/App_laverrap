import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import type { Service } from "@/types/service";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { createService } from "@/services/service";
import { LoaderCircleIcon } from "lucide-react";

interface FormServiceProps {
    userId:string;
    handleCloseDialog: () => void;
}
export const FormService = ({ userId, handleCloseDialog } : FormServiceProps) => {
    console.log("FormService render");
    const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm<Service>({
        defaultValues: {
            name: '',
            description: '',
            category: 'basic',
            status: 'active',
            price: '',
            duration: null
        },
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<Service> = async (data) => {
        const response = await createService({ userId:userId, service: data });
        if(!response.status) {
            console.log(response.message)
            return;
        }
        handleCloseDialog()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-0">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre del servicio *</Label>
                    <Input
                        id="name"
                        {...register('name', { required: { value: true, message: 'El nombre es requerido' }, minLength: { value: 2, message: 'Minimo 2 caracteres' } })}
                        placeholder="Ej: Servicio completo" />
                </div>
                {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Descripción del servicio</Label>
                <Textarea
                    id="description"
                    {...register('description', { required: false })}
                    placeholder="Ej: Incluye aspirado"
                    className="max-h-40" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="basic">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                Básico
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="complete">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                Completo
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="premium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                                Premium
                                            </div>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="status">Estado *</Label>
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select defaultValue="active" value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="active">Activo</SelectItem>
                                        <SelectItem value="inactive">Inactivo</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-start">
                <div className="space-y-0">
                    <div className="grid gap-2">
                        <Label htmlFor="price">Precio (ARS) *</Label>
                        <Input
                            id="price"
                            {...register('price', { required: { value: true, message: 'El precio es requerido' } })}
                            placeholder="Ej: 25000" />
                    </div>
                    {errors.price && <span className="text-sm text-red-600">{errors.price.message}</span>}
                </div>
                <div className="space-y-0">
                    <div className="grid gap-2">
                        <Label htmlFor="duration">Duración (en minutos) *</Label>
                        <Input
                            id="duration"
                            {...register('duration', { required: {value:true, message:'La duración es requerida'} })}
                            type="number"
                            placeholder="Ej: 30" />
                    </div>
                    {errors.duration && <span className="text-sm text-red-600">{errors.duration.message}</span>}
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" className="w-28">Cancelar</Button>
                </DialogClose>
                <Button disabled={isSubmitting} type="submit" className="w-28">{isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : 'Guardar'}</Button>
            </DialogFooter>
        </form>
    )
}
