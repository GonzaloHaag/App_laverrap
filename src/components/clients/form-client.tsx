import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { VEHICLES_TYPES } from "@/lib/consts";
import { Textarea } from "../ui/textarea";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { Client } from "@/types/client";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { createClient } from "@/services/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
interface FormClientProps {
  handleCloseDialog: () => void;
  userId: string;
}

export const FormClient = ({ handleCloseDialog, userId }: FormClientProps) => {
  const { register, handleSubmit, control } = useForm<Client>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicle_type: undefined,
      model_brand: "",
      patent: "",
      description: "",
    },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Client) =>
      createClient({ userId: userId, client: data }),
    onSuccess: async (data) => {
      if (!data.status) throw new Error(data.message);
      await queryClient.invalidateQueries({ queryKey: ["clients", userId] });
      toast.success("Cliente creado correctamente");
      handleCloseDialog();
    },
    onError: (error) => {
      console.log(error);
      return;
    },
  });

  const onSubmit: SubmitHandler<Client> = (data) => {
    mutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="name">Nombre completo*</Label>
        <Input
          type="text"
          {...register("name", {
            required: { value: true, message: "Campo obligatorio" },
          })}
          placeholder="Juan perez"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          {...register("email")}
          placeholder="test@example.com"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          type="tel"
          {...register("phone", {
            required: { value: true, message: "Campo obligatorio" },
          })}
          placeholder="578920 0002"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="vehicle_type">Tipo de vehículo</Label>
        <Controller
          name="vehicle_type"
          control={control}
          rules={{ required: { value: true, message: "Campo obligatorio" } }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLES_TYPES.map((type) => (
                  <SelectItem key={type.id} value={type.type}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="brand_model">Marca y modelo</Label>
        <Input
          type="text"
          {...register("model_brand")}
          placeholder="Toyota corolla 2020"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="patent">Patente</Label>
        <Input
          type="text"
          {...register("patent", {
            required: { value: true, message: "Campo obligatorio" },
          })}
          placeholder="ABC 289"
        />
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="description">Notas adicionales</Label>
        <Textarea
          className="min-h-20 max-h-40"
          placeholder="Información adicional sobre el cliente o vehículo"
          {...register("description")}
        />
      </div>
      <DialogFooter className="col-span-2">
        <DialogClose asChild>
          <Button variant="outline" className="w-28">
            Cancelar
          </Button>
        </DialogClose>
        <Button disabled={mutation.isPending} type="submit" className="w-28">
          {mutation.isPending ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "Guardar"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};
