
import { CardService } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CrownIcon, DollarSignIcon, DropletsIcon, PlusCircleIcon, SearchIcon, ShieldCheckIcon } from "lucide-react";

export function ServicesPage() {
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
                        <Button type="button" size={'lg'} variant={'default'} title="Nuevo servicio">
                            <PlusCircleIcon /> Nuevo servicio
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-x-4">
                        <form className="relative w-full md:max-w-sm">
                            <Input type="search" placeholder="Buscar servicio..." className="pl-8" />
                            <SearchIcon size={18} className="absolute top-0 bottom-0 my-auto mx-0 left-2 text-gray-300" />
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}