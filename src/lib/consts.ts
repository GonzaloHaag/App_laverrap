export const statusColors: Record<string, string> = {
  basic: "bg-gray-100 text-slate-700",
  complete: "bg-green-600 text-slate-100",
  active: "bg-green-600 text-slate-100",
  inactive: "bg-red-600 text-slate-100",
  premium: "bg-orange-700 text-slate-100",
};

export const statusLabels: Record<string, string> = {
  complete: "Completado",
  basic: "Básico",
  premium: "Premium",
  active: "Activo",
  inactive: "Inactivo",
};

export const VEHICLES_TYPES = [
  {
    id: 1,
    type: "car",
    label: "Auto",
  },
  {
    id: 2,
    type: "pickup",
    label: "Camioneta",
  },
  {
    id: 3,
    type: "motorcycle",
    label: "Moto",
  },
  {
    id: 4,
    type: "other",
    label: "Otro",
  },
];
