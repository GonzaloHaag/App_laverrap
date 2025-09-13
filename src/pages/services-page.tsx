import {
  CardPage,
  FiltersServices,
  FormService,
  TableServices,
} from "@/components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { getAllServices } from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import {
  CrownIcon,
  DollarSignIcon,
  DropletsIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function ServicesPage() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const handleCloseDialog = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const response = useQuery({
    queryKey: ["services", session!.user.id, searchValue],
    queryFn: async () => {
      const response = await getAllServices({ userId: session!.user.id, searchValue });
      if (!response.status || !response.services) {
        throw new Error("Error al obtener los servicios");
      }
      return response.services;
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
  });
  return (
    <div className="flex flex-col gap-y-4">
      <section className="grid grid-cols-4 gap-6">
        <CardPage
          title="Total Servicios"
          Icon={DropletsIcon}
          description={6}
          colorIcon="text-primary"
        />
        <CardPage
          title="Servicios activos"
          Icon={ShieldCheckIcon}
          description={6}
          colorIcon="text-green-600"
        />
        <CardPage
          title="Más utilizado"
          Icon={CrownIcon}
          description="Básico"
          colorIcon="text-yellow-500"
        />
        <CardPage
          title="Precio promedio"
          Icon={DollarSignIcon}
          description="$25.600"
          colorIcon="text-green-600"
        />
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Servicios</CardTitle>
          <CardDescription>Administra tus servicios</CardDescription>
          <CardAction>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  size={"lg"}
                  variant={"default"}
                  title="Nuevo servicio"
                >
                  <PlusCircleIcon /> Nuevo servicio
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nuevo servicio</DialogTitle>
                  <DialogDescription>
                    Aquí puedes crear un nuevo servicio para tu lavadero
                  </DialogDescription>
                </DialogHeader>
                <FormService
                  userId={session!.user.id}
                  handleCloseDialog={handleCloseDialog}
                />
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          <FiltersServices />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Servicio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Categoría
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Duración
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <TableServices
                isLoading={response.isLoading}
                isError={response.isError}
                services={response.data || []}
              />
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
