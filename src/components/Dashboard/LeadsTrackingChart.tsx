import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 65, closedLost: 55 },
  { month: 'April', closedWon: 50, closedLost: 40 },
  { month: 'May', closedWon: 82, closedLost: 68 },
  { month: 'June', closedWon: 65, closedLost: 10 },
  { month: 'July', closedWon: 75, closedLost: 42 },
  { month: 'August', closedWon: 95, closedLost: 60 },
];

interface LeadsTrackingChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border rounded-md shadow-lg text-sm">
        <p className="label font-semibold text-foreground">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} style={{ color: pld.stroke }}>
            {`${pld.name}: ${pld.value}`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  const [timeRange, setTimeRange] = React.useState<string>('last-6-months');

  const totalClosed = leadsTrackingData.reduce((sum, item) => sum + item.closedWon, 0);
  const totalLost = leadsTrackingData.reduce((sum, item) => sum + item.closedLost, 0);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Leads tracking</CardTitle>
          <div className="mt-1 text-sm text-muted-foreground">
            <span className="text-2xl font-bold text-foreground">{totalClosed}</span> total closed
            <span className="mx-2">|</span>
            <span className="text-2xl font-bold text-foreground">{totalLost}</span> total lost
          </div>
        </div>
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
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ paddingBottom: '20px' }}
                formatter={(value, entry) => (
                  <span className="text-sm text-muted-foreground ml-1">{value}</span>
                )}
              />
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="closedWon"
                name="Closed won"
                stroke="hsl(var(--accent))"
                fillOpacity={1}
                fill="url(#colorClosedWon)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'hsl(var(--accent))', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: 'hsl(var(--accent))', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="closedLost"
                name="Closed lost"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorClosedLost)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'hsl(var(--destructive))', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: 'hsl(var(--destructive))', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
