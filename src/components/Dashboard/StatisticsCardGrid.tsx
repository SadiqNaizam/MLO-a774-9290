import React from 'react';
import { cn } from '@/lib/utils';
import ReasonsLostCard from './ReasonsLostCard';
import OtherDataCard from './OtherDataCard';

interface StatisticsCardGridProps {
  className?: string;
}

const StatisticsCardGrid: React.FC<StatisticsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      <ReasonsLostCard />
      <OtherDataCard />
    </div>
  );
};

export default StatisticsCardGrid;
