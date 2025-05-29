import React from 'react';
import { cn } from '@/lib/utils';
import FunnelCountWidget from './FunnelCountWidget';
import SourcePieChart from './SourcePieChart';
import LeadsTrackingChart from './LeadsTrackingChart';

interface StatGridProps {
  className?: string;
}

const StatGrid: React.FC<StatGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 gap-6', className)}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <FunnelCountWidget className="md:col-span-2" />
        <SourcePieChart className="md:col-span-3" />
      </div>
      <LeadsTrackingChart />
    </div>
  );
};

export default StatGrid;
