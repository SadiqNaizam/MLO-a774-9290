import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatGrid from '../components/Dashboard/StatGrid';
import StatisticsCardGrid from '../components/Dashboard/StatisticsCardGrid';

/**
 * IndexPage serves as the main dashboard view, specifically the "Leads Overview".
 * It uses MainAppLayout to provide the overall page structure (sidebar, top header)
 * and then populates the main content area with dashboard-specific components:
 * PageHeader for the title and tabs, StatGrid for primary statistics and charts,
 * and StatisticsCardGrid for secondary statistics cards.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* PageHeader displays the title 'Dashboard' and tabs for 'Sales' and 'Leads'. */}
      {/* The 'Leads' tab is active by default as per PageHeader's internal state. */}
      <PageHeader />
      
      {/* This div acts as the main container for dashboard widgets, applying a grid layout with spacing. */}
      {/* This corresponds to layoutRequirements.mainContent.container */}
      <div className="grid gap-6">
        {/* StatGrid displays key lead statistics including funnel, sources, and tracking charts. */}
        <StatGrid />
        
        {/* StatisticsCardGrid displays supplementary data like reasons for lost leads and other metrics. */}
        <StatisticsCardGrid />
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
