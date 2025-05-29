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

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number | null;
  color: string;
  textColor?: string;
  tooltip?: string;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-orange-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-yellow-400', tooltip: 'Average time on this stage' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, days: null, color: 'bg-indigo-600' }, // Days not specified in image for this
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-purple-600' },
];

const totalBarValue = funnelData.reduce((sum, stage) => sum + stage.count, 0);

interface FunnelCountWidgetProps {
  className?: string;
}

const FunnelCountWidget: React.FC<FunnelCountWidgetProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">600</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>

        <div className="mb-4 flex h-3 w-full rounded-full overflow-hidden">
          {funnelData.map((stage) => (
            <TooltipProvider key={stage.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(stage.color, 'h-full')}
                    style={{ width: `${(stage.count / totalBarValue) * 100}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="space-y-3">
          {funnelData.map((stage) => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-2 text-sm">
              <div className="flex items-center">
                <span className={cn('h-3 w-3 rounded-sm mr-2', stage.color)} />
                <span>{stage.name}</span>
              </div>
              <div className="text-right text-muted-foreground">{stage.count}</div>
              <div className="text-right text-muted-foreground">$ {stage.value}</div>
              {stage.days !== null ? (
                stage.tooltip ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-right text-muted-foreground cursor-help">{stage.days} days</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stage.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className="text-right text-muted-foreground">{stage.days} days</div>
                )
              ) : (
                <div></div> // Empty div to maintain grid structure
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelCountWidget;
