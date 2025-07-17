import { type LucideIcon } from "lucide-react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CardServiceProps {
    title: string;
    Icon: LucideIcon;
    description: string | number;
    colorIcon:string;
}
export const CardService = ({ title, Icon, description,colorIcon }: CardServiceProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <CardAction>
                    <Icon size={20} className={colorIcon} />
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{description}</div>
            </CardContent>
        </Card>
    )
}
