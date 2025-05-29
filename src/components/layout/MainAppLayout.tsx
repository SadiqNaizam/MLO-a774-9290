import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { ThemeProvider } from "next-themes";

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="dashboard-theme">
      <div className="min-h-screen bg-background">
        <SidebarNav />
        <TopHeader />
        <main className="ml-64 mt-[70px] p-6 min-h-[calc(100vh-70px)] overflow-y-auto">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainAppLayout;
