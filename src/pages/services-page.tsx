
import { CardService, Columns, FormService } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { getAllServices } from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import { CrownIcon, DollarSignIcon, DropletsIcon, PlusCircleIcon, SearchIcon, ShieldCheckIcon } from "lucide-react";
import { useCallback, useState } from "react";

export function ServicesPage() {
    const [open, setOpen] = useState(false);
    const { session } = useAuth();
    const handleCloseDialog = useCallback(() => {
        setOpen((prevState) => !prevState)
    }, []);

    const response = useQuery({
        queryKey: ['services'],
        queryFn: () => getAllServices({ userId: session!.user.id })
    })
    return (
        <div className="flex flex-col gap-y-4">
            <section className="grid grid-cols-4 gap-6">
                <CardService
                    title="Total Servicios"
                    Icon={DropletsIcon}
                    description={6}
                    colorIcon="text-primary"
                />
                <CardService
                    title="Servicios activos"
                    Icon={ShieldCheckIcon}
                    description={6}
                    colorIcon="text-green-600"
                />
                <CardService
                    title="Más utilizado"
                    Icon={CrownIcon}
                    description="Básico"
                    colorIcon="text-yellow-500"
                />
                <CardService
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
                                <Button type="button" size={'lg'} variant={'default'} title="Nuevo servicio">
                                    <PlusCircleIcon /> Nuevo servicio
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Nuevo servicio</DialogTitle>
                                    <DialogDescription>
                                        Aquí puedes crear un nuevo servicio para tu lavadero
                                    </DialogDescription>
                                </DialogHeader>
                                <FormService userId={session!.user.id} handleCloseDialog={handleCloseDialog} />
                            </DialogContent>
                        </Dialog>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-x-4 mb-4">
                        <form className="relative w-full md:max-w-sm">
                            <Input autoFocus type="search" placeholder="Buscar servicio..." className="pl-8" />
                            <SearchIcon size={18} className="absolute top-0 bottom-0 my-auto mx-0 left-2 text-gray-300" />
                        </form>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="todas">Todas</SelectItem>
                                    <SelectItem value="basic">Básico</SelectItem>
                                    <SelectItem value="complete">Completo</SelectItem>
                                    <SelectItem value="premium">Premium</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="activos">Activos</SelectItem>
                                    <SelectItem value="inactivos">Inactivos</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {
                        response.isLoading ? (
                            <div className="w-full py-10 text-center text-sm">Cargando...</div>
                        ) : (
                            <DataTable columns={Columns} data={response.data?.services || []} />
                        )
                    }
                </CardContent>
            </Card>
        </div>
    )
}