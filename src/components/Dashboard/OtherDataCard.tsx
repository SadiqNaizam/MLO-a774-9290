import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface OtherDataMetric {
  id: string;
  value: string | number;
  label: string;
  unit?: string;
  tooltip?: string;
}

const otherDataMetrics: OtherDataMetric[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' },
  { id: 'conversionTime', value: 12, label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: 30, label: 'inactive leads', tooltip: 'Leads with no activity in the last 30 days' },
];

interface OtherDataCardProps {
  className?: string;
}

const OtherDataCard: React.FC<OtherDataCardProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Other data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">
          {otherDataMetrics.map((metric) => (
            <div key={metric.id} className="text-center sm:text-left">
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
              <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center sm:justify-start">
                <span>{metric.label}</span>
                {metric.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherDataCard;
