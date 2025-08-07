import type { Service, ServiceCategory, ServiceStatus } from "@/types/service"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge";

const CATEGORY_LABELS: Record<string, string> = {
  basic: "Básico",
  complete: "Completo",
  premium: "Premium",
};

const STATUS_LABELS:Record<string, string> = {
  active:"Activo",
  inactive:"Inactivo"
}

const CATEGORY_BADGE_CLASSES: Record<string, string> = {
  basic: "bg-blue-500 text-slate-100",
  complete: "bg-green-600 text-slate-100",
  premium: "bg-orange-500 text-slate-100",
};
export const Columns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Servicio"
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell:({ row }) => {
       const value:ServiceCategory = row.getValue('category');
       return (
        <Badge
          className={`${CATEGORY_BADGE_CLASSES[value] || "bg-gray-100 text-gray-800"}`}
        >
          {CATEGORY_LABELS[value] || value}
        </Badge>
      );
    }
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell:({row}) => {
      const price:number = parseFloat(row.getValue('price'));
      const formattedPrice = new Intl.NumberFormat("es-AR", {
        style:'currency',
        currency:'ARS'
      }).format(price);

      return <span className="font-medium">{formattedPrice}</span>
    }
  },
  {
    accessorKey: "duration",
    header: "Duración",
    cell: ({row}) => {
      const duration:number = row.getValue('duration');
      return <span>{duration} min</span>
    }
  },
  {
    accessorKey: "usos",
    header: "Usos",
    cell: () => <Badge variant={'outline'}>2</Badge>
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({row}) => {
      const status:ServiceStatus = row.getValue('status');
      return <Badge className={`${STATUS_LABELS[status] === 'Activo' ? 'bg-green-600' : 'bg-red-600'}`}>{STATUS_LABELS[status]}</Badge>
    }
  },
  {
    accessorKey: "actions",
    header:() => <span className="sr-only">acciones</span>,
  },
]