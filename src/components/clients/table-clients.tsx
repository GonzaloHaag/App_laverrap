import { Button } from "../ui/button";
import { EyeIcon, PencilIcon, PhoneIcon, TrashIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import type { Client } from "@/types/client";

interface TableClientsProps {
  isLoading: boolean;
  isError: boolean;
  clients: Client[];
}
export const TableClients = ({
  isLoading,
  isError,
  clients,
}: TableClientsProps) => {
  if (isLoading) {
    return (
      <tbody>
        <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td
            colSpan={6}
            className="px-6 py-3 text-muted-foreground text-center"
          >
            Cargando...
          </td>
        </tr>
      </tbody>
    );
  }
  if (isError) {
    return (
      <tbody>
        <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td colSpan={6} className="px-6 py-3 text-red-600 text-center">
            Ocurrió un error al obtener los clientes
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {clients.length > 0 ? (
        clients.map((client) => (
          <tr
            key={client.id}
            className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              {client.name}
            </th>
            <td className="px-6 py-3">
              <div className="flex flex-col gap-y-1">
                {client.email && client.email !== "" && (
                  <span className="text-sm">{client.email}</span>
                )}
                <div className="flex items-center gap-x-2">
                  <PhoneIcon size={14} />
                  <span className="text-sm">{client.phone}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-3">
              <div className="flex flex-col gap-y-1">
                <span className="text-sm font-semibold">
                  {client.model_brand}
                </span>
                <span className="text-sm font-normal">
                  Patente: {client.patent}
                </span>
              </div>
            </td>
            <td className="px-6 py-3">5</td>
            <td className="px-6 py-3">
              <Badge className={`bg-gray-300 ${client.status === "Activo" ? " text-green-600" : " text-red-500"}`}>
                { client.status }
              </Badge>
            </td>
            <td className="px-6 py-3">
              <Button
                type="button"
                size={"icon"}
                variant={"outline"}
                title="Ver"
              >
                <EyeIcon />
              </Button>
              <Button size={"icon"} variant={"outline"} title="Editar" className="ml-2">
                <PencilIcon size={16} className="text-green-600" />
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                title="Borrar"
                className="ml-2"
              >
                <TrashIcon size={16} className="text-red-600" />
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td
            colSpan={6}
            className="px-6 py-3 text-muted-foreground text-center"
          >
            No se encontraron resultados
          </td>
        </tr>
      )}
    </tbody>
  );
};
