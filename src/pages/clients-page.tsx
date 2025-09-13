import { useCallback, useState } from "react";
import {
  CardPage,
  FiltersClients,
  FormClient,
  TableClients,
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
import {
  CarIcon,
  PlusCircleIcon,
  TrendingUpIcon,
  UserRoundCheckIcon,
  UsersIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getAllClients } from "@/services/client";
import { useSearchParams } from "react-router-dom";

export function ClientsPage() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const [searchParams] = useSearchParams();
  const handleCloseDialog = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const searchValue = searchParams.get("search") || "";

  const response = useQuery({
    queryKey: ["clients", session!.user.id, searchValue],
    queryFn: async () => {
      const response = await getAllClients({ userId: session!.user.id, searchValue });
      if (!response.status || !response.clients) {
        throw new Error("Error al obtener los clientes");
      }
      return response.clients;
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
  });
  return (
    <section className="flex flex-col gap-y-4">
      <section className="grid grid-cols-4 gap-6">
        <CardPage
          title="Total clientes"
          Icon={UsersIcon}
          description={4}
          colorIcon="text-primary"
        />
        <CardPage
          title="Clientes activos"
          Icon={UserRoundCheckIcon}
          description={6}
          colorIcon="text-green-600"
        />
        <CardPage
          title="Vehículos registrados"
          Icon={CarIcon}
          description="12"
          colorIcon="text-yellow-500"
        />
        <CardPage
          title="Crecimiento mensual"
          Icon={TrendingUpIcon}
          description="$25.600"
          colorIcon="text-green-600"
        />
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
          <CardDescription>
            Administra la información de tus clientes y sus vehículos
          </CardDescription>
          <CardAction>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  size={"lg"}
                  variant={"default"}
                  title="Nuevo cliente"
                >
                  <PlusCircleIcon /> Nuevo cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nuevo cliente</DialogTitle>
                  <DialogDescription>
                    Aquí puedes crear un nuevo cliente para tu lavadero
                  </DialogDescription>
                </DialogHeader>
                <FormClient
                  handleCloseDialog={handleCloseDialog}
                  userId={session!.user.id}
                />
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          <FiltersClients />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Contacto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Vehículo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lavados
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <TableClients
                isLoading={response.isLoading}
                isError={response.isError}
                clients={response.data || []}
              />
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
