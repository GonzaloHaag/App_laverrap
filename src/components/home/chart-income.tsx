import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart"

const chartData = [
  { month: "Enero", ingresos: 186 },
  { month: "Febrero", ingresos: 305 },
  { month: "Marzo", ingresos: 237 },
  { month: "Abril", ingresos: 73 },
  { month: "Mayo", ingresos: 209 },
  { month: "Junio", ingresos: 214 },
]

const chartConfig = {
  desktop: {
    label: "Ingresos",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export const ChartIncome = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución de ingresos a lo largo del año</CardTitle>
        <CardDescription>Enero - Diciembre 2025</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer config={chartConfig} className="max-h-[180px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="ingresos"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
