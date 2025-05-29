import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Tooltip as ShadTooltip, TooltipContent as ShadTooltipContent, TooltipProvider, TooltipTrigger as ShadTooltipTrigger } from "@/components/ui/tooltip";

interface SourceData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  tooltipText?: string;
}

const pieChartData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F06548' }, // destructive red
  { name: 'Behance', value: 1000, percentage: 40, color: '#FACC15' }, // yellow-400
  { name: 'Instagram', value: 1000, percentage: 10, color: '#0AB39C' }, // accent teal
  { name: 'Dribbble', value: 1000, percentage: 10, color: '#22C55E', tooltipText: 'from leads total' }, // green-500
];

interface SourcePieChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as SourceData;
    return (
      <div className="bg-card p-2 border border-border rounded-md shadow-lg text-sm">
        <p className="font-semibold">{`${data.name}: $${data.value}`}</p>
        <p className="text-muted-foreground">{`${data.percentage}%`}</p>
        {data.tooltipText && <p className="text-xs text-muted-foreground italic">{data.tooltipText}</p>}
      </div>
    );
  }
  return null;
};

const SourcePieChart: React.FC<SourcePieChartProps> = ({ className }) => {
  const [timeRange, setTimeRange] = React.useState<string>('last-6-months');
  const [activeButton, setActiveButton] = React.useState<string>('leadsConverted');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Sources</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-auto text-xs h-8 px-2 py-1">
            <CalendarDays className="h-3 w-3 mr-1.5" />
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-12-months">Last 12 months</SelectItem>
            <SelectItem value="all-time">All time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center">
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60} // For Doughnut shape
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="hsl(var(--card))" // to create separation between slices
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-sm">
            {pieChartData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span style={{ backgroundColor: entry.color }} className="h-3 w-3 rounded-sm mr-2" />
                  <span>{entry.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                {entry.tooltipText ? (
                  <TooltipProvider>
                    <ShadTooltip>
                      <ShadTooltipTrigger asChild>
                        <span className="text-muted-foreground cursor-help">${entry.value.toLocaleString()}</span>
                      </ShadTooltipTrigger>
                      <ShadTooltipContent>
                        <p>{entry.tooltipText}</p>
                      </ShadTooltipContent>
                    </ShadTooltip>
                  </TooltipProvider>
                ) : (
                  <span className="text-muted-foreground">${entry.value.toLocaleString()}</span>
                )}
                  <span className="text-foreground font-medium w-10 text-right">{entry.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2 pt-4">
        <Button variant={activeButton === 'leadsCame' ? 'default' : 'outline'} size="sm" onClick={() => setActiveButton('leadsCame')} className="text-xs">
          Leads came
        </Button>
        <Button variant={activeButton === 'leadsConverted' ? 'default' : 'outline'} size="sm" onClick={() => setActiveButton('leadsConverted')} className="text-xs bg-primary/10 text-primary border-primary hover:bg-primary/20">
          Leads Converted
        </Button>
        <Button variant={activeButton === 'totalDeals' ? 'default' : 'outline'} size="sm" onClick={() => setActiveButton('totalDeals')} className="text-xs">
          Total deals size
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SourcePieChart;
