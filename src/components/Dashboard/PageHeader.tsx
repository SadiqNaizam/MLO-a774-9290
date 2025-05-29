import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        {/* The 'Create' button and 'last 6 months' filter shown in the image are likely part of TopHeader or main content layout based on component descriptions */}
      </div>
      <Tabs defaultValue="leads" className="mt-4">
        <TabsList className="grid w-full grid-cols-2 sm:w-[200px]">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        {/* TabsContent would typically go here in a full page, but this component is just the header */}
      </Tabs>
    </div>
  );
};

export default PageHeader;
